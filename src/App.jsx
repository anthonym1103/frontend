import PaginaPrincipal from './components/paginaPrincipal'
import RegistroCandidato from './components/RegistroCandidato'
import UsuarioHiring from './components/UsuarioHiring'
import Login from './components/Login'
import CreateEmpresa from './components/CreateEmpresa'
import OfertasLaborales from './components/OfertasLaborales'
import Postulaciones from './components/Postulaciones'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  {/*const [postulacion, setPostulacion] = useState([])
  
  const getPostulaciones = async () => {
    const allPostulaciones = await fetch("http://localhost:8000/userHG/postulaciones")
    const postulacionJson = await allPostulaciones.json()
    setPostulacion(postulacionJson)
  } 

  useEffect(() =>{
    getPostulaciones()
  })*/}

  return (
    <div>
      <Routes>
        <Route path='/' element = {<PaginaPrincipal/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/registro' element = {<RegistroCandidato/>}/>
        <Route path='/usuariohiring' element = {<UsuarioHiring/>}/>
        <Route path='/usuariohiring/empresacreate' element = {<CreateEmpresa/>}/>
        <Route path='/usuariohiring/ofertaslaborales' element = {<OfertasLaborales/>}/>
        <Route path='/usuariohiring/postulaciones' element = {<Postulaciones/>}/>
      </Routes>
    </div>
  )
}

export default App
