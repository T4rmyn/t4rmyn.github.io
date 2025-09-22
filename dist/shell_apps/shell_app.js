var ShellApp = /** @class */ (function () {
    function ShellApp(keyword) {
        this.keyword = keyword;
    }
    ShellApp.prototype.get_keyword = function () {
        return this.keyword;
    };
    ;
    return ShellApp;
}());
var ShellAppMeta = /** @class */ (function () {
    function ShellAppMeta() {
    }
    ShellAppMeta.main = function () {
        document.head.appendChild(Meta.createScript("dist/shell_apps/apps/bio.js"));
        document.head.appendChild(Meta.createScript("dist/shell_apps/apps/cat.js"));
        document.head.appendChild(Meta.createScript("dist/shell_apps/apps/cd.js"));
        document.head.appendChild(Meta.createScript("dist/shell_apps/apps/fortune.js"));
        document.head.appendChild(Meta.createScript("dist/shell_apps/apps/help.js"));
        document.head.appendChild(Meta.createScript("dist/shell_apps/apps/history.js"));
        document.head.appendChild(Meta.createScript("dist/shell_apps/apps/links.js"));
        document.head.appendChild(Meta.createScript("dist/shell_apps/apps/ls.js"));
        document.head.appendChild(Meta.createScript("dist/shell_apps/apps/manual.js"));
        document.head.appendChild(Meta.createScript("dist/shell_apps/apps/pwd.js"));
    };
    return ShellAppMeta;
}());
//# sourceMappingURL=shell_app.js.map