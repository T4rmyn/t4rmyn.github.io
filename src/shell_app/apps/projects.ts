import { ShellApp } from "../shell_app.js";
import * as shell from "../../shell/index.js";

export class Projects extends ShellApp {
    constructor() {
        super("projects");
    }

    handle_query(query: string): shell.ShellOutputFragment[] {
        return [new shell.ShellOutputFragment(
            shell.Safeness.Safe,
            `
                <b>t4rmyn.github.io</b><br>
                &nbsp;&nbsp;The website you're currently seeing right now! This website and all of its functionalities (including the shell) is built using pure HTML, CSS, JavaScript/TypeScript. This is a static website that mimics a simplified terminal shell, with all of the logic coded in TypeScript, and transpiled to JavaScript.
                
            `
        )];
    }
}