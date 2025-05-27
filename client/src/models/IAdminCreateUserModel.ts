export interface IAdminCreateUserModel {
  role: 'reader' | 'admin' | 'writter',
  name: string,
  email: string,
  password: string
}