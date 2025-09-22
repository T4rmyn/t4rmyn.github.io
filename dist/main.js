var Meta = /** @class */ (function () {
    function Meta() {
    }
    Meta.createScript = function (path) {
        var script_obj = document.createElement("script");
        script_obj.src = path;
        return script_obj;
    };
    Meta.main = function () {
        document.head.appendChild(Meta.createScript("src/directory.js"));
        document.head.appendChild(Meta.createScript("src/machine.js"));
        document.head.appendChild(Meta.createScript("src/shell_output_fragment.js"));
        document.head.appendChild(Meta.createScript("src/shell_app.js"));
        document.head.appendChild(Meta.createScript("src/shell.js"));
        document.head.appendChild(Meta.createScript("src/shell_output_engine.js"));
    };
    return Meta;
}());
window.onload = function () { Meta.main(); };
//# sourceMappingURL=main.js.map