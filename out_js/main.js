"use strict";
//main.js; starts on site load.
//Asks for the API Key.
//Creates instances of all the other objects.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Todo
//with the id and the slug, it should be possible to get the white image.
//Api command to get all burned characters:
//https://api.wanikani.com/v2/assignments?levels=1,60&subject_types=kanji&burned=true
//https://api.wanikani.com/v2/assignments?levels=1,60&subject_types=radical&burned=true
//https://api.wanikani.com/v2/assignments?levels=1,60&subject_types=vocabulary&burned=true
//https://api.wanikani.com/v2/assignments?burned=true
//user is only one object so can be stored in session.
//request all subjects not just to user level, and store them!!
//then manually filter the list, based on the level.
//update_after filter?
const API_KEY = "904c890a-3bd6-4443-9d0a-e33d43cb6179";
$(document).ready(function () {
    let WK = new WaniKaniAPI(API_KEY);
    let user;
    let levels = new Array();
    let filter = new Array();
    (() => __awaiter(this, void 0, void 0, function* () {
        //StorageHandler.ClearAll();
        user = StorageHandler.Retrieve("user", "session");
        levels = StorageHandler.Retrieve("characters");
        if (StorageHandler.isEmpty("user", "session")) {
            user = yield WK.GetUser();
            StorageHandler.Store("user", user, "session");
        }
        if (StorageHandler.isEmpty("characters")) {
            filter = [...Array(user.level + 1).keys()].slice(1);
            levels = yield WK.GetAllCharacters("levels=" + filter);
            StorageHandler.Store("characters", levels);
        }
        console.log(levels);
        //Draw Lattice
        DrawHeader(user, levels.length);
        DrawLattice(levels);
    }))();
});
function DrawHeader(user, count) {
    $(".lattice-header")
        .append("<p>Here is <b>" + user.username + "</b> current progress<br /></p>")
        .append("<p>Current level is <b>" + user.level + "!</b><br /></p>")
        .append("<p>A total of <b>" + count + "</b> characters learned</p>");
}
function DrawLattice(characters) {
    $(".container").append("<div class='row character'></div>");
    characters.forEach(char => {
        let htmlChar;
        switch (char.type) {
            case charType.RADICAL:
                if (char.character == null) {
                    htmlChar = "<img src='" + char.img + "' class='radical-img-highlight'>";
                    break;
                }
                htmlChar = "<h4 class='radical-highlight'>" + char.character + "</h4>";
                break;
            case charType.KANJI:
                htmlChar = "<h4 class='kanji-highlight'>" + char.character + "</h4>";
                break;
            case charType.VOCABULARY:
                htmlChar = "<h4 class='vocabulary-highlight'>" + char.character + "</h4>";
                break;
            default:
                console.log("NULL TYPE");
                htmlChar = "<h4 class='radical-highlight'>" + char.character + "</h4>";
                break;
        }
        $(".character").append(htmlChar);
    });
}
//badge badge-primary, Blp
