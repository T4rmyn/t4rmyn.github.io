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
var Projects = /** @class */ (function (_super) {
    __extends(Projects, _super);
    function Projects() {
        return _super.call(this, "projects") || this;
    }
    Projects.prototype.handle_query = function (query) {
        return [new shell.ShellOutputFragment(shell.Safeness.Safe, "\n                <b>t4rmyn.github.io</b><br>\n                &nbsp;&nbsp;The website you're currently seeing right now! This website and all of its functionalities (including the shell) is built using pure HTML, CSS, JavaScript/TypeScript. This is a static website that mimics a simplified terminal shell, with all of the logic coded in TypeScript, and transpiled to JavaScript.\n                \n            ")];
    };
    return Projects;
}(ShellApp));
export { Projects };
//# sourceMappingURL=projects.js.map