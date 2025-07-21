import BarraNav from "./BarraNav";
import { useState } from "react";
import './hojasEstilos/estilos.css'


function FormDataOfertas ({handlerForm, handlerSubmit, dataform}){
    return(
        <div>
            <main>
                <section>
                    <h2>Gestión de Ofertas Laborales</h2>

                    <h3>Registrar una Nueva Oferta</h3>
                    <form onSubmit = {handlerSubmit}>
                        <input type="text" id="Sucursal" name="idsucursal" onChange={handlerForm} value={dataform.idsucursal} placeholder="Sucursal..." required/>
                        <input type="text" id="Profesion" name="profesion" onChange={handlerForm} value={dataform.profesion} placeholder="Profesion..." required/>
                        <input type="text" id="cargoVacante" name="cargo_vacante" onChange={handlerForm} value={dataform.cargo_vacante} placeholder="Cargo vacante..." required/>
                        <input type="text" id="descripcionCargo" name="descripcion_cargo" onChange={handlerForm} value={dataform.descripcion_cargo} placeholder="Descripcion del cargo..." required/>
                        <input type="text" id="Salario" name="salario" onChange={handlerForm} value={dataform.salario} placeholder="Salario..." required/>
                        <button type="submit" className="boton">Crear Oferta</button>
                    </form>
                </section>
            </main>
        </div>
    )
}



function OfertaCreted(){
    return(
        <div>
            <h2>La oferta se ha creado con exito!!!</h2>
            <a className="boton" href="/usuarioempresa"> Regresar al menu principal</a>
        </div>
    )
}

const ActualizarOferta = ()=>{
    
    const [dataForm, setDataForm] = useState({id: 0, idsucursal: 1, profesion: '', cargo_vacante: '', decripcion_cargo: '', salario: '', status:true})
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
        await fetch("http://localhost:8000/userEmpresa/createOfertaLaboral", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
        })
        setResgisted(false)
    }
    
    return(
        <div>
            <BarraNav
                redireccion1={'/'}
                texto1={"Ir a inicio"}
                redireccion2={'/usuarioempresa'}
                texto2={"Regresar"}
                tipo={true}

            />
            
            {
                isRegisted ? (
                    <FormDataOfertas
                        handlerForm = {handlerFormInput}
                        handlerSubmit = {handlerSubmitForm}
                        dataform = {dataForm}
                    />
                ):<OfertaCreted/>
            }

            <footer>
            <p>&copy; Universidad Nacional Experimental de Guayana | Prof. María Raquel Herrera</p>
            </footer>

        </div>
    )

}


export default ActualizarOferta