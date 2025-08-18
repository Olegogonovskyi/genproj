import { ControllerEnum } from '../../enums/controllerEnum';

export const DocumentTagsDescriptions = [
  {
    name: ControllerEnum.AUTH,
    description: 'Register, login, logout, verify and refresh',
  },
  {
    name: ControllerEnum.ARTICLES,
    description: 'Create. update, delete articles',
  },
  {
    name: ControllerEnum.CHRONOLOGY,
    description: 'get date or list of dates',
  },
  {
    name: ControllerEnum.TAG,
    description: 'get all tags, update and delete tags',
  },
  {
    name: ControllerEnum.USERS,
    description: 'find, delete & update users',
  },
  {
    name: ControllerEnum.ADMINUSERS,
    description: 'create, update, delete, get list of users *only for admin*',
  },
  {
    name: ControllerEnum.CHRONOLOGYADMIN,
    description: 'create, update, add many and delete dates *only for admin*',
  },
  {
    name: ControllerEnum.UPLOADGED,
    description: 'Upload gedcom file, parse it and add to dataBase',
  },
  {
    name: ControllerEnum.ANCESTORS,
    description: 'Get ancestor by id, get all ancestors',
  },
  {
    name: ControllerEnum.IMAGES,
    description: 'Upload image, delete image by url, get all images',
  },
  {
    name: ControllerEnum.OPENAI,
    description: 'ask AI *only for registered users*',
  },
];
