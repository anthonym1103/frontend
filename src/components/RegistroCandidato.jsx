import './hojasEstilos/estilos.css'
import { useState } from 'react'
import BarraNav from './BarraNav'

function FormRegisterCandidato({handlerForm, submitUser, dataform, backPage}){
    return(
        <div>
            
            <h2>Registro de Postulante</h2>
            <h2 id="textDatos">DATOS BASICOS</h2>
            <form onSubmit={submitUser}>
                <input type="text" name="cedula" onChange={handlerForm} value={dataform.cedula} placeholder="Cedula..." required />
                <input type="text" name="nombre" onChange={handlerForm} value={dataform.nombre} placeholder="Nombre..." required />
                <input type="text" name="apellido" onChange={handlerForm} value={dataform.apellido} placeholder="Apellido..." required />
                <input type="text" name="telf" onChange={handlerForm} value={dataform.telf} placeholder="Telefono..." required />
                <input type="text" name="edad" onChange={handlerForm} value={dataform.edad} placeholder="Edad..." required />
                <select name="sexo" onChange={handlerForm} value={dataform.sexo} required>
                    <option value="">--Seleccione--</option>
                    <option value="m">Masculino</option>
                    <option value="f">Femenino</option>
                </select>
                <input type="text" name="universidad_egreso" onChange={handlerForm} value={dataform.universidad_egreso} placeholder="Universidad de egreso" required />
                <input type="text" name="idsucursal" onChange={handlerForm} value={dataform.idsucursal} placeholder="Sucursal..." required />
                <h2 id="textDatos">Datos de inicio de sesion en el sistema</h2>
                <input type="email" name="correo" onChange={handlerForm} value={dataform.correo} placeholder="Correo..." required />
                <input type="password" name="contrasenia" onChange={handlerForm} value={dataform.contrasenia} placeholder="Contraseña..." required />
                <button className="boton" type="submit">Registrarse</button>
                <a class="boton" onClick={backPage}>Regresar</a>

            </form>
            
        </div>
    )
}

function FormRegisterExperiencia({handlerFormEx, submitEx, dataformEx,backPage}){
    return(
        <div>
            
            <h2>Registro de Postulante</h2>
            <h2 id="textDatos">DATOS DE LA EXPERIENCIA</h2>
            <form onSubmit={submitEx}>
                <input type="text" name="empresa" onChange={handlerFormEx} value={dataformEx.empresa} placeholder="Empresa..." required />
                <input type="text" name="fecha_inicio" onChange={handlerFormEx} value={dataformEx.fecha_inicio} placeholder="Fecha de inicio..." required />
                <input type="text" name="fecha_finalizacion" onChange={handlerFormEx} value={dataformEx.fecha_finalizacion} placeholder="Fecha de finalizacion..." required />
                <input type="text" name="cargo" onChange={handlerFormEx} value={dataformEx.cargo} placeholder="Cargo..." required />
                <button type="submit" className="boton">Siguiente</button>
                <a className="boton" onClick={backPage}>Regresar</a>
            </form>
           
        </div>
    )
}

function FormRegisterProfesion({handlerFormProf, submitProf, dataformProf}){
    return(
        <div>
            <h2>Registro de Postulante</h2>
            <h2 id="textDatos">DATOS PROFESION</h2>
            <form onSubmit={submitProf}>
                <input type="text" name="nombre" onChange={handlerFormProf} value={dataformProf.nombre} placeholder="Nombre..." required />
                <input type="text" name="descripcion" onChange={handlerFormProf} value={dataformProf.descripcion} placeholder="Descripcion..." required />
                <button type="submit" className="boton">Siguiente</button>
                <a className="boton" href="/">Regresar</a>
            </form>
        </div>
    )
}

function UserRegisted(){
    return(
        <div>
            <h1>Su registro fue hecho con exito ya puede iniciar sesion!!!</h1>
            <a class="boton" href="/">Regresar</a>
        </div>
    )
}




const RegistroCandidato = () => {
    
    const [dataForm, setDataForm] = useState({})
    const [estadoPage, setEstado] = useState(0)
    const [dataFormEx, setDataFormEx] = useState({id: 1, empresa: '',fecha_inicio: '',fecha_finalizacion: '', cargo: ''})
    const [dataFormProf, setDataFormProf] = useState({id: 1, nombre: '', descripcion: ''})
    const [inRegistro, setRegister] = useState(true)

    const handlerBackEstado = () =>{
        setEstado(estadoPage - 1)
    }

    const handlerFormInput = (e) => {
        setDataForm(
            {
                ...dataForm,
                [e.target.name]: e.target.value
            }
        )
    }
    const handlerFormInputEx = (e) => {
        setDataFormEx(
            {
                ...dataFormEx,
                [e.target.name]: e.target.value
            }
        )
    }

    const handlerFormInputProf = (e) => {
        setDataFormProf(
            {
                ...dataFormProf,
                [e.target.name]: e.target.value
            }
        )
    }


    const handlerFormSubmitUser = async (e) => {
        
        e.preventDefault()
        await fetch("http://localhost:8000/userCandidato/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
        })
        setRegister(false)
    }
    const handlerFormSubmitExperiencia = async (e) => {
        e.preventDefault()
        await fetch("http://localhost:8000/userCandidato/createExperiencia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataFormEx)
        })
        setEstado(estadoPage + 1)
    }
    const handlerFormSubmitProfesion = async (e) => {
        e.preventDefault()
        await fetch("http://localhost:8000/userCandidato/createProfesion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataFormProf)
        })
        setEstado(estadoPage + 1)
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
            <main>
                <section>
                    {
                        inRegistro?(
                            estadoPage === 0 ?(
                                <FormRegisterProfesion
                                    handlerFormProf={handlerFormInputProf}
                                    submitProf={handlerFormSubmitProfesion}
                                    dataformProf={dataFormProf}
                                />
                            ) : estadoPage === 1 ? (
                                <FormRegisterExperiencia
                                    handlerFormEx={handlerFormInputEx}
                                    submitEx={handlerFormSubmitExperiencia}
                                    dataformEx={dataFormEx}
                                    backPage = {handlerBackEstado}
                                />

                            ):
                                <FormRegisterCandidato
                                    handlerForm ={handlerFormInput}
                                    submitUser= {handlerFormSubmitUser}
                                    dataform= {dataForm}
                                    backPage = {handlerBackEstado}
                                />
                            
                            
                        ): <UserRegisted/>
                    }
                    
                </section>
            </main>

            <footer>
                <p>&copy; Hiring Group | Registro para candidatos</p>
            </footer>

        </div>
    )
}


export default RegistroCandidato