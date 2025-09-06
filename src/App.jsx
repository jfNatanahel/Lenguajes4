import { useState } from 'react' //Hook que permite manejar estado en componentes funcionales.
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
/*

*/


export default function Profile(){
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
    <h1>TP1</h1>
    <h2>Jose Natanahel Fernandez</h2>
      <input 
      type="file" 
      accept='image/*' 
      multiple onChange={handFileChange} //funcion que lea el archivo usando FileReader y lo guarde en un estado para mostrarlo despues.
      //multiple = permite seleccionar multiples archivos.
      />
      <div>
        {imageSrc && <img src={imageSrc} alt="Imagen seleccionada" className='image-up-load' />} 
      </div>
    </>
  ) 
}

//export default MyButton

 //Exporta mi componente para que pueda ser importado en otros archivos.

/*¿Que quiere decir Hook en react?
Permite tener estados dentro de un componente funcional.
¿Qué quiere decir estado?
Datos que pueden cambiar con el tiempo y que cuando cambian, React
vuelve a renderizar el componente para reflejar esos cambios en la interfaz de usuario.
*/