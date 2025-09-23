export enum Safeness {
    Safe,
    Unsafe,
}

export class ShellOutputFragment {
    type: Safeness;
    content: string;

    constructor(type: Safeness, content: string) {
        this.type = type;
        this.content = content;
    }

    static empty() {
        return new ShellOutputFragment(Safeness.Safe, "");
    }

    get_type(): Safeness {
        return this.type;
    }

    get_content(): string {
        return this.content;
    }
}