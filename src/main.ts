class Meta {
    static createScript(path: string): HTMLScriptElement {
        let script_obj: HTMLScriptElement = document.createElement("script");
        script_obj.src = path;
        return script_obj;
    }

    static main(): void {
        document.head.appendChild(Meta.createScript("dist/directory.js"));
        document.head.appendChild(Meta.createScript("dist/machine.js"));
        document.head.appendChild(Meta.createScript("dist/shell/shell_output_fragment.js"));
        document.head.appendChild(Meta.createScript("dist/shell/shell.js"));
        document.head.appendChild(Meta.createScript("dist/shell/shell_output_engine.js"));
    }
}

window.onload = function(){Meta.main()};