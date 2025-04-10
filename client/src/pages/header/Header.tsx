import React, {FC} from 'react';
import AuthFormComponent from '../../components/authFormComponent/AuthFormComponent';
import AuthGoogleLogComponent from '../../components/loginComponent/AuthGoogleLogComponent';
import SearchFormComponent from '../../components/SearchFormComponent/SearchFormComponent';

const Header: FC = () => {

    return (
        <div>
            <SearchFormComponent/>
          <div>
            <AuthFormComponent/>
            <AuthGoogleLogComponent/>
          </div>
        </div>
    );
};

export default Header;