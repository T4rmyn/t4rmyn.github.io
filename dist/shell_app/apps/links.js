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
var Links = /** @class */ (function (_super) {
    __extends(Links, _super);
    function Links() {
        return _super.call(this, "links") || this;
    }
    Links.prototype.handle_query = function (query) {
        return [new shell.ShellOutputFragment(shell.Safeness.Safe, "\n                My Links:<br>\n                &nbsp;&nbsp;- <b><i><a href=\"https://bsky.app/profile/t4rmyn.bsky.social\" target=\"_blank\" class=\"link\">Bluesky</a></i></b><br>\n                &nbsp;&nbsp;- <b><i><a href=\"https://t4rmyn.itch.io/\" target=\"_blank\" class=\"link\">itch.io</a></i></b><br>\n            ")];
    };
    return Links;
}(ShellApp));
export { Links };
//# sourceMappingURL=links.js.map