var Machine = /** @class */ (function () {
    function Machine() {
        this.root = new DirectoryPath("/", null);
    }
    Machine.get_instance = function () {
        if (!Machine.instance) {
            Machine.instance = new Machine();
        }
        Machine.instance.initialize_filesystem();
        return Machine.instance;
    };
    Machine.prototype.get_root = function () {
        return this.root;
    };
    Machine.prototype.initialize_filesystem = function () {
        // Root
        this.root.add_directory_child("bin");
        var home = this.root.add_directory_child("home");
        this.root.add_directory_child("lib");
        this.root.add_directory_child("lib64");
        this.root.add_directory_child("root");
        this.root.add_directory_child("sys");
        // Home
        var t4rmyn = home.add_directory_child("t4rmyn");
        // T4rmyn
        var programming = t4rmyn.add_directory_child("Programming");
        var art = t4rmyn.add_directory_child("Art");
        t4rmyn.add_file_child("README", "Hello! :>");
    };
    return Machine;
}());
//# sourceMappingURL=machine.js.map