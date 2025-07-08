import React,{FC} from 'react';
import { IArticleResModel } from '../../models/IArticleResModel';
import { useNavigate } from 'react-router-dom';
import {apiParams, apiUrls} from '../../costants/Urls';
import style from './AricleAdminComponent.module.css'
import { articlesApiService } from '../../services/articles.api.service';

const AricleAdminComponent: FC<{article: IArticleResModel}> = ({article}) => {
  const {id, title} = article
  const navigate = useNavigate()
  return (
    <div className={style.wrap}>
      <h3>{title}</h3> <p>{id}</p> <button onClick={()=> {navigate(apiUrls.article.getById(id))}}>
      Детальніше
    </button>
      <button onClick={async () => {
        await articlesApiService.deleteArticle(id)
      }}>
        Видалити
      </button>
      <button onClick={()=> {
        navigate(`${apiUrls.admin.updateteArticle}/${id}`)
      }}>
        Редагувати
      </button>
    </div>
  );
};
export default AricleAdminComponent;