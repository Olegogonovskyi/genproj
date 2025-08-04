
export interface IArticleReqtoPostModel {
  description: string,
  body: string,
  tags?: string[];
  title: string;
  article: File[];
}