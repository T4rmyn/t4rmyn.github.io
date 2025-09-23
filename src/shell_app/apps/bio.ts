import { ShellApp, ManApp } from "../shell_app.js";
import * as shell from "../../shell/index.js";

export class Bio extends ShellApp implements ManApp {
    constructor() {
        super("bio");
    }

    handle_query(query: string): shell.ShellOutputFragment[] {
        return [new shell.ShellOutputFragment(
            shell.Safeness.Safe,
            `
                Hi, the name's Tarmyn!
                I'm an artist, programmer, and game developer.
                Some things I like include Linux, Godot, and Progressive Metal/Djent!
            `
        )];
    }

    get_man_entry(): string {
        return "<b><i>bio</b></i>: Personal short bio of myself.";
    }
}