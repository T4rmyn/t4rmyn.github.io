import { PackageManager } from "../shell_app/package_manager.js";
import * as shell from "./index.js";
var Shell = /** @class */ (function () {
    function Shell() {
        this.working_directory = Machine.get_instance().get_root();
        this.apps = PackageManager.basic_packages();
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
                new shell.ShellOutputFragment(shell.Safeness.Safe, "Command: <b><i>"),
                new shell.ShellOutputFragment(shell.Safeness.Unsafe, splitted[0]),
                new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> not found."),
            ];
        }
    };
    return Shell;
}());
export { Shell };
//# sourceMappingURL=shell.js.map