export declare enum ReferenceType {
    SCALAR = "scalar",
    ONE_TO_ONE = "1:1",
    ONE_TO_MANY = "1:m",
    MANY_TO_ONE = "m:1",
    MANY_TO_MANY = "m:n",
    EMBEDDED = "embedded"
}
export declare enum Cascade {
    PERSIST = "persist",
    MERGE = "merge",
    REMOVE = "remove",
    ALL = "all"
}
export declare enum LoadStrategy {
    SELECT_IN = "select-in",
    JOINED = "joined"
}
