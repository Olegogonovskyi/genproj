export interface IUserModel {
  role: 'reader' | 'admin' | 'writter',
  authMethod: string,
  isVerified: boolean,
  id: string,
  name: string,
  email: string,
  deviceId: string
}