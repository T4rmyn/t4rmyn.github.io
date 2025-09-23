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
var PrintWorkingDirectory = /** @class */ (function (_super) {
    __extends(PrintWorkingDirectory, _super);
    function PrintWorkingDirectory() {
        return _super.call(this, "pwd") || this;
    }
    PrintWorkingDirectory.prototype.handle_query = function (query) {
        return [new shell.ShellOutputFragment(shell.Safeness.Safe, "pwd: Current working directory is <b><i>" +
                shell.Shell.get_instance().get_working_directory().find_absolute_path() +
                "</i></b>")];
    };
    return PrintWorkingDirectory;
}(ShellApp));
export { PrintWorkingDirectory };
//# sourceMappingURL=pwd.js.map