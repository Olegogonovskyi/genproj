
export interface IArticleReqModel {
  description: string,
  body: string,
  tags?: string;
  tagsToPost?: string[];
  title: string;
  articleImage : File[];
}