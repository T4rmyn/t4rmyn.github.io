abstract class ShellApp {
    keyword: string;

    constructor(keyword: string) {
        this.keyword = keyword;
    }

    get_keyword(): string {
        return this.keyword;
    };
    
    abstract handle_query(query: string): ShellOutputFragment[];
}

interface PathApp {
    query_object_path(query: string): ObjectPath;
}

interface ManApp {
    get_man_entry(): string;
}

class Help extends ShellApp {
    constructor() {
        super("help")
    }

    handle_query(query: string): ShellOutputFragment[] {
        let keywords: string[] = Array.from(Shell.get_instance().get_keywords().keys()).sort();
        let final_output: ShellOutputFragment[] = [];
        final_output.push(new ShellOutputFragment(Safeness.Safe, "Available Commands:<br>"));
        for (let i = 0; i < keywords.length; i++) {
            final_output.push(new ShellOutputFragment(Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new ShellOutputFragment(Safeness.Unsafe, keywords[i]));
            if (Manual.mannable(keywords[i])) {
                final_output.push(new ShellOutputFragment(Safeness.Safe, " </i></b><span style=\"color: #d79921\">(has manpage)</span><br>"));
            } else {
                final_output.push(new ShellOutputFragment(Safeness.Safe, "</i></b><br>"));
            }
        }
        return final_output;
    }
}

class Bio extends ShellApp implements ManApp {
    constructor() {
        super("bio");
    }

