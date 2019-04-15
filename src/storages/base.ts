export class StorageBase<T>{
  private record: Record<string,T>
  private autoIncrementId: number

  get(id: string): T | undefined{
    return this.record[id]
  }

  set(id: string, item: T){
    this.record[id] =item
  }

  clear(id: string){
    delete this.record[id]
  }
  
  list(): T[]{
    return Object.keys(this.record).map(key => this.record[key])
  }

  getNewId(){
    this.autoIncrementId++
    return this.autoIncrementId+""
  }

  constructor(){
    this.record = {}
    this.autoIncrementId = 1
  }
}