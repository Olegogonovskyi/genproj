import React, {FC, useEffect, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { apiUrls, baseUrls } from '../../costants/Urls';
import style from './Header.module.css'
import classNames from 'classnames';
import {usersApiService} from "../../services/users.api.service";
import {IUserModel} from "../../models/IUserModel";
import {useAppDispatch, useAppSelector } from 'src/redux/store';
import { usersAuthActions } from 'src/redux/slices/userLoginSlice';
import {initialUserState} from "../../costants/initialUserState";


const Header: FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [userFromBase, setUserFromBase] = useState<IUserModel>({} as IUserModel)
  const [isLoading, setIsLoading] = useState(true);
  const reduxUser = useAppSelector((state) => state.usersAuthReducer.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (reduxUser?.id) {
      usersApiService.getMe()
          .then(user => setUserFromBase(user))
          .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [reduxUser]);
  const isLoggedIn = !!userFromBase?.id;

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);
  const navigate = useNavigate()
  console.log(`user ${JSON.stringify(userFromBase)}`)
  console.log(userFromBase.isVerified);

  const handleLogOut = async () => {
    await usersApiService.logout();
    dispatch(usersAuthActions.setUser(initialUserState))
    navigate('/');
  };

  if (isLoading) return null;
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
                  <li className={isLoggedIn ? style.visible : style.hidden}><NavLink to={apiUrls.users.me}>Про мене</NavLink></li>
                  <li className={userFromBase?.isVerified  ? style.visible : style.hidden}><NavLink to={baseUrls.adminDashboard}>Адмін панель</NavLink></li>
                  <li className={isLoggedIn ? style.visible : style.hidden}><NavLink onClick={handleLogOut} to={'#'}>Вийти</NavLink></li>
                  <li className={!isLoggedIn ? style.visible : style.hidden}><NavLink to={apiUrls.auth.register}>Register</NavLink></li>
                  <li className={!isLoggedIn ? style.visible : style.hidden}><NavLink to={apiUrls.auth.login}>Login</NavLink></li>
                </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;