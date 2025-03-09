import { ControllerEnum } from '../../enums/controllerEnum';

export const DocumentTagsDescriptions = [
  {
    name: ControllerEnum.AUTH,
    description: 'Register, login, logout, verify and refresh',
  },
  {
    name: ControllerEnum.UPLOADGED,
    description: 'Upload gedcom file, parse it and add to dataBase',
  },
  {
    name: ControllerEnum.ARTICLES,
    description: 'Create. update, delete articles',
  },
  {
    name: ControllerEnum.USERS,
    description: 'find, delete & update users',
  },
  {
    name: ControllerEnum.TAG,
    description: 'tags to articles',
  },
  {
    name: ControllerEnum.ADMINUSERS,
    description: 'create, update, delete, get list of users *only for admin*',
  },
  {
    name: ControllerEnum.CHRONOLOGY,
    description: 'get date or list of dates',
  },
  {
    name: ControllerEnum.CHRONOLOGYADMIN,
    description: 'create, update, and delete dates *only for admin*',
  },
];
