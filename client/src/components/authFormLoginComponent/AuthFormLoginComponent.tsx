import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { IRegLogPair } from '../../models/IRegLogPair';
import { authService } from '../../services/auth.service';
import style from './AuthFormLoginComponent.module.css'

const AuthFormLoginComponent:FC = () => {
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm<IRegLogPair>({defaultValues: {deviceId:  'kkkkk', password: 'OlegOg007$', email: 'OlegOg@gmail.com'}})
  const satFormData = async (formData: IRegLogPair) => {
    const authResponse = await authService.auth(formData)
    authResponse && navigate('/')
  }

  return (
    <div className={style.wrap}>
      <form onSubmit={handleSubmit(satFormData)}>
        <input type="text" {...register('email')}/>
        <input type="text" {...register('password')}/>
  <button>Login</button>
  </form>
  </div>
);
};

export default AuthFormLoginComponent;