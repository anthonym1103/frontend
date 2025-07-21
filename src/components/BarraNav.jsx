import './hojasEstilos/barraNav.css'
import logo from '../recursos/logo_hiring_group.png'

function MultiOpcion({redireccionA, textoA, redireccionB, textoB}){
    return(
        <div>
            <ul>
                <li><a className="boton-header" href={redireccionA}>{textoA}</a></li>
                <li><a className="boton-header" href={redireccionB}>{textoB}</a></li>
            </ul>
        </div>
    )
}
function OneOpcion({redireccion, texto}){
    return(
        <div>
            <ul>
                <li><a className="boton-header" href={redireccion}>{texto}</a></li>
            </ul>
        </div>
    )
}

const BarraNav = ({redireccion1, texto1, redireccion2, texto2, tipo}) => {
    return(
        <header className="red-bar">
            <div className="header-content">
                <div className="header-logo-container">
                    <img src={logo} alt="Logo Hiring Group"/>
                    <h1>Hiring Group</h1>
                </div>
                <nav id="header-nav">
                    {
                        tipo ? (
                            <MultiOpcion
                                redireccionA = {redireccion1}
                                textoA= {texto1}
                                redireccionB={redireccion2}
                                textoB= {texto2}
                            />
                        ):
                            <OneOpcion
                                redireccion={redireccion1}
                                texto={texto1}
                            />
                    }
                </nav>
            </div>
        </header>
    )

}

export default BarraNav