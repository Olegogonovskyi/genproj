import React, { FC } from 'react';
import { useAppSelector } from '../../redux/store';
import AricleComponent from '../aricleComponent/AricleComponent';
import style from './AllArticlesComponent.module.css';
import AricleAdminComponent from '../aricleAdminComponent/AricleAdminComponent';

const AllArticlesComponent: FC<{ dashboard?: boolean }> = ({ dashboard }) => {
  const { data } = useAppSelector(state => state.articlesReducer);

  if (!data) return null;

  if (dashboard) {
    return (
        <div className={style.wrap}>
          {data.map((article) => (
            <div key={article.id}>
              <AricleAdminComponent article={article} />
              <br/>
            </div>
          ))}
        </div>
    );
  }

  return (
    <div className={style.listwrapper}>
      {data.map((article) => (
        <AricleComponent key={article.id} article={article} />
      ))}
    </div>
  );
};

export default AllArticlesComponent;
