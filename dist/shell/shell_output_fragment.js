export var Safeness;
(function (Safeness) {
    Safeness[Safeness["Safe"] = 0] = "Safe";
    Safeness[Safeness["Unsafe"] = 1] = "Unsafe";
})(Safeness || (Safeness = {}));
var ShellOutputFragment = /** @class */ (function () {
    function ShellOutputFragment(type, content) {
        this.type = type;
        this.content = content;
    }
    ShellOutputFragment.empty = function () {
        return new ShellOutputFragment(Safeness.Safe, "");
    };
    ShellOutputFragment.prototype.get_type = function () {
        return this.type;
    };
    ShellOutputFragment.prototype.get_content = function () {
        return this.content;
    };
    return ShellOutputFragment;
}());
export { ShellOutputFragment };
//# sourceMappingURL=shell_output_fragment.js.map