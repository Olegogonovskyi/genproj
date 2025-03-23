export interface IArticleReqModel {
  description: string,
  body: string,
  image: File[];
  tags: string[];
  title: string;
}