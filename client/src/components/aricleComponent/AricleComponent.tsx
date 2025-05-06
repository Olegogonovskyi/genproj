import React,{FC} from 'react';
import { IArticleResModel } from '../../models/IArticleResModel';

const AricleComponent: FC<{article: IArticleResModel}> = ({article}) => {
  const {id, title, body, tags, description, user} = article

  return (
    <div>
<h1>{id} --- {title}</h1>
      <h3>{user.email}</h3>
    </div>
  );
};

export default AricleComponent;