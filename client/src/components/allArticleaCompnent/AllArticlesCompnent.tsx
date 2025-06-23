import React, {FC} from 'react';
import { useAppSelector } from '../../redux/store';
import AricleComponent from '../aricleComponent/AricleComponent';
import style from './AllArticlesComponent.module.css'


const AllArticlesComponent: FC = () => {
  const {data} = useAppSelector(state => state.articlesReducer)

  return (
    <div className={style.listwrapper}>
      {
        data && data.map(article => <AricleComponent key={article.id} article={article}/>)
      }
    </div>
  );
};

export default AllArticlesComponent;


// const AllArticlesComponent: FC = () => {
//   const {data} = useAppSelector(state => state.articlesReducer)
//   return (
//     <div>
//       {
//         data && data.map(article => <AricleComponent key={article.id} article={article}/>)
//       }
//     </div>
//   );
// };
//
// export default AllArticlesComponent;
