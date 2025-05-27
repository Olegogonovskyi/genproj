import React, { FC, useEffect, useState } from 'react';
import { IUserModel } from '../../models/IUserModel';
import { usersApiService } from '../../services/users.api.service';
import UserAdminDetailComponent from '../../components/userAdminDetailComponent/UserAdminDetailComponent';

const UserDetailPage: FC = () => {
  const [userFromBase, setUserFromBase] = useState<IUserModel>({} as IUserModel)
  useEffect(  () => {
    usersApiService.getMe().then(value => setUserFromBase(value))
  }, []);
  return (
    <div>
      <UserAdminDetailComponent userMe={userFromBase} key={userFromBase.id}/>
    </div>
  );
};

export default UserDetailPage;