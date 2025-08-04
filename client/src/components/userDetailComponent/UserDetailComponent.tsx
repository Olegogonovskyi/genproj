import React, {FC} from 'react';
import { IUserModel } from '../../models/IUserModel';
import { usersApiService } from '../../services/users.api.service';
import style from './UserDetailComponent.module.css'

const UserDetailComponent: FC<{userMe: IUserModel}> = ({userMe}) => {

  const {name, id, email, role, isVerified} = userMe
  return (
    <div className={style.userContainer}>
        <h3>{id}</h3>
        <h3>{name}</h3>
        <h3>{role}</h3>
        <h3>{email}</h3>
        <h3>{isVerified}</h3>
      <button onClick={async () => {
        await usersApiService.removeMe()
      }}> delMe </button>
    </div>
  );
};

export default UserDetailComponent;