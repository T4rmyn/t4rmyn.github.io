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
var Manual = /** @class */ (function (_super) {
    __extends(Manual, _super);
    function Manual() {
        return _super.call(this, "man") || this;
    }
    Manual.prototype.handle_query = function (query) {
        return [new shell.ShellOutputFragment(shell.Safeness.Safe, function (query) {
                if (shell.Shell.get_instance().get_keywords().has(query)) {
                    var app = shell.Shell.get_instance().get_keywords().get(query);
                    if ("get_man_entry" in app) {
                        return app.get_man_entry();
                    }
                    else {
                        return "man: <b><i>" + app.get_keyword() + "</i></b> has no man entry.";
                    }
                }
                else {
                    return "man: <b><i>" + query + "</i></b> is not a recognized command.";
                }
            }(query))];
    };
    Manual.mannable = function (query) {
        if (shell.Shell.get_instance().get_keywords().has(query)) {
            var app = shell.Shell.get_instance().get_keywords().get(query);
            if ("get_man_entry" in app) {
                return true;
            }
        }
        return false;
    };
    return Manual;
}(ShellApp));
export { Manual };
//# sourceMappingURL=manual.js.map