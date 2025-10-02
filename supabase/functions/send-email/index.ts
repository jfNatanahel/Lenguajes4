// supabase/functions/sendEmail/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Helper para añadir CORS en todas las respuestas
function withCORS(res: Response) {
  const headers = new Headers(res.headers);
  headers.set("Access-Control-Allow-Origin", "*"); // Cambia "*" por tu dominio en producción
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(res.body, { status: res.status, headers });
}

serve(async (req) => {
  // Responder el preflight CORS
  if (req.method === "OPTIONS") {
    return withCORS(new Response("ok", { status: 200 }));
  }

  try {
    if (req.method !== "POST") {
      return withCORS(new Response("Method Not Allowed", { status: 405 }));
    }

    const body = await req.json().catch(() => null);
    const { nombre, email, mensaje } = body ?? {};

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return withCORS(new Response(JSON.stringify({ error: "Campos incompletos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }));
    }

    // Variables de entorno
    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "no-reply@tudominio.com";
    const TO_EMAIL = Deno.env.get("TO_EMAIL") || "tu@dominio.com";
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SENDGRID_API_KEY) {
      return withCORS(new Response(JSON.stringify({ error: "SENDGRID_API_KEY no configurada" }), { status: 500 }));
    }

    // Payload de SendGrid
    const sgPayload = {
      personalizations: [{ to: [{ email: TO_EMAIL }], subject: "Nuevo mensaje desde formulario" }],
      from: { email: FROM_EMAIL },
      reply_to: { email },
      content: [{ type: "text/plain", value: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}` }]
    };

    // Enviar a SendGrid
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
      return withCORS(new Response(JSON.stringify({ error: "Error SendGrid", detail }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      }));
    }

    // Guardar en tabla "contactos" (opcional)
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
        console.error("Error guardando en contactos:", err);
      }
    }

    // Respuesta final
    return withCORS(new Response(JSON.stringify({ message: "Correo enviado correctamente ✅" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));

  } catch (err) {
    console.error(err);
    return withCORS(new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }));
  }
});
