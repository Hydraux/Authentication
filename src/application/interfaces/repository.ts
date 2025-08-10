export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<string>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
  existsById(id: string): Promise<boolean>;
}
