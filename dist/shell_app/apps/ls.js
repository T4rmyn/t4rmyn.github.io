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
var ListObjectPaths = /** @class */ (function (_super) {
    __extends(ListObjectPaths, _super);
    function ListObjectPaths() {
        return _super.call(this, "ls") || this;
    }
    ListObjectPaths.prototype.handle_query = function (query) {
        return [new shell.ShellOutputFragment(shell.Safeness.Safe, function () {
                var fin_string = "";
                var list = shell.Shell.get_instance().get_working_directory().get_children();
                list.forEach(function (x) {
                    if (x instanceof DirectoryPath) {
                        fin_string = fin_string.concat("<b>", x.get_name(), "</b> ");
                    }
                    else {
                        fin_string = fin_string.concat(x.get_name(), " ");
                    }
                });
                return fin_string;
            }())];
    };
    return ListObjectPaths;
}(ShellApp));
export { ListObjectPaths };
//# sourceMappingURL=ls.js.map