import { apiUrls } from './Urls';


export const menuItems = [
  { label: 'Усі статті', path: apiUrls.admin.articles },
  { label: 'Створити статтю', path: apiUrls.admin.createArticle },
  { label: 'Хронологія', path: apiUrls.admin.chronology }
];