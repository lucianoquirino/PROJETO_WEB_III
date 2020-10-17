import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                Início
            </Link>
            <Link to="/ofertar">
                Ofertar carona
            </Link>   
            <Link to="/solicitar">
                Solicitar carona
            </Link>  
        </nav>
    </aside>