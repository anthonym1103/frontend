import BarraNav from './BarraNav'
import './hojasEstilos/estilos.css'

const Login = () => {

    return(
        <div>
            <BarraNav/>
            <main>
                <section>
                    <h2>Iniciar Sesión</h2>
                    <form onsubmit="event.preventDefault(); iniciarSesion();">
                        <label for="usuario">Usuario:</label>
                        <input type="text" id="usuario" placeholder="Tu usuario/correo" required />

                        <label for="clave">Contraseña:</label>
                        <input type="password" id="clave" placeholder="Tu contraseña" required />

                        <button type="submit" class="boton-header">Entrar</button>
                    </form>
                    <a class="boton" href="index.html">Regresar </a>
                </section>
            </main>

            <footer>
                <p>&copy; Hiring Group | Inicio de Sesión</p>
            </footer>
        </div>
    )

}


export default Login
