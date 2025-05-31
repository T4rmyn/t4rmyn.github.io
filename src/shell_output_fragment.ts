enum Safeness {
    Safe,
    Unsafe,
}

class ShellOutputFragment {
    type: Safeness;
    content: string;

    constructor(type: Safeness, content: string) {
        this.type = type;
        this.content = content;
    }

    get_type(this: ShellOutputFragment): Safeness {
        return this.type;
    }

    get_content(this: ShellOutputFragment): string {
        return this.content;
    }
}