    handle_query(query: string): ShellOutputFragment[] {
        return [new ShellOutputFragment(
            Safeness.Safe,
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

class PrintWorkingDirectory extends ShellApp {
    constructor() {
        super("pwd");
    }

    handle_query(query: string): ShellOutputFragment[] {
        return [new ShellOutputFragment(
            Safeness.Safe,
            "pwd: Current working directory is <b><i>" +
            Shell.get_instance().get_working_directory().find_absolute_path() +
            "</i></b>",
        )];
    }
}

class ChangeDirectory extends ShellApp implements PathApp {
    constructor() {
        super("cd");
    }

    handle_query(query: string): ShellOutputFragment[] {
        if (query == "..") {
            let parent: DirectoryPath | null = Shell.get_instance().get_working_directory().get_parent();
            if (parent == null) {
                return [
                    new ShellOutputFragment(Safeness.Safe, "cd: <b><i>"),
                    new ShellOutputFragment(Safeness.Unsafe, query),
                    new ShellOutputFragment(Safeness.Safe, "</i></b> unsuccessful, already at root."),
                ];
            } else {
                Shell.get_instance().set_working_directory(parent);
                return [
                    new ShellOutputFragment(Safeness.Safe, "cd: <b><i>"),
                    new ShellOutputFragment(Safeness.Unsafe, query),
                    new ShellOutputFragment(Safeness.Safe, "</i></b> successful."),
                ];
            }
        }
        let child: ObjectPath | null = Shell.get_instance().get_working_directory().find_child(query);
        if (child != null) {
            if (child instanceof DirectoryPath) {
                Shell.get_instance().set_working_directory(child);
                return [
                    new ShellOutputFragment(Safeness.Safe, "cd: <b><i>"),
                    new ShellOutputFragment(Safeness.Unsafe, query),
                    new ShellOutputFragment(Safeness.Safe, "</i></b> successful."),
                ];
            } else {
                return [
                    new ShellOutputFragment(Safeness.Safe, "cd: <b><i>"),
                    new ShellOutputFragment(Safeness.Unsafe, query),
                    new ShellOutputFragment(Safeness.Safe, "</i></b> is not a directory."),
                ];
            }
        } else {
            return [
                new ShellOutputFragment(Safeness.Safe, "cd: Directory <b><i>"),
                new ShellOutputFragment(Safeness.Unsafe, query),
                new ShellOutputFragment(Safeness.Safe, "</i></b> not found."),
            ];
        }
    }

    query_object_path
}

class ListObjectPaths extends ShellApp {
    constructor() {
        super("ls");
    }

    handle_query(query: string): ShellOutputFragment[] {
        return [new ShellOutputFragment(
            Safeness.Safe,
            function():string {
                let fin_string: string = "";
                let list: ObjectPath[] = Shell.get_instance().get_working_directory().get_children();
                list.forEach(function(x: ObjectPath): void {
                    if (x instanceof DirectoryPath) {
                        fin_string = fin_string.concat("<b>", x.get_name(), "</b> ");
                    } else {
                        fin_string = fin_string.concat(x.get_name(), " ");
                    }
                });
                return fin_string;
            }(),
        )];
    }
}

class PrintFileContent extends ShellApp {
    constructor() {
        super("cat");
    }

    handle_query(query: string): ShellOutputFragment[] {
        let child = Shell.get_instance().get_working_directory().find_child(query);
        if (child != null) {
            if (child instanceof FilePath) {
                return [
                    new ShellOutputFragment(Safeness.Unsafe, child.get_contents()),
                ];
            } else {
                return [
                    new ShellOutputFragment(Safeness.Safe, "cd: <b><i>"),
                    new ShellOutputFragment(Safeness.Unsafe, query),
                    new ShellOutputFragment(Safeness.Safe, "</i></b> is not a file."),
                ];
            }
        } else {
            return [
                new ShellOutputFragment(Safeness.Safe, "cat: File <b><i>"),
                new ShellOutputFragment(Safeness.Unsafe, query),
                new ShellOutputFragment(Safeness.Safe, "</i></b> not found."),
            ];
        }
    }
}

class Links extends ShellApp {
    constructor() {
        super("links");
    }

    handle_query(query: string): ShellOutputFragment[] {
        return [new ShellOutputFragment(
            Safeness.Safe,
            `
                My Links:<br>
                &nbsp;&nbsp;- <b><i><a href="https://bsky.app/profile/t4rmyn.bsky.social" target="_blank" class="link">Bluesky</a></i></b><br>
                &nbsp;&nbsp;- <b><i><a href="https://t4rmyn.itch.io/" target="_blank" class="link">itch.io</a></i></b><br>
            `,
        )];
    }
}

class CmdHistory extends ShellApp {
    constructor() {
        super("history");
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

class Fortune extends ShellApp implements ManApp {
    quotes: string[];

    constructor() {
        super("fortune");
        this.quotes = [
            "The machines are turning me!<br> &nbsp&nbsp- <b>Periphery, Wax Wings</b>",
            "So many reasons why one should never entertain the taste of Scarlet.<br> &nbsp&nbsp- <b>Periphery, Scarlet</b>",
            "Chase the obscene, travel these wonders far beyond!<br> &nbsp&nbsp- <b>Periphery, Froggin' Bullfish</b>",
            "Will we ever live in honesty?<br> &nbsp&nbsp- <b>Periphery, Dracul Gras</b>",

            "The night belongs to you.<br> &nbsp&nbsp- <b>Sleep Token, Euclid</b>",
            "I'm coiled up like a venomous serpent.<br> &nbsp&nbsp- <b>Sleep Token, Rain</b>",
            "I'm still your favourite regret, you're still my weapon of choosing.<br> &nbsp&nbsp- <b>Sleep Token, Blood Sport</b>",
            "It seems that even in Arcadia you walk beside me still.<br> &nbsp&nbsp- <b>Sleep Token, Even in Arcadia</b>",

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

    handle_query(query: string): ShellOutputFragment[] {
        return [new ShellOutputFragment(
            Safeness.Safe,
            this.quotes[Math.floor(Math.random() * this.quotes.length)],
        )];
    }

    get_man_entry(): string {
        return "<b><i>fortune</b></i>: Fetch selected random quotes, inspired by the UNIX fortune command line utility of the same name."
    }
}

class Manual extends ShellApp {
    keyword: string;

    constructor() {
        super("man");
    }

    handle_query(query: string): ShellOutputFragment[] {
        return [new ShellOutputFragment(
            Safeness.Safe,
            function(query: string): string {
                if (Shell.get_instance().get_keywords().has(query)) {
                    let app: ShellApp | undefined = Shell.get_instance().get_keywords().get(query);
                    if ("get_man_entry" in app) {
                        return (app as ManApp).get_man_entry();
                    } else {
                        return "man: <b><i>" + app.get_keyword() + "</i></b> has no man entry.";
                    }
                } else {
                    return "man: <b><i>" + query + "</i></b> is not a recognized command.";
                }
            }(query),
        )];
    }

    static mannable(query: string): boolean {
        if (Shell.get_instance().get_keywords().has(query)) {
            let app: ShellApp | undefined = Shell.get_instance().get_keywords().get(query);
            if ("get_man_entry" in app) {
                return true;
            }
        }
        return false;
    }
}