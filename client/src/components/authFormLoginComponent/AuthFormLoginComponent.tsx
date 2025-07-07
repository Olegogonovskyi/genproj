import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { IRegLogPair } from '../../models/IRegLogPair';
import style from './AuthFormLoginComponent.module.css'
import {useAppDispatch} from "../../redux/store";
import {usersAuthActions} from "../../redux/slices/userLoginSlice";
import { getOrCreateDeviceId } from 'src/helpers/deviceIdHelper';

const AuthFormLoginComponent:FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm<IRegLogPair>({defaultValues: {deviceId:  'kkkkk', password: 'OlegOg007$', email: 'OlegOg@gmail.com'}})
  const satFormData = async (formData: IRegLogPair) => {
    try {
      const deviceId = getOrCreateDeviceId();
      console.log(deviceId)
      const fullFormData = { ...formData, deviceId };

      const userRedux = await dispatch(usersAuthActions.UserAuth(fullFormData));
      console.log(`userRedux ${JSON.stringify(userRedux)}`)

      if (usersAuthActions.UserAuth.fulfilled.match(userRedux)) {
        navigate('/')
      }
            } catch (e) {
      console.log(e)
            }
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