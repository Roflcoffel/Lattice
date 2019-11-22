"use strict";
var charType;
(function (charType) {
    charType["NULL"] = "null";
    charType["RADICAL"] = "radical";
    charType["KANJI"] = "kanji";
    charType["VOCABULARY"] = "vocabulary";
})(charType || (charType = {}));
class Character {
    constructor(level, character, burned, type) {
        this.level = level;
        this.character = character;
        this.burned = burned;
        this.type = type;
    }
}
