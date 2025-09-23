import { ShellApp, ManApp } from "../shell_app.js";
import * as shell from "../../shell/index.js";

export class Manual extends ShellApp {
    keyword: string;

    constructor() {
        super("man");
    }

    handle_query(query: string): shell.ShellOutputFragment[] {
        return [new shell.ShellOutputFragment(
            shell.Safeness.Safe,
            function(query: string): string {
                if (shell.Shell.get_instance().get_keywords().has(query)) {
                    let app: ShellApp | undefined = shell.Shell.get_instance().get_keywords().get(query);
                    if ("get_man_entry" in app) {
                        return (app as ManApp).get_man_entry();
                    } else {
                        return "man: <b><i>" + app.get_keyword() + "</i></b> has no man entry.";
                    }
                } else {
                    return "man: <b><i>" + query + "</i></b> is not a recognized command.";
                }
            }(query),
        )];
    }

    static mannable(query: string): boolean {
        if (shell.Shell.get_instance().get_keywords().has(query)) {
            let app: ShellApp | undefined = shell.Shell.get_instance().get_keywords().get(query);
            if ("get_man_entry" in app) {
                return true;
            }
        }
        return false;
    }
}