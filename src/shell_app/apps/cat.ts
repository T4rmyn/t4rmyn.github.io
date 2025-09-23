import { ShellApp } from "../shell_app.js";
import * as shell from "../../shell/index.js";

export class PrintFileContent extends ShellApp {
    constructor() {
        super("cat");
    }

    handle_query(query: string): shell.ShellOutputFragment[] {
        let child = shell.Shell.get_instance().get_working_directory().find_child(query);
        if (child != null) {
            if (child instanceof FilePath) {
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, child.get_contents()),
                ];
            } else {
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: <b><i>"),
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> is not a file."),
                ];
            }
        } else {
            return [
                new shell.ShellOutputFragment(shell.Safeness.Safe, "cat: File <b><i>"),
                new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> not found."),
            ];
        }
    }
}