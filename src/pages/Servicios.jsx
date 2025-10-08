import React from 'react'  
import HabitacionSencilla from '../assets/images/habitacion-sencilla.png' //Importo la imagen para que Vite la procese.
import HabitacionDoble from '../assets/images/habitacion-doble.png'
import './Servicios.css';
const Servicios = () => {  //Componente funcional (arrow fuction). Se usa por estilo y consistencia.
    //Simulacion de datos que podrian venir de una API.
    
    const habitaciones = [
        {
            nombre : "Habitacion Sencilla",
            descripcion : "Una habitacion para una persona",
            precio : 50,
            imagen : HabitacionSencilla
        },
        {
            nombre : "Habitacion Doble",
            descripcion : "Una habitacion para dos personas",
            precio : 90,
            imagen : HabitacionDoble
        }
    ]
    return (
        <main className="servicios-page">
            <h1>Nuetros Servicios</h1>
            <div className='servicios-grid'>
                {habitaciones.map((hab,index)=>(
                    <div key={index} className="card">
                        <h3>{hab.nombre}</h3>
                        <p>{hab.descripcion}</p>
                        <p>Precio por noche: ${hab.precio}</p>
                        <img src={hab.imagen} alt={hab.nombre} />
                        <button>Reservar</button>
                    </div>
                ))}
            </div>
        </main>
    );   
};
export default Servicios
//Exporta mi componente para que pueda ser importado en otros archivos.

/* ########################## IMAGENES EN VITE ##########################
Si la imagen está dentro de src/assets, debe ser importada para que Vite la procese correctamente.

📦 ¿Qué hace Vite con eso?
Cuando haces el build, copia la imagen a la carpeta final dist/assets/ y reemplaza el import por la ruta real optimizada.

✅ Ventajas:

Vite optimiza y cachea la imagen.

Funciona siempre, incluso después del build.

Detecta los cambios automáticamente.

*/