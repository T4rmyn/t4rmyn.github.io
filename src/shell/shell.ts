import { ShellApp } from "../shell_app/shell_app.js";
import { PackageManager } from "../shell_app/package_manager.js";
import * as shell from "./index.js";

export class Shell {
    static instance: Shell;

    public static get_instance(): Shell {
        if (!Shell.instance) {
            Shell.instance = new Shell();
        }

        return Shell.instance;
    }

    apps: ShellApp[];
    keywords: Map<string, ShellApp>;
    working_directory: DirectoryPath;

    constructor() {
        this.working_directory = Machine.get_instance().get_root();
        this.apps = PackageManager.basic_packages();

        this.keywords = new Map<string, ShellApp>();
        for (let i = 0; i < this.apps.length; i++) {
            this.keywords.set(this.apps[i].get_keyword(), this.apps[i]);
        }
    }

    set_working_directory(dir: DirectoryPath): void {
        this.working_directory = dir;
    }

    get_keywords(): Map<string, ShellApp> {
        return this.keywords;
    }

    get_working_directory(): DirectoryPath {
        return this.working_directory;
    }

    submit_query(query: string): shell.ShellOutputFragment[] {
        let splitted: string[] = query.split(" ");
        if (this.keywords.has(splitted[0])) {
            return this.keywords.get(splitted[0]).handle_query(
                splitted.slice(1).join(" ")
            );
        } else {
            return [
                new shell.ShellOutputFragment(shell.Safeness.Safe, "Command: <b><i>"),
                new shell.ShellOutputFragment(shell.Safeness.Unsafe, splitted[0]),
                new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> not found."),
            ];
        }
    }
}