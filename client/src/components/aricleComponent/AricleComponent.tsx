import React,{FC} from 'react';
import { IArticleReqModel } from '../../models/IArticleReqModel';

const AricleComponent: FC<{article: IArticleReqModel}> = ({article}) => {
  const {id, title, body, tags, description} = article

  return (
    <div>
<h1>{id} --- {title}</h1>
    </div>
  );
};

export default AricleComponent;