import React, {FC, useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { articlesActions } from '../../redux/slices/articlesSlice';
import AllArticlesCompnent from '../../components/allArticleaCompnent/AllArticlesCompnent';

const ArticlesPage: FC = () => {
  const {articleId} = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (articleId) {
      dispatch(articlesActions.ArticleByIdLoad(articleId));
    }
  }, [articleId]);
  return (
    <div>
      <AllArticlesCompnent/>
    </div>
  );
};

export default ArticlesPage;