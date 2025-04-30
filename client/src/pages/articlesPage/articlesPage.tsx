import React from 'react';
import { useAppSelector } from '../../redux/store';
import AricleComponent from '../../components/aricleComponent/AricleComponent';

const ArticlesPage = () => {
  const {data} = useAppSelector(state => state.articlesReducer)
  return (
    <div>
      {data && data.map(article => <AricleComponent key={article.id} article={article} />)
      }    </div>
  );
};

export default ArticlesPage;