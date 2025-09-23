import { ShellApp, PathApp } from "../shell_app.js";
import * as shell from "../../shell/index.js";

export class ChangeDirectory extends ShellApp implements PathApp {
    constructor() {
        super("cd");
    }

    handle_query(query: string): shell.ShellOutputFragment[] {
        if (query == "..") {
            let parent: DirectoryPath | null = shell.Shell.get_instance().get_working_directory().get_parent();
            if (parent == null) {
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: <b><i>"),
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> unsuccessful, already at root."),
                ];
            } else {
                shell.Shell.get_instance().set_working_directory(parent);
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: <b><i>"),
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> successful."),
                ];
            }
        }
        let child: ObjectPath | null = shell.Shell.get_instance().get_working_directory().find_child(query);
        if (child != null) {
            if (child instanceof DirectoryPath) {
                shell.Shell.get_instance().set_working_directory(child);
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: <b><i>"),
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> successful."),
                ];
            } else {
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: <b><i>"),
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> is not a directory."),
                ];
            }
        } else {
            return [
                new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: Directory <b><i>"),
                new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> not found."),
            ];
        }
    }

    query_object_path
}