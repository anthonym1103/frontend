import PaginaPrincipal from './components/paginaPrincipal'
import RegistroCandidato from './components/RegistroCandidato'
import UsuarioHiring from './components/UsuarioHiring'
import Login from './components/Login'
import CreateEmpresa from './components/CreateEmpresa'
import OfertasLaborales from './components/OfertasLaborales'
import Postulaciones from './components/Postulaciones'
import UsuarioEmpresa from './components/UsuarioEmpresa'
import ActualizarOferta from './components/ActualizarOferta'
import CreateOferta from './components/CrearOferta'
import UsuarioCandidato from './components/UsuarioCandidato'
import GestionarInicioSesion from './components/GestionarInicioSesion'
import GestionarDataBasica from './components/GestionarDataBasica'
import GestionPostulacion from './components/GestionarPostulacion'
import ModificarExperiencia from './components/ModificarExperiencia'
import ModificarProfesiones from './components/ModificarProfesiones'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

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
        <Route path='/usuarioempresa' element = {<UsuarioEmpresa/>}/>
        <Route path='/usuarioempresa/actualizaroferta' element = {<ActualizarOferta/>}/>
        <Route path='/usuarioempresa/crearoferta' element = {<CreateOferta/>}/>
        <Route path='/usuarioempresa/gestionariniciosesion' element = {<GestionarInicioSesion/>}/>
        <Route path='/usuarioempresa/gestionardatabasica' element = {<GestionarDataBasica/>}/>
        <Route path='/usuariocandidato' element = {<UsuarioCandidato/>}/>
        <Route path='/usuariocandidato/gestionarpostulacion' element = {<GestionPostulacion/>}/>
        <Route path='/usuariocandidato/modificarexperiencias' element = {<ModificarExperiencia/>}/>
        <Route path='/usuariocandidato/modificarprofesiones' element = {<ModificarProfesiones/>}/>
      </Routes>
    </div>
  )
}

export default App
