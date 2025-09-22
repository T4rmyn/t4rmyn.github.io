class Meta {
    static createScript(path: string): HTMLScriptElement {
        let script_obj: HTMLScriptElement = document.createElement("script");
        script_obj.src = path;
        return script_obj;
    }

    static main(): void {
        document.head.appendChild(Meta.createScript("src/directory.js"));
        document.head.appendChild(Meta.createScript("src/machine.js"));
        document.head.appendChild(Meta.createScript("src/shell_output_fragment.js"));
        document.head.appendChild(Meta.createScript("src/shell_app.js"));
        document.head.appendChild(Meta.createScript("src/shell.js"));
        document.head.appendChild(Meta.createScript("src/shell_output_engine.js"));
    }
}

window.onload = function(){Meta.main()};