import * as shell from "./index.js";

export class ShellOutputEngine {
    static instance: ShellOutputEngine;

    public static get_instance(): ShellOutputEngine {
        if (!ShellOutputEngine.instance) {
            ShellOutputEngine.instance = new ShellOutputEngine();
        }

        return ShellOutputEngine.instance;
    }

    query_id: number;
    query: string;
    query_history: string[];
    query_history_i: number;

    set_query_history_i(value: number): void {
        this.query_history_i = Math.min(this.query_history.length, Math.max(0, value));
    }

    get_query_history(): string[] {
        return this.query_history;
    }

    get_query_history_i(): number {
        return this.query_history_i;
    }

    constructor() {
        this.query_id = 1;
        this.query = "";
        this.query_history = new Array();
        this.set_query_history_i(this.query_history.length - 1);
    }

    replace_query(char: string): void {
        this.query = char;
    }

    add_char_query(char: string): void {
        this.query = this.query.concat(char);
        this.set_query_history_i(this.query_history.length);
    }

    remove_char_query(): void {
        this.query = this.query.substring(0, this.query.length - 1);
        this.set_query_history_i(this.query_history.length);
    }

    handle_output(output: shell.ShellOutputFragment[], obj: HTMLElement): void {
        let final_string = "";
        
        output.forEach(function(text: shell.ShellOutputFragment) {
            let temp_string = text.get_content();
            if (text.get_type() === shell.Safeness.Unsafe) {
                temp_string = String(temp_string)
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;")
                    .replaceAll("'", "&#39;");
            }
            final_string = final_string.concat(temp_string);
        })

        obj.innerHTML = final_string;
    }

    update_shell(): void {
        let text: HTMLElement | null = document.getElementById(
            "main".concat(this.query_id.toString())
        );
        if (text !== null) {
            let output: shell.ShellOutputFragment[] = [
                new shell.ShellOutputFragment(shell.Safeness.Safe, "".concat(
                    "t4rmyn@arkane:",
                    shell.Shell.get_instance().get_working_directory().find_absolute_path(),
                    "> ",
                    "<span style=\"color: #ebdbb2\"> ",
                )),
                new shell.ShellOutputFragment(shell.Safeness.Unsafe, this.query),
                new shell.ShellOutputFragment(shell.Safeness.Safe, "█</span>"),
            ];
            this.handle_output(output, text);
        }
    }

    update_ticker(): void {
        let ticker: HTMLElement | null = document.getElementById(
            "t".concat(this.query_id.toString())
        );
        (ticker as HTMLElement).innerHTML = "[".concat(this.query_id.toString(),"]");
    }

    freeze_shell(): void {
        let text: HTMLElement | null = document.getElementById(
            "main".concat(this.query_id.toString())
        );
        if (text !== null) {
            let output: shell.ShellOutputFragment[] = [
                new shell.ShellOutputFragment(shell.Safeness.Safe, "".concat(
                    "t4rmyn@arkane:",
                    shell.Shell.get_instance().get_working_directory().find_absolute_path(),
                    "> ",
                    "<span style=\"color: #ebdbb2\"> ",
                )),
                new shell.ShellOutputFragment(shell.Safeness.Unsafe, this.query),
                new shell.ShellOutputFragment(shell.Safeness.Safe, "</span>"),
            ];
            this.handle_output(output, text);
        }
    }

    arrow_history(up: boolean): void {
        if (up) {
            this.set_query_history_i(this.get_query_history_i() - 1);
        } else {
            this.set_query_history_i(this.get_query_history_i() + 1);
        }
        if (this.get_query_history_i() == this.query_history.length) {
            this.replace_query("");
        } else {
            this.replace_query(this.query_history[this.get_query_history_i()]);
        }
    }

    submit_query(): void {
        let old_l_section_box: HTMLElement | null = document.getElementById("ls".concat((this.query_id).toString()))

        this.freeze_shell();
        this.query_id += 1;

        let parent_div: HTMLElement | null = document.getElementById("terminal-box");

        let new_section_box: HTMLElement = document.createElement("div");
        new_section_box.classList.add("upper-section-box")
        new_section_box.id = "us".concat(this.query_id.toString());

        let new_ticker: HTMLElement = document.createElement("p");
        new_ticker.classList.add("ticker")
        new_ticker.id = "t".concat(this.query_id.toString());

        let new_l_section_box: HTMLElement = document.createElement("div");
        new_l_section_box.classList.add("lower-section-box");
        new_l_section_box.id = "ls".concat(this.query_id.toString());

        new_section_box.appendChild(new_ticker);
        new_section_box.appendChild(new_l_section_box);

        let new_obj: HTMLElement = document.createElement("p");
        new_obj.classList.add("terminal-response");

        this.query_history.push(this.query)

        let output_text: shell.ShellOutputFragment[] = shell.Shell.get_instance().submit_query(this.query);
        this.handle_output(output_text, new_obj);
        
        let new_query: HTMLElement = document.createElement("p");
        new_query.classList.add("terminal-query");
        new_query.id = String("main").concat(this.query_id.toString());

        (old_l_section_box as HTMLElement).appendChild(new_obj);
        (new_l_section_box as HTMLElement).appendChild(new_query);
        (new_section_box as HTMLElement).appendChild(new_l_section_box);

        let source: HTMLElement | null = document.getElementById("bottom-section-box");
        (parent_div as HTMLElement).insertBefore(new_section_box, source);

        this.query = "";
        this.set_query_history_i(this.query_history.length);
        this.update_ticker();

        new_section_box.scrollIntoView();
    }
}

document.addEventListener('keydown', function(event) {
    if (String(event.key).length === 1) {
        ShellOutputEngine.get_instance().add_char_query(event.key)
    } else {
        switch (event.key) {
            case "Backspace":
                ShellOutputEngine.get_instance().remove_char_query()
                break;
            case "Enter":
                ShellOutputEngine.get_instance().submit_query()
                break;
            case "ArrowUp":
                event.preventDefault();
                ShellOutputEngine.get_instance().arrow_history(true);
                break;
            case "ArrowDown":
                event.preventDefault();
                ShellOutputEngine.get_instance().arrow_history(false);
                break;
            default:
                break;
        }
    }
    ShellOutputEngine.get_instance().update_shell()
});

document.getElementById("projects").addEventListener(
    "click",
    (
        function(){
            ShellOutputEngine.get_instance().replace_query("projects");
            ShellOutputEngine.get_instance().update_shell();
            ShellOutputEngine.get_instance().submit_query();
            ShellOutputEngine.get_instance().update_shell();
        }
    )
);

document.getElementById("bio").addEventListener(
    "click",
    (
        function(){
            ShellOutputEngine.get_instance().replace_query("bio");
            ShellOutputEngine.get_instance().update_shell();
            ShellOutputEngine.get_instance().submit_query();
            ShellOutputEngine.get_instance().update_shell();
        }
    )
);