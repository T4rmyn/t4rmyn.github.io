import * as shell from "../shell/index.js";

export abstract class ShellApp {
    keyword: string;

    constructor(keyword: string) {
        this.keyword = keyword;
    }

    get_keyword(): string {
        return this.keyword;
    };
    
    abstract handle_query(query: string): shell.ShellOutputFragment[];
}

export interface PathApp {
    query_object_path(query: string): ObjectPath;
}

export interface ManApp {
    get_man_entry(): string;
}