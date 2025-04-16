import React, {FC} from 'react';
import { useAppSelector } from '../../redux/store';
import AricleComponent from '../aricleComponent/AricleComponent';

const AllArticlesCompnent: FC = () => {
  const {data} = useAppSelector(state => state.articlesReducer)
  return (
    <div>
      {
        data && data.map(article => <AricleComponent key={article.id} article={article}/>)
      }
    </div>
  );
};

export default AllArticlesCompnent;