import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    return (
        <div className="header">
            <img className="logo" src={logo} alt="" />
            <nav>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/review">Order Review</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>
                <button onClick={()=>setLoggedInUser({})}>Sing out</button>
            </nav>
        </div>
    );
};

export default Header ;