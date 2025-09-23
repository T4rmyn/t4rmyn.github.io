import { ShellApp } from "../shell_app.js";
import * as shell from "../../shell/index.js";

export class PrintWorkingDirectory extends ShellApp {
    constructor() {
        super("pwd");
    }

    handle_query(query: string): shell.ShellOutputFragment[] {
        return [new shell.ShellOutputFragment(
            shell.Safeness.Safe,
            "pwd: Current working directory is <b><i>" +
            shell.Shell.get_instance().get_working_directory().find_absolute_path() +
            "</i></b>",
        )];
    }
}