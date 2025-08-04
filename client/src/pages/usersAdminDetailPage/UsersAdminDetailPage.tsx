import React, {FC} from 'react';
import { useEntityDetailPage } from '../../hooks/useEntityDetailPage';
import { apiParams } from '../../costants/Urls';
import { usersApiService } from '../../services/users.api.service';
import { IUserModel } from '../../models/IUserModel';
import UserAdminDetailComponent from '../../components/userAdminDetailComponent/UserAdminDetailComponent';

const UsersAdminDetailPage: FC = () => {

  const { entity: userFromBase, loading, error } = useEntityDetailPage<IUserModel>({
    selector: state => state.usersReducer,
    loadAction: usersApiService.getUserById,
    paramName: apiParams.userID,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading person details</div>;
  if (!userFromBase) return null;

  return (
    <div>
      <UserAdminDetailComponent key={userFromBase.id}/>
    </div>
  );
};

export default UsersAdminDetailPage;