import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { authUrls } from '../../costants/Urls';

const LogOutComponent: FC = () => {
  const navigate = useNavigate()
  return (
    <div>

      <button onClick={() => {navigate(authUrls.logout)}}> logout </button>
    </div>
  );
};

export default LogOutComponent;
