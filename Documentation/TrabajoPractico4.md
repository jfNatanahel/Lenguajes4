🧭 1️⃣ Qué significa “embeber un mapa”

“Embeber” (embed) significa incrustar un contenido externo (como un mapa, video o iframe) dentro de tu página web.

En este caso, vas a insertar un mapa de Google Maps (o de OpenStreetMap) dentro del JSX de tu página de contacto.

👉 En React, esto se hace con una etiqueta <iframe> dentro del JSX.
El iframe es como una ventanita que muestra contenido externo.

🗺️ 2️⃣ Cómo obtener un mapa embebido
Con Google Maps

Entrá a Google Maps
.

Buscá el lugar que quieras mostrar (por ejemplo “Buenos Aires, Argentina”).

Hacé clic en el botón de Compartir → pestaña Insertar un mapa.

Copiá el código <iframe> que te da Google.
Se ve más o menos así:

🧩 3️⃣ El orden de las constantes con useState

No es un error fatal, pero por buenas prácticas, se recomienda que todos los useState estén declarados antes de las funciones (handleChange, handleSubmit, etc.)
porque React ejecuta los hooks en el orden que se declaran.