import React, { FC } from 'react';
import { useEntityDetailPage } from '../../hooks/useEntityDetailPage';
import { IArticleResModel } from '../../models/IArticleResModel';
import { articlesApiService } from '../../services/articles.api.service';
import ArticleDetailComponent from '../../components/articleDetailComponent/ArticleDetailComponent';

const ArticlesDetailPage: FC = () => {

  const { entity: article, loading, error } = useEntityDetailPage<IArticleResModel>({
    selector: state => state.ancestorsReducer,
    loadAction: articlesApiService.getArticleById,
    paramName: 'articleId',
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading person details</div>;
  if (!article) return null;

  return (
    <div>
      <ArticleDetailComponent  key={article.id}  article={article}/>
    </div>
  );
};

export default ArticlesDetailPage;
