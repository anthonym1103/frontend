import BarraNav from "./BarraNav"
import './hojasEstilos/estilos.css'

const Postulaciones = () => {
    return(
        <div>
            <BarraNav/>
            <main>
                <section>
                    <h2>Contratación de Postulantes</h2>
                    <p>Selecciona una oferta y un candidato para formalizar una contratación.</p>

                    <h3>Ofertas Activas con Postulaciones</h3>
                    <ul id="lista-ofertas-contratacion"></ul>

                    <h3>Detalles de Contratación</h3>
                    <form onsubmit="event.preventDefault(); realizarContratacion();">
                        <label for="selectOferta">Seleccionar Oferta:</label>
                        <select id="selectOferta" required></select>

                        <label for="selectCandidato">Seleccionar Candidato:</label>
                        <select id="selectCandidato" required></select>

                        <input type="text" id="duracionContrato" placeholder="Duración del contrato (ej: '6 meses', 'indefinido')" required />
                        <input type="number" id="salarioContrato" placeholder="Salario mensual a devengar" required min="0" />
                        <input type="text" id="tipoSangre" placeholder="Tipo de sangre" required/>
                        <input type="text" id="contactoEmergencia" placeholder="Persona de contacto en caso de emergencia" required />
                        <input type="tel" id="telEmergencia" placeholder="Teléfono de emergencia" required />
                        <input type="text" id="nroCuenta" placeholder="Número de cuenta bancaria" required />
                        <input type="text" id="bancoContrato" placeholder="Banco (ej: 'Banco de Venezuela')" required />

                        <button type="submit" class="boton">Contratar Candidato</button>
                    </form>

                    <a class="boton" href="/usuariohiring"> Regresar</a>
                </section>
            </main>

            <footer>
                <p>&copy; Universidad Nacional Experimental de Guayana | Prof. María Raquel Herrera</p>
            </footer>
        </div>
    )
}

export default Postulaciones