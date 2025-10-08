
import React, { useState } from 'react'
function Contacto(){

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const handleChange = (e) => { //Esta funcion solo actualiza lso datos a medida que el usuario escribe
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recarga de la página

    // Validaciones
    if (!formData.nombre || !formData.email || !formData.mensaje) {
        alert("Por favor, complete todos los campos del formulario");
        return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
        alert("Por favor, ingrese un correo electrónico válido");
        return;
    }

    try {
        // Llamada a la Edge Function de Supabase
        const res = await fetch('https://fbahrekzvewjjxufmcep.functions.supabase.co/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (res.ok) {
        setmensajeEnvio('Mensaje enviado correctamente ✅');
        setFormData({ nombre: '', email: '', mensaje: '' }); // limpiar formulario
        } else {
        setmensajeEnvio(`Error al enviar: ${data.error || 'Desconocido'}`);
        }
    } catch (error) {
        setmensajeEnvio(`Error de red: ${error.message}`);
    }
    };


    const [mensajeEnvio, setmensajeEnvio] = useState('');
    //El RETURN contiene "Lo que se renderiza en pantalla"
    return(
        <div>
            <h2>Formulario de contacto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                    type="text"
                    name ="nombre"
                    value={formData.nombre}
                    onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="Correo">Correo:</label>
                    <input 
                    type="text"
                    name ="email"
                    value={formData.email}
                    onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="mensaje">Mensaje:</label>
                    <input 
                    type="text"
                    name ="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange} 
                    />
                </div>
                <button type='submit'>Enviar</button>
            </form>
            {mensajeEnvio && <p>{mensajeEnvio}</p>}

            <div className='mapa'>
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1016.4737397773844!2d-65.41966501598391!3d-24.78515721742073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc3ca29e857f7%3A0xc5686eacbfcf059c!2sHostel%20Trotamundos%20Salta!5e0!3m2!1ses!2sar!4v1759946109396!5m2!1ses!2sar"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};
export default Contacto