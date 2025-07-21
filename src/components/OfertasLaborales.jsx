import BarraNav from "./BarraNav"
import { useState , useEffect } from "react"
import logo from '../recursos/logo_hiring_group.png'
import './hojasEstilos/estilos.css'


function ListaOfertas({numero, sucursal, profesion, cargo, descripcionCargo, salario, status}){
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


const OfertasLaborales = () => {

    const [busqueda, setBusqueda] = useState("")
    const [inBusqueda, setInBusqueda] = useState(false)
    const [ofertasLaboralesCargo, setOfertasCargo] = useState([])
    const [ofertasLaborales, setOfertas] = useState([])


    const getOfertas = async () => {
        const allOfertas = await fetch("http://localhost:8000/userHG/ofertaslaborales")
        const ofertasJson = await allOfertas.json()
        setOfertas(ofertasJson)
    }

    const getOfertasCargo = async (data) => {
        const allOfertasCargo = await fetch(`http://localhost:8000/userHG/ofertaslaborales/${data}`)
        const ofertasCargoJson = await allOfertasCargo.json()
        setOfertasCargo(ofertasCargoJson)
    }

    const handlerFormInput = (e) => {
        setBusqueda(e.target.value)
        if(busqueda.length === 1){
            setInBusqueda(false)
        }
    }

    const handlerFormSubmit = async (e) => {
        e.preventDefault()
        getOfertasCargo(busqueda)
        setInBusqueda(true)
    }


    useEffect(() => {
        getOfertas()
    })

    return(
        <div>
            <BarraNav
                redireccion1={'/'}
                texto1={"Ir a inicio"}
                redireccion2={'/usuariohiring'}
                texto2={"Regresar"}
                tipo={true}
            />

            <div className="contenedorForm" >
                <form className="formBusqueda" onSubmit={handlerFormSubmit}>
                    <input className="campoFormulario" type="text" onChange={handlerFormInput} value={busqueda} placeholder="Campo de la oferta.." required />
                    <span className="botonFormulario">
                        <button type="submit"><span>Buscar</span></button>
                    </span>
                </form>
            </div>

            {
                inBusqueda ? (
                    ofertasLaboralesCargo.length === 0 ? <Loader/> : ofertasLaboralesCargo.map(ofertaLaboral => (
                        <ListaOfertas
                            numero={ofertaLaboral.id}
                            sucursal={ofertaLaboral.idsucursal}
                            profesion={ofertaLaboral.profesion}
                            cargo={ofertaLaboral.cargo_vacante}
                            descripcionCargo={ofertaLaboral.descripcion_cargo}
                            salario={ofertaLaboral.salario}
                            status={ofertaLaboral.status}
                        />
                    ))
                ):(
                    ofertasLaborales.length === 0 ? <Loader /> : ofertasLaborales.map(ofertaLaboral => (

                        <ListaOfertas
                            numero={ofertaLaboral.id}
                            sucursal={ofertaLaboral.idsucursal}
                            profesion={ofertaLaboral.profesion}
                            cargo={ofertaLaboral.cargo_vacante}
                            descripcionCargo={ofertaLaboral.descripcion_cargo}
                            salario={ofertaLaboral.salario}
                            status={ofertaLaboral.status}
                        />

                    ))
                )
            }
            <footer>
            <p>&copy; Universidad Nacional Experimental de Guayana | Prof. María Raquel Herrera</p>
            </footer>
        </div>
    )
}

export default OfertasLaborales