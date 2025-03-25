import React, {FC} from 'react';
import AuthFormComponent from '../../components/authFormComponent/AuthFormComponent';
import AuthGoogleLogComponent from '../../components/loginComponent/AuthGoogleLogComponent';

const Header: FC = () => {

    return (
        <div>
            header
          <div>
            <AuthFormComponent/>
            <AuthGoogleLogComponent/>
          </div>
        </div>
    );
};

export default Header;