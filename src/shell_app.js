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
        final_output.push(new ShellOutput(Safeness.Safe, "Available Commands:<br>"));
        for (var i = 0; i < keywords.length; i++) {
            final_output.push(new ShellOutput(Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new ShellOutput(Safeness.Unsafe, keywords[i]));
            final_output.push(new ShellOutput(Safeness.Safe, "</i></b><br>"));
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
        return [new ShellOutput(Safeness.Safe, "\n                Hi, the name's Tarmyn!\n                I'm an artist, programmer, and game developer.\n                Some things I like include Linux, Pokemon Mystery Dungeon, and progressive metal!\n            ")];
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
        return [new ShellOutput(Safeness.Safe, Shell.get_instance().get_wd().concat(" \n                (...I'll someday implement a full fledge filesystem here, \n                but for now enjoy this tilde.)\n            "))];
    };
    return PrintWorkingDirectory;
}());
var Links = /** @class */ (function () {
    function Links() {
        this.keyword = "links";
    }
    Links.prototype.get_keyword = function () {
        return this.keyword;
    };
    Links.prototype.handle_query = function (query) {
        return [new ShellOutput(Safeness.Safe, "\n            My Links:<br>\n            &nbsp;&nbsp;- <a href=\"https://bsky.app/profile/t4rmyn.bsky.social\" target=\"_blank\" class=\"link\">Bluesky</a><br>\n            &nbsp;&nbsp;- <a href=\"https://t4rmyn.itch.io/\" target=\"_blank\" class=\"link\">itch.io</a><br>\n            ")];
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
        final_output.push(new ShellOutput(Safeness.Safe, "History:<br>"));
        var query_history = ShellString.get_instance().get_query_history();
        for (var i = 0; i < query_history.length; i++) {
            final_output.push(new ShellOutput(Safeness.Safe, "&nbsp;&nbsp;- <b><i>"));
            final_output.push(new ShellOutput(Safeness.Unsafe, query_history[i]));
            final_output.push(new ShellOutput(Safeness.Safe, "</i></b><br>"));
        }
        return final_output;
    };
    return CmdHistory;
}());
