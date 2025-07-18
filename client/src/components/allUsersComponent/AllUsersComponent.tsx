import React, { FC } from 'react';
import { useAppSelector } from '../../redux/store';
import UserAdminDetailComponent from '../userAdminDetailComponent/UserAdminDetailComponent';

const AllUsersComponent: FC = () => {
  const {data} = useAppSelector(state => state.usersReducer)
  return (
    <div>
      {
        data && data.map(oneUser => <UserAdminDetailComponent key={oneUser.id} User={oneUser} />)

      }
    </div>
  );
};

export default AllUsersComponent;