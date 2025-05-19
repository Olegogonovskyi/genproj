import React,{FC} from 'react';
import { IArticleResModel } from '../../models/IArticleResModel';
import { useNavigate } from 'react-router-dom';
import { articleUrls } from '../../costants/Urls';

const AricleComponent: FC<{article: IArticleResModel}> = ({article}) => {
  const {id, title, user} = article
  const navigate = useNavigate()
  return (
    <div>
<h1>{id} --- {title}</h1>
      <h3>{user.email}</h3>
      <button onClick={()=> {
        navigate(`${articleUrls.getAllArticles}/${id}`)
      }}> detail </button>
    </div>
  );
};

export default AricleComponent;