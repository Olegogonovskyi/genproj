import React, {FC} from 'react';
import { useParams } from 'react-router-dom';
import UpdateUserComponent from '../../components/updateUserComponent/UpdateUserComponent';

const UpdateUserPage: FC = () => {
  const {userId} = useParams();
  return (
    <div>
      {
        userId && <UpdateUserComponent key={userId}  userUpdateId={userId}/>
      }
    </div>
  );
};

export default UpdateUserPage;