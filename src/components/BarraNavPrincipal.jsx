import './hojasEstilos/barraNav.css'
import logo from '../recursos/logo_hiring_group.png'

const BarraNavPrincipal = () => {
    return(
        <header className="red-bar">
            <div className="header-content">
                <div className="header-logo-container">
                    <img src={logo} alt="Logo Hiring Group"/>
                    <h1>Hiring Group</h1>
                </div>
                <nav id="header-nav">
                    <ul>
                        <li><a className="boton-header" href="/login">Acceder al Sistema</a></li>
                        <li><a className="boton-header" href="/registro">Registrarse Como Candidato</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )

}

export default BarraNavPrincipal