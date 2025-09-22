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
var Help = /** @class */ (function (_super) {
    __extends(Help, _super);
    function Help() {
        return _super.call(this, "help") || this;
    }
    Help.prototype.handle_query = function (query) {
        var keywords = Array.from(Shell.get_instance().get_keywords().keys()).sort();
        var final_output = [];
        final_output.push(new ShellOutputFragment(Safeness.Safe, "Available Commands:<br>"));
        for (var i = 0; i < keywords.length; i++) {
            final_output.push(new ShellOutputFragment(Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new ShellOutputFragment(Safeness.Unsafe, keywords[i]));
            if (Manual.mannable(keywords[i])) {
                final_output.push(new ShellOutputFragment(Safeness.Safe, " </i></b><span style=\"color: #d79921\">(has manpage)</span><br>"));
            }
            else {
                final_output.push(new ShellOutputFragment(Safeness.Safe, "</i></b><br>"));
            }
        }
        return final_output;
    };
    return Help;
}(ShellApp));
var Bio = /** @class */ (function (_super) {
    __extends(Bio, _super);
    function Bio() {
        return _super.call(this, "bio") || this;
    }
    Bio.prototype.handle_query = function (query) {
        return [new ShellOutputFragment(Safeness.Safe, "\n                Hi, the name's Tarmyn!\n                I'm an artist, programmer, and game developer.\n                Some things I like include Linux, Godot, and Progressive Metal/Djent!\n            ")];
    };
    Bio.prototype.get_man_entry = function () {
        return "<b><i>bio</b></i>: Personal short bio of myself.";
    };
    return Bio;
}(ShellApp));
var PrintWorkingDirectory = /** @class */ (function (_super) {
    __extends(PrintWorkingDirectory, _super);
    function PrintWorkingDirectory() {
        return _super.call(this, "pwd") || this;
    }
    PrintWorkingDirectory.prototype.handle_query = function (query) {
        return [new ShellOutputFragment(Safeness.Safe, "pwd: Current working directory is <b><i>" +
                Shell.get_instance().get_working_directory().find_absolute_path() +
                "</i></b>")];
    };
    return PrintWorkingDirectory;
}(ShellApp));
var ChangeDirectory = /** @class */ (function (_super) {
    __extends(ChangeDirectory, _super);
    function ChangeDirectory() {
        return _super.call(this, "cd") || this;
    }
    ChangeDirectory.prototype.handle_query = function (query) {
        if (query == "..") {
            var parent_1 = Shell.get_instance().get_working_directory().get_parent();
            if (parent_1 == null) {
                return [
                    new ShellOutputFragment(Safeness.Safe, "cd: <b><i>"),
                    new ShellOutputFragment(Safeness.Unsafe, query),
                    new ShellOutputFragment(Safeness.Safe, "</i></b> unsuccessful, already at root."),
                ];
            }
            else {
                Shell.get_instance().set_working_directory(parent_1);
                return [
                    new ShellOutputFragment(Safeness.Safe, "cd: <b><i>"),
                    new ShellOutputFragment(Safeness.Unsafe, query),
                    new ShellOutputFragment(Safeness.Safe, "</i></b> successful."),
                ];
            }
        }
        var child = Shell.get_instance().get_working_directory().find_child(query);
        if (child != null) {
            if (child instanceof DirectoryPath) {
                Shell.get_instance().set_working_directory(child);
                return [
                    new ShellOutputFragment(Safeness.Safe, "cd: <b><i>"),
                    new ShellOutputFragment(Safeness.Unsafe, query),
                    new ShellOutputFragment(Safeness.Safe, "</i></b> successful."),
                ];
            }
            else {
                return [
                    new ShellOutputFragment(Safeness.Safe, "cd: <b><i>"),
                    new ShellOutputFragment(Safeness.Unsafe, query),
                    new ShellOutputFragment(Safeness.Safe, "</i></b> is not a directory."),
                ];
            }
        }
        else {
            return [
                new ShellOutputFragment(Safeness.Safe, "cd: Directory <b><i>"),
                new ShellOutputFragment(Safeness.Unsafe, query),
                new ShellOutputFragment(Safeness.Safe, "</i></b> not found."),
            ];
        }
    };
    return ChangeDirectory;
}(ShellApp));
var ListObjectPaths = /** @class */ (function (_super) {
    __extends(ListObjectPaths, _super);
    function ListObjectPaths() {
        return _super.call(this, "ls") || this;
    }
    ListObjectPaths.prototype.handle_query = function (query) {
        return [new ShellOutputFragment(Safeness.Safe, function () {
                var fin_string = "";
                var list = Shell.get_instance().get_working_directory().get_children();
                list.forEach(function (x) {
                    if (x instanceof DirectoryPath) {
                        fin_string = fin_string.concat("<b>", x.get_name(), "</b> ");
                    }
                    else {
                        fin_string = fin_string.concat(x.get_name(), " ");
                    }
                });
                return fin_string;
            }())];
    };
    return ListObjectPaths;
}(ShellApp));
var PrintFileContent = /** @class */ (function (_super) {
    __extends(PrintFileContent, _super);
    function PrintFileContent() {
        return _super.call(this, "cat") || this;
    }
    PrintFileContent.prototype.handle_query = function (query) {
        var child = Shell.get_instance().get_working_directory().find_child(query);
        if (child != null) {
            if (child instanceof FilePath) {
                return [
                    new ShellOutputFragment(Safeness.Unsafe, child.get_contents()),
                ];
            }
            else {
                return [
                    new ShellOutputFragment(Safeness.Safe, "cd: <b><i>"),
                    new ShellOutputFragment(Safeness.Unsafe, query),
                    new ShellOutputFragment(Safeness.Safe, "</i></b> is not a file."),
                ];
            }
        }
        else {
            return [
                new ShellOutputFragment(Safeness.Safe, "cat: File <b><i>"),
                new ShellOutputFragment(Safeness.Unsafe, query),
                new ShellOutputFragment(Safeness.Safe, "</i></b> not found."),
            ];
        }
    };
    return PrintFileContent;
}(ShellApp));
var Links = /** @class */ (function (_super) {
    __extends(Links, _super);
    function Links() {
        return _super.call(this, "links") || this;
    }
    Links.prototype.handle_query = function (query) {
        return [new ShellOutputFragment(Safeness.Safe, "\n                My Links:<br>\n                &nbsp;&nbsp;- <b><i><a href=\"https://bsky.app/profile/t4rmyn.bsky.social\" target=\"_blank\" class=\"link\">Bluesky</a></i></b><br>\n                &nbsp;&nbsp;- <b><i><a href=\"https://t4rmyn.itch.io/\" target=\"_blank\" class=\"link\">itch.io</a></i></b><br>\n            ")];
    };
    return Links;
}(ShellApp));
var CmdHistory = /** @class */ (function (_super) {
    __extends(CmdHistory, _super);
    function CmdHistory() {
        return _super.call(this, "history") || this;
    }
    CmdHistory.prototype.handle_query = function (query) {
        var final_output = [];
        final_output.push(new ShellOutputFragment(Safeness.Safe, "History:<br>"));
        var query_history = ShellOutputEngine.get_instance().get_query_history();
        for (var i = 0; i < query_history.length; i++) {
            final_output.push(new ShellOutputFragment(Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new ShellOutputFragment(Safeness.Unsafe, query_history[i]));
            final_output.push(new ShellOutputFragment(Safeness.Safe, "</i></b><br>"));
        }
        return final_output;
    };
    return CmdHistory;
}(ShellApp));
var Fortune = /** @class */ (function (_super) {
    __extends(Fortune, _super);
    function Fortune() {
        var _this = _super.call(this, "fortune") || this;
        _this.quotes = [
            "The machines are turning me!<br> &nbsp&nbsp- <b>Periphery, Wax Wings</b>",
            "So many reasons why one should never entertain the taste of Scarlet.<br> &nbsp&nbsp- <b>Periphery, Scarlet</b>",
            "Chase the obscene, travel these wonders far beyond!<br> &nbsp&nbsp- <b>Periphery, Froggin' Bullfish</b>",
            "Will we ever live in honesty?<br> &nbsp&nbsp- <b>Periphery, Dracul Gras</b>",
            "The night belongs to you.<br> &nbsp&nbsp- <b>Sleep Token, Euclid</b>",
            "I'm coiled up like a venomous serpent.<br> &nbsp&nbsp- <b>Sleep Token, Rain</b>",
            "I'm still your favourite regret, you're still my weapon of choosing.<br> &nbsp&nbsp- <b>Sleep Token, Blood Sport</b>",
            "It seems that even in Arcadia you walk beside me still.<br> &nbsp&nbsp- <b>Sleep Token, Even in Arcadia</b>",
            "One, one less, one less life, one less life for us to live.<br> &nbsp&nbsp- <b>Haken, Invasion</b>",
            "When did we give up the ghost as a trade for a heart that begins to break?<br> &nbsp&nbsp- <b>Haken, Invasion</b>",
            "You turned your back on Affinity.<br> &nbsp&nbsp- <b>Haken, The Architect</b>",
            "We'll make this dream last forever and ever.<br> &nbsp&nbsp- <b>Haken, The Architect</b>",
            "A chameleon hides behind Orwellian eyes.<br> &nbsp&nbsp- <b>Haken, The Architect</b>",
            "Cast the die, lose control.<br> &nbsp&nbsp- <b>Haken, 1985</b>",
            "Fill my eyes with blur.<br> &nbsp&nbsp- <b>TesseracT, Legion</b>",
            "The words that I whispered when it all began, did they shine a light on you?<br> &nbsp&nbsp- <b>TesseracT, War of Being</b>",
            "I can be guilty free, don't you see? In a world designed for you and me.<br> &nbsp&nbsp- <b>TesseracT, Legion</b>",
            "So my demons, your time has come.<br> &nbsp&nbsp- <b>TesseracT, Concealing Fate - Part 2: Deception</b>",
        ];
        return _this;
    }
    Fortune.prototype.handle_query = function (query) {
        return [new ShellOutputFragment(Safeness.Safe, this.quotes[Math.floor(Math.random() * this.quotes.length)])];
    };
    Fortune.prototype.get_man_entry = function () {
        return "<b><i>fortune</b></i>: Fetch selected random quotes, inspired by the UNIX fortune command line utility of the same name.";
    };
    return Fortune;
}(ShellApp));
var Manual = /** @class */ (function (_super) {
    __extends(Manual, _super);
    function Manual() {
        return _super.call(this, "man") || this;
    }
    Manual.prototype.handle_query = function (query) {
        return [new ShellOutputFragment(Safeness.Safe, function (query) {
                if (Shell.get_instance().get_keywords().has(query)) {
                    var app = Shell.get_instance().get_keywords().get(query);
                    if ("get_man_entry" in app) {
                        return app.get_man_entry();
                    }
                    else {
                        return "man: <b><i>" + app.get_keyword() + "</i></b> has no man entry.";
                    }
                }
                else {
                    return "man: <b><i>" + query + "</i></b> is not a recognized command.";
                }
            }(query))];
    };
    Manual.mannable = function (query) {
        if (Shell.get_instance().get_keywords().has(query)) {
            var app = Shell.get_instance().get_keywords().get(query);
            if ("get_man_entry" in app) {
                return true;
            }
        }
        return false;
    };
    return Manual;
}(ShellApp));
//# sourceMappingURL=shell_app.js.map