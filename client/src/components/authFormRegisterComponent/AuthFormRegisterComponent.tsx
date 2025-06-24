import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { IRegLogPair } from '../../models/IRegLogPair';
import { authService } from '../../services/auth.service';
import style from './AuthFormRegisterComponent.module.css';

const AuthFormRegisterComponent:FC = () => {
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm<IRegLogPair>({defaultValues: {name: 'Oleg', deviceId:  'kkkkk', password: 'OlegOg007$', email: 'OlegOg@gmail.com'}})
  const satFormData = async (formData: IRegLogPair) => {
    const authResponse = await authService.register(formData)
    authResponse && navigate('/')
  }

  return (
    <div className={style.wrap}>
      <form onSubmit={handleSubmit(satFormData)}>
        <input type="text" {...register('name')}/>
    <input type="text" {...register('email')}/>
  <input type="text" {...register('password')}/>
  <button>Register</button>
  </form>
  </div>
);
};

export default AuthFormRegisterComponent;