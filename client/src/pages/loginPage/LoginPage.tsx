import React, {FC} from 'react';
import AuthFormLoginComponent from '../../components/authFormLoginComponent/AuthFormLoginComponent';
import style from './LoginPage.module.css'


const LoginPage:FC = () => {
  return (
    <div className={style.wrap}>
      <AuthFormLoginComponent/>
    </div>
  );
};

export default LoginPage;