import { Dictionary } from '../typings';
export declare function Index(options?: IndexOptions): Function;
export declare function Unique(options?: UniqueOptions): Function;
export interface UniqueOptions {
    name?: string;
    properties?: string | string[];
    options?: Dictionary;
}
export interface IndexOptions extends UniqueOptions {
    type?: string;
}
