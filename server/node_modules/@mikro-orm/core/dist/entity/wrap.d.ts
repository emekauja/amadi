import { IWrappedEntity, IWrappedEntityInternal } from '../typings';
/**
 * returns WrappedEntity instance associated with this entity. This includes all the internal properties like `__meta` or `__em`.
 */
export declare function wrap<T>(entity: T, preferHelper: true): IWrappedEntityInternal<T, keyof T>;
/**
 * wraps entity type with WrappedEntity internal properties and helpers like init/isInitialized/populated/toJSON
 */
export declare function wrap<T>(entity: T, preferHelper?: false): IWrappedEntity<T, keyof T>;
