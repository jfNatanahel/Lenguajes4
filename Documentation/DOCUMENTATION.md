# 🌐 Proyecto: Sitio Web Hotel — Formulario de Contacto con Supabase + SendGrid

Este proyecto implementa un formulario de contacto profesional en un sitio web de hotel.  
Cuando un usuario completa el formulario, se envía un correo electrónico al administrador mediante **Supabase Edge Functions** y el servicio de correo **SendGrid**.  

---

## 📌 Tecnologías utilizadas

- **Frontend:** React (con Vite)
- **Backend serverless:** Supabase Edge Functions (Deno).
- **Correo transaccional:** SendGrid API.
- **Gestión de secretos:** Supabase Secrets (variables de entorno seguras).

---

## 📂 Flujo del sistema

1. El usuario completa el formulario (nombre, email, mensaje).
2. El frontend envía los datos mediante `fetch` a una función serverless (`/send-email`).
3. La **Edge Function** valida los datos y llama a la API de SendGrid.
4. SendGrid entrega el correo al administrador (`TO_EMAIL`).
5. (Opcional) El mensaje se guarda en la base de datos para consultas posteriores..


