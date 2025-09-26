import { useState } from 'react' //Hook que permite manejar estado en componentes funcionales.
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Contacto from './pages/Contacto'
import Inicio from './pages/Inicio'
import { Routes, Route, Link } from 'react-router'
import TrabajoPractico from './pages/TrabajoPractico'

/*

*/


export default function App(){
  return(
    <> 
    <div>
      {/*Menu de navegacion*/}
        <nav>
          <Link to="/">Inicio</Link> | {" "}
          <Link to="/trabajopractico">TrabajoPractico</Link> | {" "}
          <Link to="/contacto">Contacto</Link> |{" "}
        </nav>
    </div>

      {/*Contenido dinamico segun la ruta*/}
    <Routes>
      <Route path='/' element={<Inicio/>}></Route>
      <Route path='/trabajopractico' element={<TrabajoPractico/>}></Route>
      <Route path="/contacto" element={<Contacto/>}></Route>
    </Routes>
    <h1>Este contenido se muestra en todas las pages </h1>
      
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