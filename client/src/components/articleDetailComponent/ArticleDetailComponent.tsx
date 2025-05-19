import React, {FC} from 'react';
import { IArticleResModel } from '../../models/IArticleResModel';

const ArticleDetailComponent: FC<{article: IArticleResModel}> = ({article}) => {
  const {id, title, description, user} = article
  return (
    <div>
<h1>{id}: {title}</h1>
      <h3>By {user.id} --- {user.role} {user.name} ({user.email})</h3>
      <p>{description}</p>
    </div>
  );
};

export default ArticleDetailComponent;