export interface IArticleBodyModel {
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO',
  content: string,
  alt: string,
}