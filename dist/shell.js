var Shell = /** @class */ (function () {
    function Shell() {
        this.working_directory = Machine.get_instance().get_root();
        this.apps = new Array(new Help(), new Bio(), new PrintWorkingDirectory(), new PrintFileContent(), new ListObjectPaths(), new ChangeDirectory(), new Links(), new CmdHistory(), new Fortune(), new Manual());
        this.keywords = new Map();
        for (var i = 0; i < this.apps.length; i++) {
            this.keywords.set(this.apps[i].get_keyword(), this.apps[i]);
        }
    }
    Shell.get_instance = function () {
        if (!Shell.instance) {
            Shell.instance = new Shell();
        }
        return Shell.instance;
    };
    Shell.prototype.set_working_directory = function (dir) {
        this.working_directory = dir;
    };
    Shell.prototype.get_keywords = function () {
        return this.keywords;
    };
    Shell.prototype.get_working_directory = function () {
        return this.working_directory;
    };
    Shell.prototype.submit_query = function (query) {
        var splitted = query.split(" ");
        if (this.keywords.has(splitted[0])) {
            return this.keywords.get(splitted[0]).handle_query(splitted.slice(1).join(" "));
        }
        else {
            return [
                new ShellOutputFragment(Safeness.Safe, "Command: <b><i>"),
                new ShellOutputFragment(Safeness.Unsafe, splitted[0]),
                new ShellOutputFragment(Safeness.Safe, "</i></b> not found."),
            ];
        }
    };
    return Shell;
}());
//# sourceMappingURL=shell.js.map