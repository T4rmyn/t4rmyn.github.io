import { ShellApp } from "../shell_app.js";
import * as shell from "../../shell/index.js";

export class Links extends ShellApp {
    constructor() {
        super("links");
    }

    handle_query(query: string): shell.ShellOutputFragment[] {
        return [new shell.ShellOutputFragment(
            shell.Safeness.Safe,
            `
                My Links:<br>
                &nbsp;&nbsp;- <b><i><a href="https://bsky.app/profile/t4rmyn.bsky.social" target="_blank" class="link">Bluesky</a></i></b><br>
                &nbsp;&nbsp;- <b><i><a href="https://t4rmyn.itch.io/" target="_blank" class="link">itch.io</a></i></b><br>
            `,
        )];
    }
}