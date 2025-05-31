class Shell {
    static instance: Shell;

    public static get_instance(): Shell {
        if (!Shell.instance) {
            Shell.instance = new Shell();
        }

        return Shell.instance;
    }

    apps: ShellApp[];
    keywords: Map<string, ShellApp>;
    wd: string;

    constructor() {
        this.wd = "~";
        this.apps = new Array<ShellApp>();

        this.apps.push(new Help());
        this.apps.push(new Bio());
        this.apps.push(new PrintWorkingDirectory());
        this.apps.push(new Links());
        this.apps.push(new CmdHistory());
        this.apps.push(new Fortune());

        this.keywords = new Map<string, ShellApp>();
        for (let i = 0; i < this.apps.length; i++) {
            console.log(this.apps[i])
            this.keywords.set(this.apps[i].get_keyword(), this.apps[i]);
        }
    }

    get_keywords(): Map<string, ShellApp> {
        return this.keywords;
    }

    get_wd(): string {
        return this.wd;
    }

    submit_query(query: string): ShellOutput[] {
        let splitted: string[] = query.split(" ");
        if (this.keywords.has(splitted[0])) {
            console.log(this.keywords);
            return this.keywords.get(splitted[0]).handle_query(
                splitted.slice(1).join()
            );
        } else {
            return [
                new ShellOutput(Safeness.Safe, "Command: <b><i>"),
                new ShellOutput(Safeness.Unsafe, splitted[0]),
                new ShellOutput(Safeness.Safe, "</i></b> not found."),
            ];
        }
    }
}