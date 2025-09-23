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
import { ShellApp } from "../shell_app.js";
import * as shell from "../../shell/index.js";
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
        return [new shell.ShellOutputFragment(shell.Safeness.Safe, this.quotes[Math.floor(Math.random() * this.quotes.length)])];
    };
    Fortune.prototype.get_man_entry = function () {
        return "<b><i>fortune</b></i>: Fetch selected random quotes, inspired by the UNIX fortune command line utility of the same name.";
    };
    return Fortune;
}(ShellApp));
export { Fortune };
//# sourceMappingURL=fortune.js.map