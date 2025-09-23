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
var CmdHistory = /** @class */ (function (_super) {
    __extends(CmdHistory, _super);
    function CmdHistory() {
        return _super.call(this, "history") || this;
    }
    CmdHistory.prototype.handle_query = function (query) {
        var final_output = [];
        final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "History:<br>"));
        var query_history = shell.ShellOutputEngine.get_instance().get_query_history();
        for (var i = 0; i < query_history.length; i++) {
            final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new shell.ShellOutputFragment(shell.Safeness.Unsafe, query_history[i]));
            final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b><br>"));
        }
        return final_output;
    };
    return CmdHistory;
}(ShellApp));
export { CmdHistory };
//# sourceMappingURL=history.js.map