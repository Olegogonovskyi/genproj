import React, {FC} from 'react';
import { IUserModel } from '../../models/IUserModel';
import { usersApiService } from '../../services/users.api.service';

const UserDetailComponent: FC<{userMe: IUserModel}> = ({userMe}) => {

  const {name, id, email, role, isVerified, authMethod} = userMe
  return (
    <div>
      <h1>{id} --- {name}: {role}</h1>
      <h3>{email} {authMethod} {isVerified}</h3>
      <button onClick={async () => {
        await usersApiService.removeMe()
      }}> delMe </button>
    </div>
  );
};

export default UserDetailComponent;