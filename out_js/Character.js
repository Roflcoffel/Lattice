"use strict";
var ReadType;
(function (ReadType) {
    ReadType["NULL"] = "null";
    ReadType["RADICAL"] = "radical";
    ReadType["KANJI"] = "kanji";
    ReadType["VOCABULARY"] = "vocabulary";
})(ReadType || (ReadType = {}));
class Character {
    constructor(Level, Reading, Burned, Type, Image) {
        this.Level = Level;
        this.Reading = Reading;
        this.Burned = Burned;
        this.Type = Type;
        this.Image = Image;
    }
}
