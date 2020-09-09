import { EntityMetadata } from '../typings';
import { MetadataStorage } from './MetadataStorage';
export declare class MetadataValidator {
    validateEntityDefinition(metadata: MetadataStorage, name: string): void;
    validateDiscovered(discovered: EntityMetadata[], warnWhenNoEntities: boolean): void;
    private validateReference;
    private validateBidirectional;
    private validateOwningSide;
    private validateInverseSide;
    private validateVersionField;
}
