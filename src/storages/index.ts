import { UserStorage } from "./user";
import { ProductPerOwnerStorage } from "./product";


export interface RunningStorage {
  userStorage: UserStorage,
  productPerOwnerStorage: ProductPerOwnerStorage
}

export const runningStorage: RunningStorage = {
  userStorage: new UserStorage(),
  productPerOwnerStorage: new ProductPerOwnerStorage()
}