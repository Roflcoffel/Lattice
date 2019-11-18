"use strict";
//main.js; starts on site load.
//Asks for the API Key.
//Creates instances of all the other objects.
//Todo
//Remove ImageUrl class, and add id and slug to character
//with the id and the slug, it should be possible to get the white image.
//Add a level class and move some code out from main.
//Api command to get all burned characters:
//https://api.wanikani.com/v2/assignments?levels=1,60&subject_types=kanji&burned=true
//https://api.wanikani.com/v2/assignments?levels=1,60&subject_types=radical&burned=true
//https://api.wanikani.com/v2/assignments?levels=1,60&subject_types=vocabulary&burned=true
//Tiita på denna för att kunna hämta alla pages.
//https://dev.to/nirmal_kumar/retrieve-entire-data-from-paginated-api-recursively-3pl4
//Local Storage
//https://www.w3schools.com/html/html5_webstorage.asp
const API_KEY = "904c890a-3bd6-4443-9d0a-e33d43cb6179";
$(document).ready(function () {
    let WK = new WaniKaniAPI(API_KEY);
    let user;
    let levels = new Array();
    WK.GetAllSubjects().then(response => {
        levels = WK.MapCharacter(response.data);
        DrawLattice(levels);
    });
    WK.GetUser().then(response => {
        user = WK.MapUser(response.data);
        DrawHeader(user);
    });
});
function DrawHeader(user) {
    $(".lattice-header")
        .append("<p>here is <b>" + user.Username + "</b> current progress</p>")
        .append("<p>current level is <b>" + user.Level + "!</b></p>");
}
function DrawLattice(characters) {
    $(".container").append("<div class='row character'></div>");
    characters.forEach(char => {
        //console.log(char.Reading);
        let htmlChar;
        switch (char.Type) {
            case ReadType.RADICAL:
                if (char.Reading == null) {
                    console.log(char.Image);
                    htmlChar = "<img src='" + char.Image[8].Url + "' class='radical-img-highlight'>";
                    break;
                }
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
