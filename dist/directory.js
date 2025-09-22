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
var ObjectPath = /** @class */ (function () {
    function ObjectPath(name) {
        this.name = name;
    }
    ObjectPath.prototype.get_name = function () {
        return this.name;
    };
    return ObjectPath;
}());
var FilePath = /** @class */ (function (_super) {
    __extends(FilePath, _super);
    function FilePath(name, contents) {
        var _this = _super.call(this, name) || this;
        _this.contents = contents;
        return _this;
    }
    FilePath.prototype.get_contents = function () {
        return this.contents;
    };
    return FilePath;
}(ObjectPath));
var DirectoryPath = /** @class */ (function (_super) {
    __extends(DirectoryPath, _super);
    function DirectoryPath(name, parent) {
        var _this = _super.call(this, name) || this;
        _this.children = new Array();
        _this.parent = parent;
        return _this;
    }
    DirectoryPath.prototype.get_children = function () {
        return this.children;
    };
    DirectoryPath.prototype.get_parent = function () {
        return this.parent;
    };
    DirectoryPath.prototype.find_child = function (query_name) {
        return function (dir, query_name) {
            var result = dir.get_children().find(function (child) { return child.get_name() == query_name; });
            return result instanceof ObjectPath ? result : null;
        }(this, query_name);
    };
    DirectoryPath.prototype.find_absolute_path = function () {
        if (this.parent == null) {
            return "/";
        }
        var path = "";
        var dir = this;
        while (dir.parent != null) {
            path = "/" + dir.name + path;
            dir = dir.parent;
        }
        return path;
    };
    DirectoryPath.prototype.add_child = function (child) {
        this.children.push(child);
        return child;
    };
    DirectoryPath.prototype.add_directory_child = function (child_name) {
        var directory_obj = new DirectoryPath(child_name, this);
        this.children.push(directory_obj);
        return directory_obj;
    };
    DirectoryPath.prototype.add_file_child = function (child_name, contents) {
        var file_obj = new FilePath(child_name, contents);
        this.children.push(file_obj);
        return file_obj;
    };
    return DirectoryPath;
}(ObjectPath));
//# sourceMappingURL=directory.js.map