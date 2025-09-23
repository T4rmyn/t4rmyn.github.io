import * as app from "./apps/index.js";
var PackageManager = /** @class */ (function () {
    function PackageManager() {
    }
    PackageManager.basic_packages = function () {
        var packages = new Array(new app.Help(), new app.Bio(), new app.PrintWorkingDirectory(), new app.PrintFileContent(), new app.ListObjectPaths(), new app.ChangeDirectory(), new app.Links(), new app.CmdHistory(), new app.Fortune(), new app.Manual(), new app.Projects());
        return packages;
    };
    return PackageManager;
}());
export { PackageManager };
//# sourceMappingURL=package_manager.js.map