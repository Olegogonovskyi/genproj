import React, {FC} from 'react';
import { IUserModel } from '../../models/IUserModel';
import { usersApiService } from '../../services/users.api.service';

const UserAdminDetailComponent: FC<{entity: IUserModel}> = ({entity}) => {

  const {name, id, email, role, isVerified, authMethod} = entity
  return (
    <div>
      <h1>for admins</h1>
      <h1>{id} --- {name}: {role}</h1>
      <h3>{email} {authMethod} {isVerified}</h3>
      <button onClick={async () => {
        await usersApiService.deleteUser(id)
      }}> delete User </button>
    </div>
  );
};

export default UserAdminDetailComponent;