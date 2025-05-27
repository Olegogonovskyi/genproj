import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import SearchFormComponent from '../../components/SearchFormComponent/SearchFormComponent';
import { apiUrls, baseUrls } from '../../costants/Urls';

const Header: FC = () => {
  return (
    <div>
      <SearchFormComponent />
      <nav>
        <ul>
          {/* Auth */}
          <li><NavLink to={apiUrls.auth.register}>Register</NavLink></li>
          <li><NavLink to={apiUrls.auth.login}>Login</NavLink></li>

          <hr />

          {/* Ancestors */}
          <li><NavLink to={apiUrls.ancestors.getAllAncestors}>All Ancestors</NavLink></li>

          <hr />

          {/* Articles */}
          <li><NavLink to={apiUrls.article.getAll}>All Articles</NavLink></li>
          <li><NavLink to={apiUrls.article.create}>Create Article</NavLink></li>

          <hr />

          {/* Chronology */}
          <li><NavLink to={apiUrls.chronology.create}>Create Date</NavLink></li>
          <li><NavLink to={baseUrls.chronology}>All Dates</NavLink></li>

          <hr />

          {/* GED File */}
          <li><NavLink to={apiUrls.uploadGed.upload}>Upload GED</NavLink></li>

          <hr/>

          {/* users simple */}
          <li><NavLink to={apiUrls.users.me}>Get Me</NavLink></li>

          <hr/>

          {/* users byAdmin */}
          <li><NavLink to={apiUrls.users.create}>create User By Admin</NavLink></li>
          <li><NavLink to={baseUrls.adminUsers}>list of users</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
