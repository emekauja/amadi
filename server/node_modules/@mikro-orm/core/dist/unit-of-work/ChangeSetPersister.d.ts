import { MetadataStorage } from '../metadata';
import { AnyEntity, Dictionary } from '../typings';
import { EntityIdentifier } from '../entity';
import { ChangeSet } from './ChangeSet';
import { Transaction } from '../connections';
import { IDatabaseDriver } from '../drivers';
export declare class ChangeSetPersister {
    private readonly driver;
    private readonly identifierMap;
    private readonly metadata;
    constructor(driver: IDatabaseDriver, identifierMap: Dictionary<EntityIdentifier>, metadata: MetadataStorage);
    persistToDatabase<T extends AnyEntity<T>>(changeSet: ChangeSet<T>, ctx?: Transaction): Promise<void>;
    private persistEntity;
    private mapPrimaryKey;
    private updateEntity;
    private processOptimisticLock;
    private processReference;
    /**
     * Maps values returned via `returning` statement (postgres) or the inserted id (other sql drivers).
     * No need to handle composite keys here as they need to be set upfront.
     */
    private mapReturnedValues;
}
