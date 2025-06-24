import React, {FC} from 'react';
import AuthFormRegisterComponent from '../../components/authFormRegisterComponent/AuthFormRegisterComponent';
import style from './RegisterPage.module.css';


const RegisterPage:FC = () => {
  return (
    <div className={style.wrap}>
      <AuthFormRegisterComponent/>
    </div>
  );
};

export default RegisterPage;