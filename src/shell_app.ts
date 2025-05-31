interface ShellApp {
    keyword: string;

    get_keyword(this: ShellApp): string;
    handle_query(query: string): ShellOutputFragment[];
}

class Help implements ShellApp {
    keyword: string;

    constructor() {
        this.keyword = "help";
    }

    get_keyword(this: ShellApp) {
        return this.keyword;
    }

    handle_query(query: string): ShellOutputFragment[] {
        let keywords: string[] = Array.from(Shell.get_instance().get_keywords().keys()).sort();
        let final_output: ShellOutputFragment[] = [];
        final_output.push(new ShellOutputFragment(Safeness.Safe, "Available Commands:<br>"));
        for (let i = 0; i < keywords.length; i++) {
            final_output.push(new ShellOutputFragment(Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new ShellOutputFragment(Safeness.Unsafe, keywords[i]));
            final_output.push(new ShellOutputFragment(Safeness.Safe, "</i></b><br>"));
        }
        return final_output;
    }
}

class Bio implements ShellApp {
    keyword: string;

    constructor() {
        this.keyword = "bio";
    }

    get_keyword(this: ShellApp) {
        return this.keyword;
    }

    handle_query(query: string): ShellOutputFragment[] {
        return [new ShellOutputFragment(
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
        this.keyword = "pwd";
    }

    get_keyword(this: ShellApp) {
        return this.keyword;
    }

    handle_query(query: string): ShellOutputFragment[] {
        return [new ShellOutputFragment(
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
        this.keyword = "links";
    }

    get_keyword(this: ShellApp) {
        return this.keyword;
    }

    handle_query(query: string): ShellOutputFragment[] {
        return [new ShellOutputFragment(
            Safeness.Safe,
            `
            My Links:<br>
            &nbsp;&nbsp;- <b><i><a href="https://bsky.app/profile/t4rmyn.bsky.social" target="_blank" class="link">Bluesky</a></i></b><br>
            &nbsp;&nbsp;- <b><i><a href="https://t4rmyn.itch.io/" target="_blank" class="link">itch.io</a></i></b><br>
            `
        )];
    }
}

class CmdHistory implements ShellApp {
    keyword: string;

    constructor() {
        this.keyword = "history";
    }

    get_keyword(this: ShellApp) {
        return this.keyword;
    }

    handle_query(query: string): ShellOutputFragment[] {
        let final_output: ShellOutputFragment[] = [];
        final_output.push(new ShellOutputFragment(Safeness.Safe, "History:<br>"));
        let query_history: string[] = ShellOutputEngine.get_instance().get_query_history();
        for (let i = 0; i < query_history.length; i++) {
            final_output.push(new ShellOutputFragment(Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new ShellOutputFragment(Safeness.Unsafe, query_history[i]));
            final_output.push(new ShellOutputFragment(Safeness.Safe, "</i></b><br>"));
        }
        return final_output;
    }
}

class Fortune implements ShellApp {
    keyword: string;
    quotes: string[];

    constructor() {
        this.keyword = "fortune";
        this.quotes = [
            "The machines are turning me!<br> &nbsp&nbsp- <b>Periphery, Wax Wings</b>",
            "So many reasons why one should never entertain the taste of Scarlet.<br> &nbsp&nbsp- <b>Periphery, Scarlet</b>",
            "Chase the obscene, travel these wonders far beyond!<br> &nbsp&nbsp- <b>Periphery, Froggin' Bullfish</b>",
            "Will we ever live in honesty?<br> &nbsp&nbsp- <b>Periphery, Dracul Gras</b>",

            "The night belongs to you.<br> &nbsp&nbsp- <b>Sleep Token, Euclid</b>",
            "I'm coiled up like a venomous serpent.<br> &nbsp&nbsp- <b>Sleep Token, Rain</b>",
            "I'm still your favourite regret, you're still my weapon of choosing.<br> &nbsp&nbsp- <b>Sleep Token, Blood Sport</b>",

            "One, one less, one less life, one less life for us to live.<br> &nbsp&nbsp- <b>Haken, Invasion</b>",
            "When did we give up the ghost as a trade for a heart that begins to break?<br> &nbsp&nbsp- <b>Haken, Invasion</b>",
            "You turned your back on Affinity.<br> &nbsp&nbsp- <b>Haken, The Architect</b>",
            "We'll make this dream last forever and ever.<br> &nbsp&nbsp- <b>Haken, The Architect</b>",
            "A chameleon hides behind Orwellian eyes.<br> &nbsp&nbsp- <b>Haken, The Architect</b>",
            "Cast the die, lose control.<br> &nbsp&nbsp- <b>Haken, 1985</b>",

            "Fill my eyes with blur.<br> &nbsp&nbsp- <b>TesseracT, Legion</b>",
            "The words that I whispered when it all began, did they shine a light on you?<br> &nbsp&nbsp- <b>TesseracT, War of Being</b>",
            "I can be guilty free, don't you see? In a world designed for you and me.<br> &nbsp&nbsp- <b>TesseracT, Legion</b>",
            "So my demons, your time has come.<br> &nbsp&nbsp- <b>TesseracT, Concealing Fate - Part 2: Deception</b>",
        ];
    }

    get_keyword(this: Fortune) {
        return this.keyword;
    }

    handle_query(query: string): ShellOutputFragment[] {
        return [new ShellOutputFragment(
            Safeness.Safe,
            this.quotes[Math.floor(Math.random() * this.quotes.length)],
        )];
    }
}