import React, { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { apiUrls, baseUrls } from '../../costants/Urls';
import style from './Header.module.css'
import classNames from 'classnames';


const Header: FC = () => {

  const [isOpen, setIsOpen] = useState(false);

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
            <li><NavLink to={apiUrls.auth.register}>Register</NavLink></li>
            <li><NavLink to={apiUrls.auth.login}>Login</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

{/*<li><NavLink to={apiUrls.article.create}>Create Article</NavLink></li>*/}
{/*/!* Auth *!/*/}
{/* Ancestors */}
{/* Chronology */}
{/*<li><NavLink to={apiUrls.chronology.create}>Create Date</NavLink></li>*/}
{/* GED File */}
{/*<li><NavLink to={apiUrls.uploadGed.upload}>Upload GED</NavLink></li>*/}
{/* users simple */}
{/*<li><NavLink to={apiUrls.users.me}>Get Me</NavLink></li>*/}
{/* users byAdmin */}
{/*<li><NavLink to={apiUrls.users.create}>create User By Admin</NavLink></li>*/}
{/*<li><NavLink to={baseUrls.adminUsers}>list of users</NavLink></li>*/}

export default Header;
