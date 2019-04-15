import { StorageBase } from "./base";

export interface Product {
  id: string
  name: string
  price: number
  unitCost: number
}

export class ProductStorage extends StorageBase<Product> {
  saveNew(product: Product): Product{
    product.id = this.getNewId()
    this.set(product.id, product)
    return this.get(product.id) as Product
  }
}
export class ProductPerOwnerStorage extends StorageBase<ProductStorage> {
  getOrEnsureByUserId(userId: string): ProductStorage{
    let storage = this.get(userId)
    if(!storage){
      this.set(userId, new ProductStorage())
    }
    return this.get(userId)
  }  


}