interface ShellApp {
    keyword: string;

    get_keyword(this: ShellApp): string;
    handle_query(query: string): ShellOutput[];
}

class Help implements ShellApp {
    keyword: string;

    constructor() {
        this.keyword = "help"
    }

    get_keyword(this: ShellApp) {
        return this.keyword;
    }

    handle_query(query: string): ShellOutput[] {
        let keywords: string[] = Array.from(Shell.get_instance().get_keywords().keys()).sort();
        let final_output: ShellOutput[] = [];
        final_output.push(new ShellOutput(Safeness.Safe, "Available Commands:<br>"));
        for (let i = 0; i < keywords.length; i++) {
            final_output.push(new ShellOutput(Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new ShellOutput(Safeness.Unsafe, keywords[i]));
            final_output.push(new ShellOutput(Safeness.Safe, "</i></b><br>"));
        }
        return final_output;
    }
}

class Bio implements ShellApp {
    keyword: string;

    constructor() {
        this.keyword = "bio"
    }

    get_keyword(this: ShellApp) {
        return this.keyword;
    }

    handle_query(query: string): ShellOutput[] {
        return [new ShellOutput(
            Safeness.Safe,
            `
                Hi, the name's Tarmyn!
                I'm an artist, programmer, and game developer.
                Some things I like include Linux, Pokemon Mystery Dungeon, and progressive metal!
            `
        )];
    }
}

class PrintWorkingDirectory implements ShellApp {
    keyword: string;

    constructor() {
        this.keyword = "pwd"
    }

    get_keyword(this: ShellApp) {
        return this.keyword;
    }

    handle_query(query: string): ShellOutput[] {
        return [new ShellOutput(
            Safeness.Safe,
            Shell.get_instance().get_wd().concat(` 
                (...I'll someday implement a full fledge filesystem here, 
                but for now enjoy this tilde.)
            `)
        )];
    }
}

class Links implements ShellApp {
    keyword: string;

    constructor() {
        this.keyword = "links"
    }

    get_keyword(this: ShellApp) {
        return this.keyword;
    }

    handle_query(query: string): ShellOutput[] {
        return [new ShellOutput(
            Safeness.Safe,
            `
            My Links:<br>
            &nbsp;&nbsp;- <a href="https://bsky.app/profile/t4rmyn.bsky.social" target="_blank" class="link">Bluesky</a><br>
            &nbsp;&nbsp;- <a href="https://t4rmyn.itch.io/" target="_blank" class="link">itch.io</a><br>
            `
        )];
    }
}

class CmdHistory implements ShellApp {
    keyword: string;

    constructor() {
        this.keyword = "history"
    }

    get_keyword(this: ShellApp) {
        return this.keyword;
    }

    handle_query(query: string): ShellOutput[] {
        let final_output: ShellOutput[] = [];
        final_output.push(new ShellOutput(Safeness.Safe, "History:<br>"));
        let query_history: string[] = ShellString.get_instance().get_query_history();
        for (let i = 0; i < query_history.length; i++) {
            final_output.push(new ShellOutput(Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new ShellOutput(Safeness.Unsafe, query_history[i]));
            final_output.push(new ShellOutput(Safeness.Safe, "</i></b><br>"));
        }
        return final_output;
    }
}