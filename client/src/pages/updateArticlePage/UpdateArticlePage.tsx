import React, {FC} from 'react';
import { useParams } from 'react-router-dom';
import CreateArticleComponent from "../../components/createArticleComponent/CreateArticleComponent";

const UpdateArticlePage: FC = () => {
  const {articleId} = useParams()
  return (
    <div>
      {
        articleId && <CreateArticleComponent key={articleId}  articleToUpdateId={articleId}/>
      }
    </div>
  );
};

export default UpdateArticlePage;