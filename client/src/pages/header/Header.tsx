import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import SearchFormComponent from '../../components/SearchFormComponent/SearchFormComponent';
import { authUrls } from '../../costants/Urls';

const Header: FC = () => {

    return (
        <div>
            <SearchFormComponent/>
          <div>
            <NavLink to={authUrls.register} > Register </NavLink>
                        <NavLink to={authUrls.login} > Login </NavLink>
          </div>
        </div>
    );
};

export default Header;