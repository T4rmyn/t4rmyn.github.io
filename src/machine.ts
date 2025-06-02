class Machine {
    static instance: Machine;

    public static get_instance(): Machine {
        if (!Machine.instance) {
            Machine.instance = new Machine();
        }
        Machine.instance.initialize_filesystem();
        return Machine.instance;
    }

    root: DirectoryPath;

    constructor() {
        this.root = new DirectoryPath("/", null);
    }

    get_root(): DirectoryPath {
        return this.root;
    }

    initialize_filesystem(): void {
        // Root
        this.root.add_directory_child("bin");
        let home: DirectoryPath = this.root.add_directory_child("home");
        this.root.add_directory_child("lib");
        this.root.add_directory_child("lib64");
        this.root.add_directory_child("root");
        this.root.add_directory_child("sys");

        // Home
        let t4rmyn: DirectoryPath = home.add_directory_child("t4rmyn");

        // T4rmyn
        let programming: DirectoryPath = t4rmyn.add_directory_child("Programming");
        let art: DirectoryPath = t4rmyn.add_directory_child("Art");
        t4rmyn.add_file_child("README", "Hello! :>");
    }
}