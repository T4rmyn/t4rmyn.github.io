class ShellString {
    static instance: ShellString;

    public static get_instance(): ShellString {
        if (!ShellString.instance) {
            ShellString.instance = new ShellString("~", "");
        }

        return ShellString.instance;
    }

    query_id: number;
    query: String;
    query_history: string[];
    query_history_i: number;

    set_query_history_i(this: ShellString, value: number): void {
        this.query_history_i = Math.min(this.query_history.length, Math.max(0, value));
        console.log(this.query_history_i.toString());
    }

    get_query_history(this: ShellString): string[] {
        return this.query_history;
    }

    get_query_history_i(this: ShellString): number {
        return this.query_history_i;
    }

    constructor(working_directory: String, query: String) {
        this.query_id = 1;
        this.query = query;
        this.query_history = new Array();
        this.set_query_history_i(this.query_history.length - 1);
    }

    replace_query(this: ShellString, char: String): void {
        this.query = char.toString();
    }

    add_char_query(this: ShellString, char: String): void {
        this.query = this.query.concat(char.toString());
        this.set_query_history_i(this.query_history.length);
    }

    remove_char_query(this: ShellString): void {
        this.query = this.query.substring(0, this.query.length - 1);
        this.set_query_history_i(this.query_history.length);
    }

    handle_output(this: ShellString, output: ShellOutput[], obj: HTMLElement): void {
        let final_string = "";
        
        output.forEach(function(text: ShellOutput) {
            let temp_string = text.get_content();
            if (text.get_type() === Safeness.Unsafe) {
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

    update_shell(this: ShellString): void {
        let text: HTMLElement | null = document.getElementById(
            "main".concat(this.query_id.toString())
        );
        if (text !== null) {
            let output: ShellOutput[] = [
                new ShellOutput(Safeness.Safe, "".concat(
                    "t4rmyn@arkane:",
                    Shell.get_instance().get_wd().toString(),
                    "> ",
                    "<span style=\"color: #ebdbb2\"> ",
                )),
                new ShellOutput(Safeness.Unsafe, this.query.toString()),
                new ShellOutput(Safeness.Safe, "█</span>"),
            ];
            this.handle_output(output, text);
        }
    }

    update_ticker(this: ShellString): void {
        let ticker: HTMLElement | null = document.getElementById(
            "t".concat(this.query_id.toString())
        );
        (ticker as HTMLElement).innerHTML = "[".concat(this.query_id.toString(),"]");
    }

    freeze_shell(this: ShellString): void {
        let text: HTMLElement | null = document.getElementById(
            "main".concat(this.query_id.toString())
        );
        if (text !== null) {
            let output: ShellOutput[] = [
                new ShellOutput(Safeness.Safe, "".concat(
                    "t4rmyn@arkane:",
                    Shell.get_instance().get_wd().toString(),
                    "> ",
                    "<span style=\"color: #ebdbb2\"> ",
                )),
                new ShellOutput(Safeness.Unsafe, this.query.toString()),
                new ShellOutput(Safeness.Safe, "</span>"),
            ];
            this.handle_output(output, text);
        }
    }

    arrow_history(this: ShellString, up: boolean): void {
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

    submit_query(this: ShellString): void {
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

        this.query_history.push(this.query.toString())
        console.log(this.query_history)

        let output_text: ShellOutput[] = Shell.get_instance().submit_query(this.query.toString());
        this.handle_output(output_text, new_obj);
        
        let new_query: HTMLElement = document.createElement("p");
        new_query.classList.add("terminal-query");
        new_query.id = String("main").concat(this.query_id.toString());

        (old_l_section_box as HTMLElement).appendChild(new_obj);
        (new_l_section_box as HTMLElement).appendChild(new_query);
        (new_section_box as HTMLElement).appendChild(new_l_section_box);

        let source: HTMLElement | null = document.getElementById("source");
        (parent_div as HTMLElement).insertBefore(new_section_box, source);

        this.query = "";
        this.set_query_history_i(this.query_history.length);
        this.update_ticker();

        new_section_box.scrollIntoView();
    }
}

document.addEventListener('keydown', function(event) {
    if (String(event.key).length === 1) {
        ShellString.get_instance().add_char_query(event.key)
    } else {
        switch (event.key) {
            case "Backspace":
                ShellString.get_instance().remove_char_query()
                break;
            case "Enter":
                ShellString.get_instance().submit_query()
                break;
            case "ArrowUp":
                event.preventDefault();
                ShellString.get_instance().arrow_history(true);
                break;
            case "ArrowDown":
                event.preventDefault();
                ShellString.get_instance().arrow_history(false);
                break;
            default:
                break;
        }
    }
    ShellString.get_instance().update_shell()
});