import React, { useState } from 'react'
function TrabajoPractico(){
      function apretarClick(){
        alert("Hola, soy Jose Natanahel Fernandez")
      }
      const [imageSrc, setImageSrc] = useState([]); //Estado para guardar la URL.
      const handFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) { //sartsWitch devuelve valores booleano.
          const reader = new FileReader();//Creamos un objeto FileReader.
          reader.onload = () => setImageSrc(reader.result)
          reader.readAsDataURL(file);
        }else{
          alert("Por favor seleccione un archivo de imagen valido");
        }
        
      };
    
    return(
        <>
        <h1>Trabajo Practico - Cargar archivos</h1>
        <h2>Jose Natanahel Fernandez</h2>
        <p>
        1) Crear un sitio en con la librería React (create-react-app o Vite), luego crear
        un componente que permita subir un archivo y con la API File validar que
        el mismo se trate de una imagen y por último consuma ese componente y
        muéstrelo en la página principal del sitio
        </p>
        <input 
        type="file" 
        accept='image/*' 
        multiple onChange={handFileChange} //funcion que lea el archivo usando FileReader y lo guarde en un estado para mostrarlo despues.
        //multiple = permite seleccionar multiples archivos.
        />
        <div>
            {imageSrc && <img src={imageSrc} alt="Imagen seleccionada" className='image-up-load' />} 
        </div>
        <button onClick={apretarClick}>
            Hazme click
        </button>
        <div></div>
        </>
    )
}
export default TrabajoPractico