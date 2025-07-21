import BarraNav from "./BarraNav";
import './hojasEstilos/estilos.css'



const GestionarDataBasica = () =>{
    return(
        <div>
            <BarraNav
                redireccion1={'/'}
                texto1={"Ir a inicio"}
                redireccion2={'/usuariohiring'}
                texto2={"Regresar"}
                tipo={true}
            />
            <main>
                <h1>Gestion de data basica de Hiring Group</h1>
            </main>

            <footer>
                <p>&copy; Universidad Nacional Experimental de Guayana | Prof. María Raquel Herrera</p>
            </footer>
        </div>
    )
}


export default GestionarDataBasica