import React, {FC} from 'react';
import AuthFormRegisterComponent from '../../components/authFormRegisterComponent/AuthFormRegisterComponent';
import style from './RegisterPage.module.css';


const RegisterPage:FC = () => {
    return (
    <div className={style.wrap}>
      <AuthFormRegisterComponent/>
        <button onClick={async () => {window.location.href = "http://localhost/api/auth/google"}}> Google login</button>
    </div>
  );
};

export default RegisterPage;