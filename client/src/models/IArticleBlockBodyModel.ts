export interface IArticleBlockBodyModel {
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'QUOTE',
  content: string,
  alt?: string
}