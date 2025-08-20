import React, {FC, useEffect} from 'react';

const AuthGoogleLogComponent: FC = () => {
    console.log('AuthGoogleLogComponent')
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");

        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            window.location.href = "/";
        }
    }, []);
    return (
    <div>

    </div>
  );
};

export default AuthGoogleLogComponent;
