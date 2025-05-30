var Help = /** @class */ (function () {
    function Help() {
        this.keyword = "help";
    }
    Help.prototype.get_keyword = function () {
        return this.keyword;
    };
    Help.prototype.handle_query = function (query) {
        var keywords = Array.from(Shell.get_instance().get_keywords().keys()).sort();
        var final_string = "Available Commands:<br>";
        for (var i = 0; i < keywords.length; i++) {
            final_string = final_string.concat("&nbsp;&nbsp;- <b><i>", keywords[i], "</i></b><br>");
        }
        return final_string;
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
        return "\n        Hi, the name's Tarmyn!\n        I'm an artist, programmer, and game developer.\n        Some things I like include Linux, Pokemon Mystery Dungeon, and progressive metal!\n        ";
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
        return Shell.get_instance().get_wd().concat(" (...I'll someday implement a full fledge filesystem here, but for now enjoy this tilde.)");
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
        return "\n        My Links:<br>\n        &nbsp;&nbsp;- <a href=\"https://bsky.app/profile/t4rmyn.bsky.social\" target=\"_blank\" class=\"link\">Bluesky</a><br>\n        &nbsp;&nbsp;- <a href=\"https://t4rmyn.itch.io/\" target=\"_blank\" class=\"link\">itch.io</a><br>\n        ";
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
        var final_string = "History:<br>";
        var query_history = ShellString.get_instance().get_query_history();
        console.log(query_history);
        for (var i = 0; i < query_history.length; i++) {
            final_string = final_string.concat("&nbsp;&nbsp;- ", query_history[i]);
        }
        return final_string;
    };
    return CmdHistory;
}());
