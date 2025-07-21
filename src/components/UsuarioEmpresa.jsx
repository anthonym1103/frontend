import BarraNav from "./BarraNav";
import { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../recursos/logo_hiring_group.png'
import './hojasEstilos/estilos.css'


function ListaOfertas({numero, sucursal, profesion, cargo, descripcionCargo, salario, status, eliminar, actualizar, changeStatus}){
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
                <h3 id="opcionesOferta">Opciones de modificacion de la oferta</h3>
                <span className="botonFormulario">
                    <button type="submit" onClick={eliminar}>Eliminar</button>
                </span>
                <span className="botonFormulario">
                    <button type="submit" onClick={actualizar}>Actualizar</button>
                </span>
                <span className="botonFormulario">
                    <button type="submit" onClick={changeStatus}>Cambiar Status</button>
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


const UsuarioEmpresa = ()=>{
    const location = useLocation();
    const { dataOferta } = location.state || {};
    const [ofertasLaborales, setOfertas] = useState([])
    const navegate = useNavigate()

    const handlerActulizaClick = (dataOferta) => {
        navegate('/usuarioempresa/actualizaroferta',{
            state:{dataOferta}
        });
    }

    const handlerCreateClick = () => {
        navegate('/usuarioempresa/crearoferta');
    }

    const getOfertas = async () => {
        const allOfertas = await fetch("http://localhost:8000/userEmpresa/ofertaslaborales")
        const ofertasJson = await allOfertas.json()
        setOfertas(ofertasJson)
    }

    const handlerDeleteOferta = async (id) =>{
        await fetch(`http://localhost:8000/userEmpresa/deleteOferta/${id}`, {
            method: "DELETE"
        })
    }

    /**/

    const handlerStatusButton = async (id, valor) => {
        console.log(valor)
        console.log(id)
        await fetch(`http://localhost:8000/userEmpresa/updateOferta/${id}/${valor}`, {
            method: "PUT"
        })
    }

    useEffect(() => {
        getOfertas()
    })


    return(
        <div>
            <BarraNav
                redireccion1={'/'}
                texto1={"Ir a inicio"}
                redireccion2={'/usuarioempresa/gestionariniciosesion'}
                texto2={"Editar Inicio Sesion"}
                tipo={true}
            />
            <div>
                <span className="botonFormulario">
                    <button type="submit" onClick={handlerCreateClick}><span>Crear</span></button>
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
                        eliminar={() => handlerDeleteOferta(ofertaLaboral.id)}
                        actualizar={() => handlerActulizaClick (ofertaLaboral)}
                        changeStatus={() => handlerStatusButton(ofertaLaboral.id, ofertaLaboral.status ? "true" : "false")}
                    />

                ))
            }

            <footer>
                <p>&copy; Hiring Group | Perfil Empresa</p>
            </footer>
        </div>
    )
}

export default UsuarioEmpresa