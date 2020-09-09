import { AnyEntity, EntityMetadata, FilterQuery } from '../typings';
export declare class SmartQueryHelper {
    static readonly SUPPORTED_OPERATORS: string[];
    static processParams(params: any, root?: boolean): any;
    static processWhere<T extends AnyEntity<T>>(where: FilterQuery<T>, entityName: string, meta?: EntityMetadata<T>): FilterQuery<T>;
    private static processEntity;
    private static processExpression;
    private static isSupported;
}
