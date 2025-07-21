import BarraNav from './BarraNav'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './hojasEstilos/estilos.css'

const Login = () => {
    const [dataForm, setDataForm] = useState({ correo: '', contrasenia: '' })
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handlerFormInput = (e) => {
        setDataForm(
            {
                ...dataForm,
                [e.target.name]: e.target.value
            }
        )
    }

    const handlerSubmit = async (e)=> {
        e.preventDefault()
        const response = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
        })

        const data = await response.json()
        if(data.authenticated){
            switch (data.user_type) {
                case 'usuariohg':
                    navigate('/usuariohiring',{
                        state: data.user_data
                    });
                    break;
                case 'usuarioempresa':
                    navigate('/usuarioempresa',{
                        state: data.user_data
                    });
                    break;
                case 'usuariocandidato':
                    navigate('/usuariocandidato',{
                        state: data.user_data
                    });
                    break;
                default:
                    navigate('/');
            }
        }else{
            setError("Credenciales incorrectas")
        }
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
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handlerSubmit}>
                        <label >Usuario:</label>
                        <input type="text" id="usuario" name='correo' onChange={handlerFormInput} value={dataForm.correo} placeholder="Tu usuario/correo" required />

                        <label >Contraseña:</label>
                        <input type="password" id="clave" name='contrasenia' onChange={handlerFormInput} value={dataForm.contrasenia} placeholder="Tu contraseña" required />
                        <div className="botnIniciarSesion">
                            <span className="botonFormulario">
                                <button type="submit" >Entrar</button>
                            </span>
                        </div>
                    </form>
                </section>
            </main>

            <footer>
                <p>&copy; Hiring Group | Inicio de Sesión</p>
            </footer>
        </div>
    )

}


export default Login
