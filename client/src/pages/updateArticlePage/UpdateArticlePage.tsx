import React, {FC} from 'react';
import { useParams } from 'react-router-dom';
import UpdateArticleComponent from '../../components/updateArticleComponent/UpdateArticleComponent';

const UpdateArticlePage: FC = () => {
  const {articleId} = useParams()
  return (
    <div>
      {
        articleId && <UpdateArticleComponent key={articleId}  articleToUpdateId={articleId}/>
      }
    </div>
  );
};

export default UpdateArticlePage;