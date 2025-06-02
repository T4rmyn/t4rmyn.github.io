var Help = /** @class */ (function () {
    function Help() {
        this.keyword = "help";
    }
    Help.prototype.get_keyword = function () {
        return this.keyword;
    };
    Help.prototype.handle_query = function (query) {
        var keywords = Array.from(Shell.get_instance().get_keywords().keys()).sort();
        var final_output = [];
        final_output.push(new ShellOutputFragment(Safeness.Safe, "Available Commands:<br>"));
        for (var i = 0; i < keywords.length; i++) {
            final_output.push(new ShellOutputFragment(Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new ShellOutputFragment(Safeness.Unsafe, keywords[i]));
            final_output.push(new ShellOutputFragment(Safeness.Safe, "</i></b><br>"));
        }
        return final_output;
    };
    return Help;
}());
var Bio = /** @class */ (function () {
    function Bio() {
        this.keyword = "bio";
    }
    Bio.prototype.get_keyword = function () {
        return this.keyword;
    };
    Bio.prototype.handle_query = function (query) {
        return [new ShellOutputFragment(Safeness.Safe, "\n                Hi, the name's Tarmyn!\n                I'm an artist, programmer, and game developer.\n                Some things I like include Linux, Pokemon Mystery Dungeon, and progressive metal!\n            ")];
    };
    return Bio;
}());
var PrintWorkingDirectory = /** @class */ (function () {
    function PrintWorkingDirectory() {
        this.keyword = "pwd";
    }
    PrintWorkingDirectory.prototype.get_keyword = function () {
        return this.keyword;
    };
    PrintWorkingDirectory.prototype.handle_query = function (query) {
        return [new ShellOutputFragment(Safeness.Safe, Shell.get_instance().get_working_directory().get_name())];
    };
    return PrintWorkingDirectory;
}());
var ChangeDirectory = /** @class */ (function () {
    function ChangeDirectory() {
        this.keyword = "cd";
    }
    ChangeDirectory.prototype.get_keyword = function () {
        return this.keyword;
    };
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
}());
var ListObjectPaths = /** @class */ (function () {
    function ListObjectPaths() {
        this.keyword = "ls";
    }
    ListObjectPaths.prototype.get_keyword = function () {
        return this.keyword;
    };
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
}());
var PrintFileContent = /** @class */ (function () {
    function PrintFileContent() {
        this.keyword = "cat";
    }
    PrintFileContent.prototype.get_keyword = function () {
        return this.keyword;
    };
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
}());
var Links = /** @class */ (function () {
    function Links() {
        this.keyword = "links";
    }
    Links.prototype.get_keyword = function () {
        return this.keyword;
    };
    Links.prototype.handle_query = function (query) {
        return [new ShellOutputFragment(Safeness.Safe, "\n            My Links:<br>\n            &nbsp;&nbsp;- <b><i><a href=\"https://bsky.app/profile/t4rmyn.github.io\" target=\"_blank\" class=\"link\">Bluesky</a></i></b><br>\n            &nbsp;&nbsp;- <b><i><a href=\"https://t4rmyn.itch.io/\" target=\"_blank\" class=\"link\">itch.io</a></i></b><br>\n            ")];
    };
    return Links;
}());
var CmdHistory = /** @class */ (function () {
    function CmdHistory() {
        this.keyword = "history";
    }
    CmdHistory.prototype.get_keyword = function () {
        return this.keyword;
    };
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
}());
var Fortune = /** @class */ (function () {
    function Fortune() {
        this.keyword = "fortune";
        this.quotes = [
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
    }
    Fortune.prototype.get_keyword = function () {
        return this.keyword;
    };
    Fortune.prototype.handle_query = function (query) {
        return [new ShellOutputFragment(Safeness.Safe, this.quotes[Math.floor(Math.random() * this.quotes.length)])];
    };
    return Fortune;
}());
