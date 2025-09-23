import { ShellApp } from "../shell_app.js";
import * as shell from "../../shell/index.js";

export class CmdHistory extends ShellApp {
    constructor() {
        super("history");
    }

    handle_query(query: string): shell.ShellOutputFragment[] {
        let final_output: shell.ShellOutputFragment[] = [];
        final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "History:<br>"));
        let query_history: string[] = shell.ShellOutputEngine.get_instance().get_query_history();
        for (let i = 0; i < query_history.length; i++) {
            final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new shell.ShellOutputFragment(shell.Safeness.Unsafe, query_history[i]));
            final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b><br>"));
        }
        return final_output;
    }
}