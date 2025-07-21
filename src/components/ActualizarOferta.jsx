import BarraNav from "./BarraNav";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import './hojasEstilos/estilos.css'


function FormDataOfertas ({handlerForm, handlerSubmit, dataform, numero}){
    return(
        <div>
            <main>
                <section>
                    <h2>Actualizar Oferta N° {numero}</h2>
                    <form onSubmit = {handlerSubmit}>
                        <input type="text" id="Sucursal" name="idsucursal" onChange={handlerForm} value={dataform.idsucursal} placeholder="Sucursal..." required/>
                        <input type="text" id="Profesion" name="profesion" onChange={handlerForm} value={dataform.profesion} placeholder="Profesion..." required/>
                        <input type="text" id="cargoVacante" name="cargo_vacante" onChange={handlerForm} value={dataform.cargo_vacante} placeholder="Cargo vacante..." required/>
                        <input type="text" id="descripcionCargo" name="descripcion_cargo" onChange={handlerForm} value={dataform.descripcion_cargo} placeholder="Descripcion del cargo..." required/>
                        <input type="text" id="Salario" name="salario" onChange={handlerForm} value={dataform.salario} placeholder="Salario..." required/>
                        <select name="status" onChange={handlerForm} value={dataform.status.toString()} required>
                            <option value="">--Seleccione--</option>
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                        <button type="submit" className="boton">Actualizar</button>
                    </form>
                </section>
            </main>
        </div>
    )
}

function OfertaActualized({data}){
    return(
        <div>
            <h2>Oferta N° {data} actualizada con extito!!!</h2>
            <a className="boton" href="/usuarioempresa"> Regresar al menu principal</a>
        </div>
    )
}

const ActualizarOferta = ()=>{
    const location = useLocation();
    const { dataOferta } = location.state || {};
    const [dataForm, setDataForm] = useState({id: dataOferta.id || 0, idsucursal: dataOferta.idsucursal || 0, profesion: dataOferta.profesion ||'', cargo_vacante: dataOferta.cargo_vacante || '', descripcion_cargo: dataOferta.descripcion_cargo || '', salario: dataOferta.salario || 0, status: dataOferta.status.toString() || ""})
    const [isActualizado, setActualizado] = useState(true)

    const handlerFormInput = (e) => {
        setDataForm(
            {
                ...dataForm,
                [e.target.name]: e.target.value
            }
        )
    }
    
    const handlerActualizButton = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:8000/userEmpresa/updateOferta/${dataOferta.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
        })
        setActualizado(false)
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
                isActualizado ? (
                    <FormDataOfertas
                        handlerForm = {handlerFormInput}
                        handlerSubmit = {handlerActualizButton}
                        dataform = {dataForm}
                        numero = {dataOferta.id}
                    />
                ):<OfertaActualized
                    data = {dataOferta.id}
                />
            }
            
        </div>
    )

}


export default ActualizarOferta