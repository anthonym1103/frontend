import BarraNav from "./BarraNav";
import './hojasEstilos/estilos.css'



const ModificarProfesiones = () =>{
    return(
        <div>
            <BarraNav
                redireccion1={'/'}
                texto1={"Ir a inicio"}
                redireccion2={'/usuariocandidato'}
                texto2={"Regresar"}
                tipo={true}
            />
            <main>
                <h1>Seleccione sus modificaciones para sus profesiones</h1>
            </main>

            <footer>
                <p>&copy; Universidad Nacional Experimental de Guayana | Prof. María Raquel Herrera</p>
            </footer>
        </div>
    )
}


export default ModificarProfesiones