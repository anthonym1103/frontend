import React from 'react'
import { useNavigate } from 'react-router-dom'
import BarraNavPrincipal from './BarraNavPrincipal'
import empresa from '../recursos/empresa.jpg'
import './hojasEstilos/principal.css'

const PaginaPrincipal = () =>{

    const navegate = useNavigate()

    const handlerLoginClick = () => {
        navegate('/login');
    }

    const handlerRegisterClick = () => {
        navegate('/registro')
    }

    return(
        <div>
            <BarraNavPrincipal/>
            <main>
                <section>
                    <p id="user-greeting" className="welcome-message"></p>

                    
                    <div className="hero-section">
                        <h2>Sistema Nacional de Contratación</h2>
                        <p>Hiring Group es una empresa a nivel nacional dedicada al reclutamiento, contratación y pagos de personal por prestar servicios a terceros (subcontrata)
                            La empresa necesita que se le desarrolle un sistema web para llevar a cabo el
                            cumplimiento de los procesos antes mencionados.</p>
                        <img src={empresa} alt="Logo Hiring Group"/>
                        <p className = "textAcceso">Accede o Regístrate para comenzar:</p>
                        <div id="main-menu-options" className="button-container">
                            <button className="main-menu-button" onClick={handlerLoginClick}>Acceder al Sistema</button>
                            <button className="main-menu-button" onClick={handlerRegisterClick}>Registrarse Como Candidato</button>
                        </div>
                    </div>

                    <h3>Departamentos</h3>
                    <ul className="department-list">
                        <li>Recursos Humanos</li>
                        <li>Contratación y Nómina</li>
                        <li>Gestión de Vacantes</li>
                        <li>Soporte Técnico</li>
                    </ul>
                </section>
            </main>

            <footer>
                <p>&copy; Universidad Nacional Experimental de Guayana | Prof. María Raquel Herrera</p>
            </footer>

        </div>
    )
}

export default PaginaPrincipal