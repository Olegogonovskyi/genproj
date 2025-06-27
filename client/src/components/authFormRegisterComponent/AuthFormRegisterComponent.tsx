import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { IRegLogPair } from '../../models/IRegLogPair';
import style from './AuthFormRegisterComponent.module.css';
import { authService } from 'src/services/auth.service';
import {apiUrls} from "../../costants/Urls";

const AuthFormRegisterComponent:FC = () => {
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm<IRegLogPair>({defaultValues: {name: 'Oleg', deviceId:  'kkkkk', password: 'OlegOg007$', email: 'OlegOg@gmail.com'}})
  const satFormData = async (formData: IRegLogPair) => {
   try {
     await authService.register(formData)
     navigate(apiUrls.auth.login)
           } catch (error: any) {
     console.error('register failed:', error?.response?.data || error);
     throw error
           }
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