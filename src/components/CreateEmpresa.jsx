import BarraNav from "./BarraNav";
import "./hojasEstilos/estilos.css"

const CreateEmpresa = () => {

    const handlerSubmitForm = async (e)=> {
    }

    return(
        <div>
            <BarraNav/>
            <main>
                <section>
                    <h2>Gestión de Empresas Clientes</h2>

                    <h3>Registrar Nueva Empresa</h3>
                    <form onSubmit = {handlerSubmitForm}>
                        <input type="text" id="nombreUsuarioEmpresa" placeholder="Usuario para Empresa (ej: 'empresaX')" required/>
                        <input type="text" id="nombreEmpresa" placeholder="Nombre de la Empresa" required/>
                        <input type="text" id="sectorEmpresa" placeholder="Sector (ej: 'Tecnología')" required/>
                        <input type="text" id="contactoEmpresa" placeholder="Persona de Contacto" required/>
                        <input type="text" id="usuarioRHEmpresa" placeholder="Usuario RH (provisional)" required/>
                        <input type="password" id="claveRHEmpresa" placeholder="Clave RH (provisional)" required/>
                        <button type="submit" class="boton">Registrar Empresa</button>
                    </form>

                    <h3>Listado de Empresas Registradas</h3>
                    <ul id="lista-empresas"></ul>

                    <a class="boton" href="hiring_group_panel.html"> Regresar</a>
                </section>
            </main>

            <footer>
            <p>&copy; Universidad Nacional Experimental de Guayana | Prof. María Raquel Herrera</p>
            </footer>
        </div>
    )
}


export default CreateEmpresa