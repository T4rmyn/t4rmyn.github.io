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
var PrintFileContent = /** @class */ (function (_super) {
    __extends(PrintFileContent, _super);
    function PrintFileContent() {
        return _super.call(this, "cat") || this;
    }
    PrintFileContent.prototype.handle_query = function (query) {
        var child = shell.Shell.get_instance().get_working_directory().find_child(query);
        if (child != null) {
            if (child instanceof FilePath) {
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, child.get_contents()),
                ];
            }
            else {
                return [
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "cd: <b><i>"),
                    new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                    new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> is not a file."),
                ];
            }
        }
        else {
            return [
                new shell.ShellOutputFragment(shell.Safeness.Safe, "cat: File <b><i>"),
                new shell.ShellOutputFragment(shell.Safeness.Unsafe, query),
                new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b> not found."),
            ];
        }
    };
    return PrintFileContent;
}(ShellApp));
export { PrintFileContent };
//# sourceMappingURL=cat.js.map