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

    constructor(working_directory: String, query: String) {
        this.query_id = 1;
        this.query = query;
        this.query_history = new Array();
    }

    get_query_history(this: ShellString): string[] {
        return this.query_history;
    }

    add_char_query(this: ShellString, char: String): void {
        this.query = this.query.concat(char.toString());
    }

    remove_char_query(this: ShellString): void {
        this.query = this.query.substring(0, this.query.length - 1);
    }

    update_shell(this: ShellString): void {
        let text: HTMLElement | null = document.getElementById(
            "main".concat(this.query_id.toString())
        );
        console.log(text)
        if (text !== null) {
            (text as HTMLElement).innerHTML = "t4rmyn@arkane:".concat(
                Shell.get_instance().get_wd().toString(),
                "> ",
                "<span style=\"color: #ebdbb2\"> ",
            );
            (text as HTMLElement).innerText = (text as HTMLElement).innerText.concat(" ", this.query.toString());
            (text as HTMLElement).innerHTML = (text as HTMLElement).innerHTML.concat("█</span>");
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
            (text as HTMLElement).innerHTML = "t4rmyn@arkane:".concat(
                Shell.get_instance().get_wd().toString(),
                "> ",
                "<span style=\"color: #ebdbb2\">",
            );
            (text as HTMLElement).innerText = (text as HTMLElement).innerText.concat(" ", this.query.toString());
            (text as HTMLElement).innerHTML = (text as HTMLElement).innerHTML.concat("</span>");
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

        let output_text: string = Shell.get_instance().submit_query(this.query.toString());
        if (output_text.startsWith("!!!")) {
            new_obj.innerHTML = "Command: <b><i>";
            new_obj.innerText = new_obj.innerText.concat(output_text.slice(3));
            new_obj.innerHTML = new_obj.innerHTML.concat("</i></b> not recognized.");
        } else {
            new_obj.innerHTML = output_text;
        }
        
        let new_query: HTMLElement = document.createElement("p");
        new_query.classList.add("terminal-query");
        new_query.id = String("main").concat(this.query_id.toString());

        (old_l_section_box as HTMLElement).appendChild(new_obj);
        (new_l_section_box as HTMLElement).appendChild(new_query);
        (new_section_box as HTMLElement).appendChild(new_l_section_box);
        (parent_div as HTMLElement).appendChild(new_section_box);

        this.query = "";
        this.update_ticker()
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
            default:
                break;
        }
    }
    ShellString.get_instance().update_shell()
});
