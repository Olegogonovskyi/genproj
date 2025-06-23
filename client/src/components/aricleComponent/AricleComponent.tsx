import React,{FC} from 'react';
import { IArticleResModel } from '../../models/IArticleResModel';
import { useNavigate } from 'react-router-dom';
import { apiUrls } from '../../costants/Urls';
import style from './AricleComponent.module.css'

const AricleComponent: FC<{article: IArticleResModel}> = ({article}) => {
  const {id, title,image, description} = article
  const navigate = useNavigate()
  return (
    <div className={style.wrap}>
      <div className={style.cardwrap}>
        <div className={style.imgwrap}>
          {image && <img src={image[0]} alt={image[0]} />}
          <div className={style.textwrap}>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={()=> {
              navigate(apiUrls.article.getById(id))
            }}> Детальніше </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AricleComponent;