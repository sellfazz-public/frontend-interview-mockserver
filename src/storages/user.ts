import { StorageBase } from "./base";


export interface Authentication{
  email: string
  password: string
}

export interface User {
  email: string
  password: string
  id: string
}

export class UserStorage extends StorageBase<User> {
  saveNew(user: User): User{
    user.id = this.getNewId()
    this.set(user.email, user)
    return this.getByEmail(user.email) as User
  }
  getByEmail(email: string): User | undefined{
    return this.get(email)
  }
  isCorrectPassword(email: string, password: string): boolean{
    let existingUser = this.getByEmail(email)
    if(!existingUser){
      return false
    }
    return existingUser.password == password
  }
}
