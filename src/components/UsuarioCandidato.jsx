import BarraNav from "./BarraNav";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../recursos/logo_hiring_group.png'
import './hojasEstilos/estilos.css'

function ListaOfertas({numero, sucursal, profesion, cargo, descripcionCargo, salario, status, postulacion}){
    return(
        <div className = "contnDetallesOfertas">
            <article className="ofertas">
                <h3 className="tituloOferta">Oferta N° {numero}</h3>
                <div className="ajusteFicha">
                    <div className="contentCaracteristicas">
                        <p className="caracteristicas">Sucursal: {sucursal}</p>
                        <p className="caracteristicas">Profesion: {profesion}</p>
                        <p className="caracteristicas">Cargo Vacante: {cargo}</p>
                        <p className="caracteristicas">Descripcion del cargo: {descripcionCargo}</p>
                        <p className="caracteristicas">Salario a devengar: {salario}</p>
                        <p className="caracteristicas">Cargo Vacante: {cargo}</p>
                        <p className="caracteristicas">Status de la oferta: {status?"Activo":"Inactivo"}</p>
                    </div>
                    <img className = "imgFicha" src={logo} alt="Logo" />
                </div>
            </article>
            <div className = "contenedorBotones">
                <h3 id="opcionesOferta">Opciones Sobre la oferta</h3>
                <span className="botonFormulario">
                    <button type="submit" onClick={postulacion}>Postularse</button>
                </span>
            </div>
        </div>
    )
}

function Loader(){
    return(
        <div>
            <h2>No hay ofertas disponibles!!!!</h2>
        </div>
    )
}

const UsuarioCandidato = ()=>{
    const location = useLocation();
    const { dataOferta } = location.state || {};
    const [ofertasLaborales, setOfertas] = useState([])
    const navegate = useNavigate()

    const handlerPostulacionClick = () => {
        navegate('/usuariocandidato/gestionarpostulacion');
    }

    const handlerModExperienciaClick = () => {
        navegate('/usuariocandidato/modificarexperiencias');
    }
    const handlerModProfesionClick = () => {
        navegate('/usuariocandidato/modificarprofesiones');
    }

    const getOfertas = async () => {
        const allOfertas = await fetch("http://localhost:8000/userCandidato/ofertaslaborales")
        const ofertasJson = await allOfertas.json()
        setOfertas(ofertasJson)
    }


    useEffect(() => {
        getOfertas()
    })

    const handlerSubmitForm = () =>{
    }

    return(
        <div>
            <BarraNav
                redireccion1={'/'}
                texto1={"Ir a inicio"}
                redireccion2={''}
                texto2={""}
                tipo={false}
            />
            <h2>Mi Perfil de Candidato || Ofertas Disponibles</h2>
            <div className="botnsGestion">
                <span className="botonFormulario">
                    <button type="submit" onClick={handlerModExperienciaClick}>Modificar Experiencia Laboral</button>
                </span>
                <span className="botonFormulario">
                    <button type="submit" onClick={handlerModProfesionClick}>Modificar Profesion</button>
                </span>
            </div>
            {
                ofertasLaborales.length === 0 ? <Loader /> : ofertasLaborales.map(ofertaLaboral => (
                    <ListaOfertas
                        numero={ofertaLaboral.id}
                        sucursal={ofertaLaboral.idsucursal}
                        profesion={ofertaLaboral.profesion}
                        cargo={ofertaLaboral.cargo_vacante}
                        descripcionCargo={ofertaLaboral.descripcion_cargo}
                        salario={ofertaLaboral.salario}
                        status={ofertaLaboral.status}
                        postulacion={handlerPostulacionClick}
                    />
                ))
            }

            <footer>
                <p>&copy; Hiring Group | Perfil Candidato</p>
            </footer>
        </div>
    )
}

export default UsuarioCandidato