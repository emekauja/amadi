import { EntityData, EntityMetadata, EntityProperty, FilterQuery, AnyEntity } from '../typings';
export declare class EntityValidator {
    private strict;
    constructor(strict: boolean);
    static validateSingleDecorator(meta: EntityMetadata, propertyName: string): void;
    validate<T extends AnyEntity<T>>(entity: T, payload: any, meta: EntityMetadata): void;
    validateProperty<T extends AnyEntity<T>>(prop: EntityProperty, givenValue: any, entity: T): any;
    validateParams(params: any, type?: string, field?: string): void;
    validatePrimaryKey<T extends AnyEntity<T>>(entity: EntityData<T>, meta: EntityMetadata): void;
    validateEmptyWhere<T extends AnyEntity<T>>(where: FilterQuery<T>): void;
    validateRemoveEmptyWhere<T extends AnyEntity<T>>(className: string, where: FilterQuery<T>): void;
    private validateCollection;
    private fixTypes;
    private fixDateType;
    private fixNumberType;
    private fixBooleanType;
}
