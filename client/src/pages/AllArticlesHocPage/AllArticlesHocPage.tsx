import AllArticlesCompnent from '../../components/allArticleaCompnent/AllArticlesCompnent';
import { withEntityLoader } from '../../hoc/withEntityLoader';
import { articlesActions } from '../../redux/slices/articlesSlice';


export default withEntityLoader(
  AllArticlesCompnent,
  articlesActions.searchArticleLoad,
  (state) => state.articlesReducer,
);

