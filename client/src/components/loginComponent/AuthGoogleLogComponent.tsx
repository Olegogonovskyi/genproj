import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrls } from '../../costants/Urls';

const AuthGoogleLogComponent: FC = () => {
  const navigate = useNavigate()
  return (
    <div>

      <button onClick={() => {navigate(apiUrls.auth.googleLogin)}}> Google login</button>
    </div>
  );
};

export default AuthGoogleLogComponent;
