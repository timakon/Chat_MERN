import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/auth.context";

export const Navbar = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return(
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding:'0 2rem'}}>
                <span href="#" className="brand-logo">Chat_mern</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/friends">Друзья</NavLink></li>
                    <li><NavLink to="/create">Посты</NavLink></li>
                    <li><NavLink to="/">Новости</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
};
