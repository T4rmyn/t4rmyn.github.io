enum Safeness {
    Safe,
    Unsafe,
}

class ShellOutput {
    type: Safeness;
    content: string;

    constructor(type, content) {
        this.type = type;
        this.content = content;
    }

    get_type(this: ShellOutput): Safeness {
        return this.type;
    }

    get_content(this: ShellOutput): string {
        return this.content;
    }
}