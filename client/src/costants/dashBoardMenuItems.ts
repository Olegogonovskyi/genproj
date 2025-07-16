import {apiUrls, baseUrls} from './Urls';


export const menuItems = [
  { label: 'Усі статті', path: apiUrls.admin.articles },
  { label: 'Створити статтю', path: apiUrls.admin.createArticle },
  { label: 'Хронологія', path: apiUrls.admin.chronology },
  { label: 'Додати дату', path: apiUrls.admin.createChronology },
  { label: 'Завантажити фото', path: baseUrls.images },
  { label: 'Завантажити ged', path: apiUrls.admin.uploadGed },
];