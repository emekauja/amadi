import { EntityMetadata, EntityProperty } from '../typings';
import { Configuration } from '../utils';
export declare abstract class MetadataProvider {
    protected readonly config: Configuration;
    constructor(config: Configuration);
    abstract loadEntityMetadata(meta: EntityMetadata, name: string): Promise<void>;
    loadFromCache(meta: EntityMetadata, cache: EntityMetadata): void;
    useCache(): boolean;
    protected initProperties(meta: EntityMetadata, fallback: (prop: EntityProperty) => void | Promise<void>): Promise<void>;
}
