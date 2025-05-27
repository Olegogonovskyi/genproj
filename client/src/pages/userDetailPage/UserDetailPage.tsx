import React, { FC, useEffect, useState } from 'react';
import { IUserModel } from '../../models/IUserModel';
import { usersApiService } from '../../services/users.api.service';
import UserDetailComponent from '../../components/userDetailComponent/UserDetailComponent';

const UserDetailPage: FC = () => {
  const [userFromBase, setUserFromBase] = useState<IUserModel>({} as IUserModel)
  useEffect(  () => {
    usersApiService.getMe().then(value => setUserFromBase(value))
  }, []);
  return (
    <div>
      <UserDetailComponent userMe={userFromBase} key={userFromBase.id}/>
    </div>
  );
};

export default UserDetailPage;