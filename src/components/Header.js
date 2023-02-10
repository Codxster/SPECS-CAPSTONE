import { useContext } from "react"
import { NavLink } from "react-router-dom"
import AuthContext from "../store/AuthContext"
import "../css/header.css"

const Header = () => {
    const { logout, token } = useContext(AuthContext)
    return (
        <nav className="header">
            <nav className="HeaderName">
            SPECS CAPSTONE
            </nav>
            {token && (
                <nav className="linksContainer">
                <>
                    <NavLink to="/Home" className='navLinks'>Home</NavLink>
                    <NavLink to="/Songs" className='navLinks'>Songs</NavLink>
                    <button className='logoutBtn'onClick={() => logout()}>LOGOUT</button>
                </>
                </nav>
            )}
        </nav>
    )
}

export default Header