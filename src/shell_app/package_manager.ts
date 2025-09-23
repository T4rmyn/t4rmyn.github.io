import { ShellApp } from "./shell_app.js";
import * as app from "./apps/index.js";

export class PackageManager {
    static basic_packages(): Array<ShellApp> {
        let packages: Array<ShellApp> = new Array<ShellApp>(
            new app.Help(),
            new app.Bio(),
            new app.PrintWorkingDirectory(),
            new app.PrintFileContent(),
            new app.ListObjectPaths(),
            new app.ChangeDirectory(),
            new app.Links(),
            new app.CmdHistory(),
            new app.Fortune(),
            new app.Manual(),
        );
        return packages;
    }
}