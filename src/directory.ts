abstract class ObjectPath {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    get_name(): string {
        return this.name;
    }
}

class FilePath extends ObjectPath {
    contents: string;

    constructor(name: string, contents: string) {
        super(name);
        this.contents = contents;
    }

    get_contents(): string {
        return this.contents;
    }
}

class DirectoryPath extends ObjectPath {
    children: ObjectPath[];
    parent: DirectoryPath | null;

    constructor(name: string, parent: DirectoryPath) {
        super(name);
        this.children = new Array<ObjectPath>();
        this.parent = parent;
    }

    get_children(): ObjectPath[] {
        return this.children;
    }

    get_parent(): DirectoryPath | null {
        return this.parent;
    }

    find_child(query_name: string): ObjectPath | null {
        return function(dir: DirectoryPath, query_name: string) {
            let result: ObjectPath | undefined = dir.get_children().find(
                (child: DirectoryPath) => child.get_name() == query_name
            );
            return result instanceof ObjectPath ? result : null;
        }(this, query_name);
    }

    find_absolute_path(): string {
        if (this.parent == null) {
            return "/";
        }
        let path: string = "";
        let dir: DirectoryPath = this;
        while (dir.parent != null) {
            path = "/" + dir.name + path;
            dir = dir.parent;
        }
        return path;
    }

    add_child(child: ObjectPath): ObjectPath {
        this.children.push(child);
        return child;
    }

    add_directory_child(child_name: string): DirectoryPath {
        let directory_obj: DirectoryPath = new DirectoryPath(child_name, this);
        this.children.push(directory_obj);
        return directory_obj;
    }

    add_file_child(child_name: string, contents: string): FilePath {
        let file_obj: FilePath = new FilePath(child_name, contents);
        this.children.push(file_obj);
        return file_obj;
    }
}