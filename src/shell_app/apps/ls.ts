import { ShellApp } from "../shell_app.js";
import * as shell from "../../shell/index.js";

export class ListObjectPaths extends ShellApp {
    constructor() {
        super("ls");
    }

    handle_query(query: string): shell.ShellOutputFragment[] {
        return [new shell.ShellOutputFragment(
            shell.Safeness.Safe,
            function():string {
                let fin_string: string = "";
                let list: ObjectPath[] = shell.Shell.get_instance().get_working_directory().get_children();
                list.forEach(function(x: ObjectPath): void {
                    if (x instanceof DirectoryPath) {
                        fin_string = fin_string.concat("<b>", x.get_name(), "</b> ");
                    } else {
                        fin_string = fin_string.concat(x.get_name(), " ");
                    }
                });
                return fin_string;
            }(),
        )];
    }
}