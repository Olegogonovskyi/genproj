import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import SearchFormComponent from '../../components/SearchFormComponent/SearchFormComponent';
import { ancestors, articleUrls, authUrls, baseUrls, chronologyUrls } from '../../costants/Urls';

const Header: FC = () => {
    return (
        <div>
            <SearchFormComponent />
          <div>
            <ul>
              <li><NavLink to={authUrls.register} > Register </NavLink></li>
              <li><NavLink to={authUrls.login} > Login </NavLink></li>
              <hr/>
              <li><NavLink to={ancestors.allancestors} > All Ancestors </NavLink></li>
              <hr/>
              <li><NavLink to={articleUrls.getAllArticles} > All articles </NavLink></li>
              <li><NavLink to={articleUrls.createArticle} > create article </NavLink></li>
              <hr/>
              <li><NavLink to={chronologyUrls.createDate} > create dates </NavLink></li>
              <li><NavLink to={baseUrls.baseChronology} > get all dates </NavLink></li>
              <hr/>
            </ul>

          </div>
        </div>
    );
};

export default Header;