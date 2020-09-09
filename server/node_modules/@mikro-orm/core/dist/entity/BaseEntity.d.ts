import { IdentifiedReference } from './Reference';
import { Dictionary, EntityData, IWrappedEntity } from '../typings';
import { AssignOptions } from './EntityAssigner';
export declare abstract class BaseEntity<T, PK extends keyof T> implements IWrappedEntity<T, PK> {
    isInitialized(): boolean;
    populated(populated?: boolean): void;
    toReference(): IdentifiedReference<T, PK>;
    toObject(ignoreFields?: string[]): EntityData<T>;
    toJSON(...args: any[]): EntityData<T> & Dictionary;
    assign(data: EntityData<T>, options?: AssignOptions): T;
    init(populated?: boolean): Promise<T>;
}
