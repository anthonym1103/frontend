import BarraNav from './BarraNav'
import { useNavigate } from 'react-router-dom'
import './hojasEstilos/estilos.css'


const UsuarioHirin = () => {
    const navegate = useNavigate()

    const handlerEmpresaCreateClick = () => {
        navegate('/usuariohiring/empresacreate')
    }

    const handlerOfertaslaboralesClick = () => {
        navegate('/usuariohiring/ofertaslaborales')
    }

    const handlerPostulacionesClick = () => {
        navegate('/usuariohiring/postulaciones');
    }

    const handlerDataBasicaesClick = () => {
        navegate('/registro')
    }

    
    
    return(
        <div>
            <BarraNav/>
            <main>
                <section>
                    <h2>Panel de Gestión Hiring Group</h2>
                    <p>Bienvenido al panel de gestión de Hiring Group. Aquí puedes administrar empresas clientes, contrataciones, nóminas y data básica.</p>

                    <h3>Gestión de Empresas Clientes</h3>
                    <button class="boton" onClick={handlerEmpresaCreateClick}>Administrar Empresas</button>

                    <h3>Gestion de ofertas laborales</h3>
                    <button class="boton" onClick={handlerOfertaslaboralesClick}>Visualizar ofertas</button>

                    <h3>Contratación de Postulantes</h3>
                    <button class="boton" onClick={handlerPostulacionesClick}>Realizar Contrataciones</button>

                    <h3>Manejo de Data Básica</h3>
                    <button class="boton" onClick={handlerDataBasicaesClick}>Administrar Bancos y Otros</button>

                </section>
                <a class="boton" href="/">Regresar</a>
            </main>

            <footer>
                <p>&copy; Universidad Nacional Experimental de Guayana | Prof. María Raquel Herrera</p>
            </footer>
        </div>
    )
}

export default UsuarioHirin