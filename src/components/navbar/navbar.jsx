import React from 'react';
import './navbar.css'
import logo from "../../accets/img/logo.svg"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../redux/userReducer";
import avatarLogo from '../../accets/img/avatar.svg'
import {API_URL} from "../../accets/config";

const Navbar = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)

    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    return <div className='navbar'>
        <div className='container'>

            <img src={logo} alt="" className='navbar__logo'/>
            <div className="navbar__header">mern cloud</div>
            {!isAuth && <div className='navbar__login'><NavLink to='/login'>увійти</NavLink></div>}
            {isAuth && <div className='navbar__logout' onClick={() => dispatch(logOut())}>вийти </div>}
            {isAuth &&
            <NavLink to='/profile'>
                <img className='navbar__avatar' src={avatar} alt=""/>
            </NavLink>
            }


            {!isAuth && <div className="navbar__registration"><NavLink to='/registration'>регістрація</NavLink></div>}
        </div>

    </div>

};

export default Navbar;