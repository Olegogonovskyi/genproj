import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import SearchFormComponent from '../../components/SearchFormComponent/SearchFormComponent';
import { ancestors, articleUrls, authUrls } from '../../costants/Urls';

const Header: FC = () => {

    return (
        <div>
            <SearchFormComponent/>
          <div>
            <ul>
              <li><NavLink to={authUrls.register} > Register </NavLink></li>
              <li><NavLink to={authUrls.login} > Login </NavLink></li>
              <li><NavLink to={ancestors.allancestors} > All Ancestors </NavLink></li>
              <li><NavLink to={articleUrls.getAllArticles} > All articles </NavLink></li>
            </ul>

          </div>
        </div>
    );
};

export default Header;