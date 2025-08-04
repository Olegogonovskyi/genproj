import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrls } from '../../costants/Urls';

const LogOutComponent: FC = () => {
  const navigate = useNavigate()
  return (
    <div>

      <button onClick={() => {navigate(apiUrls.auth.logout)}}> logout </button>
    </div>
  );
};

export default LogOutComponent;
