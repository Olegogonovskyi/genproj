import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { IRegLogPair } from '../../models/IRegLogPair';
import style from '../../styles/commonForm.module.css';
import {useAppDispatch} from "../../redux/store";
import {usersAuthActions} from "../../redux/slices/userLoginSlice";
import { getOrCreateDeviceId } from 'src/helpers/deviceIdHelper';
import {apiUrls} from "../../costants/Urls";

const AuthFormLoginComponent:FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm<IRegLogPair>({defaultValues: {deviceId:  'OlegOg007$', password: 'OlegOg007$', email: 'OlegOg@gmail.com'}})
  const satFormData = async (formData: IRegLogPair) => {
    try {
      const deviceId = getOrCreateDeviceId();
      const fullFormData = { ...formData, deviceId };

      const userRedux = await dispatch(usersAuthActions.UserAuth(fullFormData));
      if (usersAuthActions.UserAuth.fulfilled.match(userRedux)) {
        navigate('/')
      }
            } catch (e) {
      console.error(e)
            }
  }

  return (
    <div className={style.wrap}>
      <form onSubmit={handleSubmit(satFormData)}>
        <input type="text" {...register('email')}/>
        <input type="text" {...register('password')}/>
  <button>Login</button>
          <button onClick={async () => {window.location.href = apiUrls.auth.googleLogin}}> Google login</button>
  </form>
  </div>
);
};

export default AuthFormLoginComponent;