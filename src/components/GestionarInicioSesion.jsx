import BarraNav from "./BarraNav";
import './hojasEstilos/estilos.css'



const GestionarInicioSesion = () =>{
    return(
        <div>
            <BarraNav
                redireccion1={'/'}
                texto1={"Ir a inicio"}
                redireccion2={'/usuarioempresa'}
                texto2={"Regresar"}
                tipo={true}
            />

            <main>
                <h1>Cambio de correo o contraseña</h1>
            </main>

            <footer>
                <p>&copy; Universidad Nacional Experimental de Guayana | Prof. María Raquel Herrera</p>
            </footer>
        </div>
    )
}


export default GestionarInicioSesion