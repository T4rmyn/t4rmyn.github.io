var Shell = /** @class */ (function () {
    function Shell() {
        this.wd = "~";
        this.apps = new Array();
        this.apps.push(new Help());
        this.apps.push(new Bio());
        this.apps.push(new PrintWorkingDirectory());
        this.apps.push(new Links());
        this.apps.push(new CmdHistory());
        this.apps.push(new Fortune());
        this.keywords = new Map();
        for (var i = 0; i < this.apps.length; i++) {
            console.log(this.apps[i]);
            this.keywords.set(this.apps[i].get_keyword(), this.apps[i]);
        }
    }
    Shell.get_instance = function () {
        if (!Shell.instance) {
            Shell.instance = new Shell();
        }
        return Shell.instance;
    };
    Shell.prototype.get_keywords = function () {
        return this.keywords;
    };
    Shell.prototype.get_wd = function () {
        return this.wd;
    };
    Shell.prototype.submit_query = function (query) {
        var splitted = query.split(" ");
        if (this.keywords.has(splitted[0])) {
            console.log(this.keywords);
            return this.keywords.get(splitted[0]).handle_query(splitted.slice(1).join());
        }
        else {
            return [
                new ShellOutput(Safeness.Safe, "Command: <b><i>"),
                new ShellOutput(Safeness.Unsafe, splitted[0]),
                new ShellOutput(Safeness.Safe, "</i></b> not found."),
            ];
        }
    };
    return Shell;
}());
