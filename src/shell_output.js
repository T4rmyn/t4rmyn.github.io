var Safeness;
(function (Safeness) {
    Safeness[Safeness["Safe"] = 0] = "Safe";
    Safeness[Safeness["Unsafe"] = 1] = "Unsafe";
})(Safeness || (Safeness = {}));
var ShellOutput = /** @class */ (function () {
    function ShellOutput(type, content) {
        this.type = type;
        this.content = content;
    }
    ShellOutput.prototype.get_type = function () {
        return this.type;
    };
    ShellOutput.prototype.get_content = function () {
        return this.content;
    };
    return ShellOutput;
}());
