export interface IArticleBlockBodyModel {
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO',
  content: string,
  alt?: string
}