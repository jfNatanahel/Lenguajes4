import { StrictMode } from 'react' //Activa advertencias adicionales y chequeos de buenas practicas.
import { createRoot } from 'react-dom/client' //FUncion que monta mi app React dentro del HTML.
import './index.css' //Importo los estilos globales.
import App from './App.jsx' //Importo el componente principal de mi app.
createRoot(document.getElementById('root')).render( //Dibuja mi app dentro del contendor.
  <StrictMode>
    <App />
  </StrictMode>,
)
/*¿Que hace createRoot?
-¿Qué es un Root?
Es un punto de entrada de React en el DOM. 

-¿Que es DOM? 
Es la estructura de nodos que representa la interfaz de 
usuario en el navegador.

-.render?
Es una función que le dice a React que mostrar dentro del root. Todo lo 
que pase dentro de .render como app se convierte en la inerfaz de usuario.
 */