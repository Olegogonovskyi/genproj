
export interface IArticleReqModel {
  description: string,
  body: string,
  tags?: string;
  title: string;
  articleImage : FileList | null
}