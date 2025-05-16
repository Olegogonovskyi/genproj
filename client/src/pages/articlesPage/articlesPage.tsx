import { WithEntityIDLoader } from '../../hoc/withEntityIDLoader';
import AllArticlesComponent from '../../components/allArticleaCompnent/AllArticlesCompnent';
import { articlesActions } from '../../redux/slices/articlesSlice';

export default WithEntityIDLoader(
  AllArticlesComponent,
  articlesActions.ArticleByIdLoad,
  'articleId'
)