
import { IArticleReqModel } from '../models/IArticleReqModel';

export const articleFormCostants: IArticleReqModel = {
  title: '',
  description: '',
  body: [{ type: 'TEXT', content: '', alt: '' }],
  tags: '',
  articleImage: null
}