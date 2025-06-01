export interface IRepository<T> {
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    save(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    delete(id: number): Promise<void>;
    count(): Promise<number>;
    existsById(id: number): Promise<boolean>;
}