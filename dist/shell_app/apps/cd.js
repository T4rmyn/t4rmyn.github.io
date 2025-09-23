var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ShellApp } from "../shell_app.js";
import * as shell from "../../shell/index.js";
var ChangeDirectory = /** @class */ (function (_super) {
    __extends(ChangeDirectory, _super);
    function ChangeDirectory() {
        return _super.call(this, "cd") || this;
    }
    ChangeDirectory.prototype.handle_query = function (query) {
        if (query == "..") {
            var parent_1 = shell.Shell.get_instance().get_working_directory().get_parent();
            if (parent_1 == null) {
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: <b><i>"),
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> unsuccessful, already at root."),
                ];
            }
            else {
                shell.Shell.get_instance().set_working_directory(parent_1);
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: <b><i>"),
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> successful."),
                ];
            }
        }
        var child = shell.Shell.get_instance().get_working_directory().find_child(query);
        if (child != null) {
            if (child instanceof DirectoryPath) {
                shell.Shell.get_instance().set_working_directory(child);
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: <b><i>"),
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> successful."),
                ];
            }
            else {
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: <b><i>"),
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> is not a directory."),
                ];
            }
        }
        else {
            return [
                new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: Directory <b><i>"),
                new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> not found."),
            ];
        }
    };
    return ChangeDirectory;
}(ShellApp));
export { ChangeDirectory };
//# sourceMappingURL=cd.js.map