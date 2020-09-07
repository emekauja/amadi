import { EntityManager } from '../EntityManager';
import { Platform } from '../platforms';
import { MetadataStorage } from '../metadata';
import { EntityValidator } from './EntityValidator';
import { Dictionary, EntityData, EntityMetadata, Primary } from '../typings';
import { IdentifiedReference } from './Reference';
import { AssignOptions } from './EntityAssigner';
export declare class WrappedEntity<T, PK extends keyof T> {
    private readonly entity;
    readonly __meta: EntityMetadata<T>;
    __initialized: boolean;
    __populated: boolean;
    __lazyInitialized: boolean;
    __em?: EntityManager;
    readonly __uuid: string;
    readonly __internal: {
        platform: Platform;
        metadata: MetadataStorage;
        validator: EntityValidator;
    };
    constructor(entity: T, __meta: EntityMetadata<T>, em: EntityManager);
    isInitialized(): boolean;
    populated(populated?: boolean): void;
    toReference(): IdentifiedReference<T, PK>;
    toObject(ignoreFields?: string[]): EntityData<T>;
    toJSON(...args: any[]): EntityData<T> & Dictionary;
    assign(data: EntityData<T>, options?: AssignOptions): T;
    init(populated?: boolean): Promise<T>;
    get __primaryKey(): Primary<T>;
    set __primaryKey(id: Primary<T>);
    get __primaryKeys(): Primary<T>[];
    get __serializedPrimaryKey(): Primary<T> | string;
}
