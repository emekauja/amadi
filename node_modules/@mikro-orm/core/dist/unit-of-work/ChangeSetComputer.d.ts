import { MetadataStorage } from '../metadata';
import { AnyEntity, Dictionary, EntityData } from '../typings';
import { ChangeSet } from './ChangeSet';
import { Collection, EntityIdentifier, EntityValidator } from '../entity';
import { Platform } from '../platforms';
export declare class ChangeSetComputer {
    private readonly validator;
    private readonly originalEntityData;
    private readonly identifierMap;
    private readonly collectionUpdates;
    private readonly removeStack;
    private readonly metadata;
    private readonly platform;
    constructor(validator: EntityValidator, originalEntityData: Dictionary<EntityData<AnyEntity>>, identifierMap: Dictionary<EntityIdentifier>, collectionUpdates: Collection<AnyEntity>[], removeStack: AnyEntity[], metadata: MetadataStorage, platform: Platform);
    computeChangeSet<T extends AnyEntity<T>>(entity: T): ChangeSet<T> | null;
    private computePayload;
    private processReference;
    private processManyToOne;
    private processOneToOne;
}
