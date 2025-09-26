// supabase/functions/sendEmail/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const body = await req.json().catch(() => null);
    const { nombre, email, mensaje } = body ?? {};

    // Validación básica (si falta, responde 400)
    if (!nombre || !email || !mensaje) {
      return new Response(JSON.stringify({ error: "Campos incompletos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Leer secretos (no están en frontend)
    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "no-reply@tudominio.com";
    const TO_EMAIL = Deno.env.get("TO_EMAIL") || "tu@dominio.com";
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SENDGRID_API_KEY) {
      return new Response(JSON.stringify({ error: "SENDGRID_API_KEY no configurada" }), { status: 500 });
    }

    // 1) Enviar a SendGrid
    const sgPayload = {
      personalizations: [{ to: [{ email: TO_EMAIL }], subject: "Nuevo mensaje desde formulario" }],
      from: { email: FROM_EMAIL },
      reply_to: { email },
      content: [{ type: "text/plain", value: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}` }]
    };

    const sgRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sgPayload)
    });

    if (!sgRes.ok) {
      const detail = await sgRes.text();
      return new Response(JSON.stringify({ error: "Error SendGrid", detail }), { status: 502, headers: { "Content-Type": "application/json" }});
    }

    // 2) Opcional: insertar registro en la tabla 'contactos' (usa service_role en servidor)
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/contactos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            Prefer: "return=representation"
          },
          body: JSON.stringify({ nombre, email, mensaje })
        });
      } catch (err) {
        // no fallamos el request principal por un fallo al guardar en DB; solo lo registramos
        console.error("Error guardando en contactos:", err);
      }
    }

    return new Response(JSON.stringify({ message: "Correo enviado correctamente" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" }});
  }
});
