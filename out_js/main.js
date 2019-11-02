"use strict";
//main.js; starts on site load.
//Asks for the API Key.
//Creates instances of all the other objects.
const API_KEY = "904c890a-3bd6-4443-9d0a-e33d43cb6179";
$(document).ready(function () {
    let WK = new WaniKaniAPI(API_KEY);
    let data = new Array();
    let level_1 = new Array();
    WK.GetAllSubjects("levels=1").then(response => {
        data = response.data;
        console.log(data);
        data.forEach(rad => {
            level_1.push(new Character(rad.data.level, rad.data.characters, false, rad.object, //contains the type
            rad.data.character_images));
        });
        console.log(level_1);
        DrawLattice(level_1);
    }, fail => console.log(fail));
});
function DrawLattice(characters) {
    $(".container").append("<div class='row character'></div>");
    characters.forEach(char => {
        //console.log(char.Reading);
        var htmlChar;
        switch (char.Type) {
            case ReadType.RADICAL:
                htmlChar = "<h4 class='radical-highlight'>" + char.Reading + "</h4>";
                break;
            case ReadType.KANJI:
                htmlChar = "<h4 class='kanji-highlight'>" + char.Reading + "</h4>";
                break;
            case ReadType.VOCABULARY:
                htmlChar = "<h4 class='vocabulary-highlight'>" + char.Reading + "</h4>";
                break;
            default:
                console.log("NULL TYPE");
                htmlChar = "<h4 class='radical-highlight'>" + char.Reading + "</h4>";
                break;
        }
        $(".character").append(htmlChar);
    });
}
//badge badge-primary, Blå
