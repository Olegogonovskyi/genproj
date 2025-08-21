import React, {FC, useEffect} from 'react';
import {tokenKey, userKey} from "../../costants/keysToLockalStorage";
import {LocalStorSetHelper} from "../../helpers/localStorSetHelper";
import {ITokenPairModel} from "../../models/ITokenPairModel";
import {IUserModel} from "../../models/IUserModel";

const AuthGoogleLogComponent: FC = () => {
    console.log('AuthGoogleLogComponent')
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const user = params.get('user') ? JSON.parse(params.get('user')!) as IUserModel : {} as IUserModel;
        const tokens: ITokenPairModel = {
            accessToken: params.get("accessToken") || '',
            refreshToken: params.get("refreshToken") || ''
        }

        LocalStorSetHelper({user, tokens})
        window.location.href = "/";
    }, []);

    return (
    <div>

    </div>
  );
};

export default AuthGoogleLogComponent;
