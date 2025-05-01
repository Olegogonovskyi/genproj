import React, {FC} from 'react';
import { useAppSelector } from '../../redux/store';
import AricleComponent from '../aricleComponent/AricleComponent';

const AllArticlesCompnent: FC = () => {
  const {data} = useAppSelector(state => state.articlesReducer)
  return (
    <div>
      <h1>AllArticlesCompnent</h1>
      {
        data && data.map(article => <AricleComponent key={article.id} article={article}/>)
      }
      <h1>AllArticlesCompnent end</h1>
    </div>
  );
};

export default AllArticlesCompnent;
