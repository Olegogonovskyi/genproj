import React, { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { apiUrls, baseUrls } from '../../costants/Urls';
import style from './Header.module.css'
import classNames from 'classnames';
import { useAppSelector } from 'src/redux/store';


const Header: FC = () => {

  const [isOpen, setIsOpen] = useState(false);

  const {user} = useAppSelector((state)=> state.usersAuthReducer)

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);
  const navigate = useNavigate()
  return (
    <div>

      <div className={style.header}>
        <div>
          <img src="" alt="" onClick={()=> {
            navigate('/')}} />
        </div>
        <button className={style.mobileMenuBtn} onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </button>

        <div className={classNames(style.nav, { [style.active]: isOpen })}>
          <ul onClick={closeMenu}>
            <li><NavLink to={apiUrls.article.getAll}>Статті</NavLink></li>
            <li><NavLink to={apiUrls.ancestors.getAllAncestors}>Персони</NavLink></li>
            <li><NavLink to={apiUrls.ancestors.getAllAncestorsDates}>Події</NavLink></li>
            <li><NavLink to={baseUrls.chronology}>Хронологія</NavLink></li>
          </ul>
        </div>
        <div className={style.login}>
                <ul>
                  <li className={user ? 'visible' : 'hidden'}><NavLink to={apiUrls.users.me}>Про мене</NavLink></li>
                  <li className={user.isVerified ? 'visible' : 'hidden'}><NavLink to={baseUrls.adminDashboard}>Адмін панель</NavLink></li>
                  <li className={!user ? 'visible' : 'hidden'}><NavLink to={apiUrls.auth.register}>Register</NavLink></li>
                  <li className={!user ? 'visible' : 'hidden'}><NavLink to={apiUrls.auth.login}>Login</NavLink></li>
                </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
