var ShellString = /** @class */ (function () {
    function ShellString(working_directory, query) {
        this.query_id = 1;
        this.query = query;
        this.query_history = new Array();
    }
    ShellString.get_instance = function () {
        if (!ShellString.instance) {
            ShellString.instance = new ShellString("~", "");
        }
        return ShellString.instance;
    };
    ShellString.prototype.get_query_history = function () {
        return this.query_history;
    };
    ShellString.prototype.add_char_query = function (char) {
        this.query = this.query.concat(char.toString());
    };
    ShellString.prototype.remove_char_query = function () {
        this.query = this.query.substring(0, this.query.length - 1);
    };
    ShellString.prototype.update_shell = function () {
        var text = document.getElementById("main".concat(this.query_id.toString()));
        console.log(text);
        if (text !== null) {
            text.innerHTML = "t4rmyn@arkane:".concat(Shell.get_instance().get_wd().toString(), "> ", "<span style=\"color: #ebdbb2\"> ");
            text.innerText = text.innerText.concat(" ", this.query.toString());
            text.innerHTML = text.innerHTML.concat("█</span>");
        }
    };
    ShellString.prototype.update_ticker = function () {
        var ticker = document.getElementById("t".concat(this.query_id.toString()));
        ticker.innerHTML = "[".concat(this.query_id.toString(), "]");
    };
    ShellString.prototype.freeze_shell = function () {
        var text = document.getElementById("main".concat(this.query_id.toString()));
        if (text !== null) {
            text.innerHTML = "t4rmyn@arkane:".concat(Shell.get_instance().get_wd().toString(), "> ", "<span style=\"color: #ebdbb2\">");
            text.innerText = text.innerText.concat(" ", this.query.toString());
            text.innerHTML = text.innerHTML.concat("</span>");
        }
    };
    ShellString.prototype.submit_query = function () {
        var old_l_section_box = document.getElementById("ls".concat((this.query_id).toString()));
        this.freeze_shell();
        this.query_id += 1;
        var parent_div = document.getElementById("terminal-box");
        var new_section_box = document.createElement("div");
        new_section_box.classList.add("upper-section-box");
        new_section_box.id = "us".concat(this.query_id.toString());
        var new_ticker = document.createElement("p");
        new_ticker.classList.add("ticker");
        new_ticker.id = "t".concat(this.query_id.toString());
        var new_l_section_box = document.createElement("div");
        new_l_section_box.classList.add("lower-section-box");
        new_l_section_box.id = "ls".concat(this.query_id.toString());
        new_section_box.appendChild(new_ticker);
        new_section_box.appendChild(new_l_section_box);
        var new_obj = document.createElement("p");
        new_obj.classList.add("terminal-response");
        this.query_history.push(this.query.toString());
        console.log(this.query_history);
        var output_text = Shell.get_instance().submit_query(this.query.toString());
        if (output_text.startsWith("!!!")) {
            new_obj.innerHTML = "Command: <b><i>";
            new_obj.innerText = new_obj.innerText.concat(output_text.slice(3));
            new_obj.innerHTML = new_obj.innerHTML.concat("</i></b> not recognized.");
        }
        else {
            new_obj.innerHTML = output_text;
        }
        var new_query = document.createElement("p");
        new_query.classList.add("terminal-query");
        new_query.id = String("main").concat(this.query_id.toString());
        old_l_section_box.appendChild(new_obj);
        new_l_section_box.appendChild(new_query);
        new_section_box.appendChild(new_l_section_box);
        parent_div.appendChild(new_section_box);
        this.query = "";
        this.update_ticker();
    };
    return ShellString;
}());
document.addEventListener('keydown', function (event) {
    if (String(event.key).length === 1) {
        ShellString.get_instance().add_char_query(event.key);
    }
    else {
        switch (event.key) {
            case "Backspace":
                ShellString.get_instance().remove_char_query();
                break;
            case "Enter":
                ShellString.get_instance().submit_query();
                break;
            default:
                break;
        }
    }
    ShellString.get_instance().update_shell();
});
