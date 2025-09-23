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
import { Manual } from "./manual.js";
import * as shell from "../../shell/index.js";
var Help = /** @class */ (function (_super) {
    __extends(Help, _super);
    function Help() {
        return _super.call(this, "help") || this;
    }
    Help.prototype.handle_query = function (query) {
        var keywords = Array.from(shell.Shell.get_instance().get_keywords().keys()).sort();
        var final_output = [];
        final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "Available Commands:<br>"));
        for (var i = 0; i < keywords.length; i++) {
            final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new shell.ShellOutputFragment(shell.Safeness.Unsafe, keywords[i]));
            if (Manual.mannable(keywords[i])) {
                final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, " </i></b><span style=\"color: #d79921\">(has manpage)</span><br>"));
            }
            else {
                final_output.push(new shell.ShellOutputFragment(shell.Safeness.Safe, "</i></b><br>"));
            }
        }
        return final_output;
    };
    return Help;
}(ShellApp));
export { Help };
//# sourceMappingURL=help.js.map