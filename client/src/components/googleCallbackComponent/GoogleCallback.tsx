import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { authUrls } from '../../costants/Urls';

const GoogleCallback: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        await authService.googleLogin();
        navigate("/"); // Якщо успішно → редиректимо
      } catch (error) {
        navigate(authUrls.googleLogin); // Якщо помилка → повертаємо на логін
      }
    };

    handleGoogleAuth()
  }, [navigate]); // useEffect запускається один раз при відкритті компонента
  return (
    <div>
      <h1>Google </h1>
    </div>
  );
};

export default GoogleCallback;