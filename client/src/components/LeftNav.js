import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/">
            <img
              classe="icon-nav"
              src="./img/icons/home.png"
              alt="home"
              title="Accueil"
            />
          </NavLink>
          <br />
          <NavLink to="/profil">
            <img
              classe="icon-nav"
              src="./img/icons/user.png"
              alt="user"
              title="Profil"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
