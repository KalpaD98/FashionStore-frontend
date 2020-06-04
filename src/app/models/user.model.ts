export enum Role {
  superAdmin = 'super-admin',
  admin = 'admin',
  storeManger = 'store-manager',
  user = 'user'
}


export interface User {
  username?: string,
  email: string,
  password: string,
  role?: Role,
  verified?: boolean

}
