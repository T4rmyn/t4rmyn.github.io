import { ShellApp } from "../shell_app.js";
import { Manual } from "./manual.js";
import * as shell from "../../shell/index.js";

export class Help extends ShellApp {
    constructor() {
        super("help")
    }

    handle_query(query: string): shell.ShellOutputFragment[] {
        let keywords: string[] = Array.from(shell.Shell.get_instance().get_keywords().keys()).sort();
        let final_output: shell.ShellOutputFragment[] = [];
        final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "Available Commands:<br>"));
        for (let i = 0; i < keywords.length; i++) {
            final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new shell.ShellOutputFragment(shell.Safeness.Unsafe, keywords[i]));
            if (Manual.mannable(keywords[i])) {
                final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, " </i></b><span style=\"color: #d79921\">(has manpage)</span><br>"));
            } else {
                final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b><br>"));
            }
        }
        return final_output;
    }
}