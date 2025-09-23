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
var Bio = /** @class */ (function (_super) {
    __extends(Bio, _super);
    function Bio() {
        return _super.call(this, "bio") || this;
    }
    Bio.prototype.handle_query = function (query) {
        return [new shell.ShellOutputFragment(shell.Safeness.Safe, "\n                Hi, the name's Tarmyn!\n                I'm an artist, programmer, and game developer.\n                Some things I like include Linux, Godot, and Progressive Metal/Djent!\n            ")];
    };
    Bio.prototype.get_man_entry = function () {
        return "<b><i>bio</b></i>: Personal short bio of myself.";
    };
    return Bio;
}(ShellApp));
export { Bio };
//# sourceMappingURL=bio.js.map