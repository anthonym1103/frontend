import BarraNav from "./BarraNav";
import { useState } from "react";
import "./hojasEstilos/estilos.css"
import { data } from "react-router-dom";

function FormDataEmpresa ({handlerForm, handlerSubmit, dataform}){
    return(
        <div>
            <main>
                <section>
                    <h2>Gestión de Empresas Clientes</h2>

                    <h3>Registrar Nueva Empresa</h3>
                    <form onSubmit = {handlerSubmit}>
                        <input type="text" id="nombreEmpresa" name="nombre" onChange={handlerForm} value={dataform.nombre} placeholder="Nombre de la Empresa..." required/>
                        <input type="text" id="sectorEmpresa" name="sector" onChange={handlerForm} value={dataform.sector} placeholder="Sector (ej: 'Tecnología')..." required/>
                        <input type="text" id="contactoEmpresa" name="personacontacto" onChange={handlerForm} value={dataform.personacontacto} placeholder="Persona de Contacto..." required/>
                        <input type="text" id="rif" name="rif" onChange={handlerForm} value={dataform.rif} placeholder="Rif..." required/>
                        <input type="text" id="telefono" name="telf" onChange={handlerForm} value={dataform.telf} placeholder="Telefono..." required/>
                        <input type="text" id="identificador sucursal" name="idsucursal" onChange={handlerForm} value={dataform.idsucursal} placeholder="Sucursal..." required/>
                        <h3>Datos de inicio de sesion en el sistema</h3>
                        <input type="email" id="usuarioRHEmpresa" name="correo" onChange={handlerForm} value={dataform.correo} placeholder="Correo RH(provisional)..." required/>
                        <input type="password" id="claveRHEmpresa" name="contrasenia" onChange={handlerForm} value={dataform.contrasenia} placeholder="Clave RH (provisional)..." required/>
                        <button type="submit" className="boton">Registrar Empresa</button>
                    </form>

                    <h3>Listado de Empresas Registradas</h3>
                    <ul id="lista-empresas"></ul>
                </section>
            </main>
        </div>
    )
}


function EmpresaRegisted(){
    return(
        <div>
            <h2>El usuario empresa a sido creado con exito!!!</h2>
            <a className="boton" href="/usuariohiring"> Regresar al menu principal</a>
        </div>
    )
}




const CreateEmpresa = () => {

    const [dataForm, setDataForm] = useState({id: 0, nombre: '', rif: '', telf: '', sector: '', personacontacto: '', idsucursal: '', correo: '', contrasenia: ''})
    const [isRegisted, setResgisted] = useState(true)

    const handlerFormInput = (e) => {
        setDataForm(
            {
                ...dataForm,
                [e.target.name]: e.target.value
            }
        )
    }

    const handlerSubmitForm = async (e)=> {
        e.preventDefault()
        await fetch("http://localhost:8000/userHG/createuserempresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
        })
        setResgisted(true)
    }

    return(
        <div>
            <BarraNav
                redireccion1={'/'}
                texto1={"Ir a inicio"}
                redireccion2={'/usuariohiring'}
                texto2={"Regresar"}
                tipo={true}
            />

            {
                isRegisted ? (
                    <FormDataEmpresa
                        handlerForm = {handlerFormInput}
                        handlerSubmit = {handlerSubmitForm}
                        dataform = {dataForm}
                    />
                ):<EmpresaRegisted/>
            }
            
            <footer>
            <p>&copy; Universidad Nacional Experimental de Guayana | Prof. María Raquel Herrera</p>
            </footer>
            
        </div>
    )
}


export default CreateEmpresa