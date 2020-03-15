//main.js; starts on site load.
//Asks for the API Key.
//Creates instances of all the other objects.

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

interface Table {
    [key: string] : Array<Character>;
}

$(document).ready(function () {
    
    let WK = new WaniKaniAPI(API_KEY);

    let user : User;
    let levels = new Array<Character>();
    let filter = new Array<number>();

    let backup_levels : Table;

    (async () => {
        //StorageHandler.ClearAll();

        user = StorageHandler.Retrieve("user", "session");
        levels = StorageHandler.Retrieve("characters");
        backup_levels = StorageHandler.Retrieve("backup_chars");

        if(StorageHandler.isEmpty("user", "session")) {
            user = await WK.GetUser();
            StorageHandler.Store("user", user, "session");
        }
         
        if(StorageHandler.isEmpty("characters")) {
            filter = [...Array(user.level+1).keys()].slice(1);
            levels = await WK.GetAllCharacters("levels=" + filter);
            StorageHandler.Store("characters", levels);
        }

        if(StorageHandler.isEmpty("backup_chars")) {
            backup_levels = {
                "radical": levels.filter(char => char.type == charType.RADICAL),
                "kanji": levels.filter(char => char.type == charType.KANJI),
                "vocabulary": levels.filter(char => char.type == charType.VOCABULARY)
            }
            StorageHandler.Store("backup_chars", backup_levels);
        }

        //See if there are any radicals from the latest level,
        //if we do not find any, this means we need to do a new GetAllCharacters call.
        console.log((backup_levels["radical"].find(char => char.level.toString() == user.level) != undefined));

        //Draw Lattice
        DrawHeader(user, levels.length);
        DrawLattice(levels);

    })();

    $('input[type=checkbox]').change(function(){
        let type : charType = ($(this).parent().text().trim().toLocaleLowerCase() as charType);
        levels = $(this).is(':checked') ? levels.concat(backup_levels[type.toString()]) : levels.filter(char => char.type != type);
        ClearLattice();
        DrawLattice(levels);
    });
});

function DrawHeader(user : User, count : number) : void {
    $(".lattice-header")
        .append("<p>Here is <b>" + user.username + "</b> current progress<br /></p>")
        .append("<p>Current level is <b>" + user.level + "!</b><br /></p>")
        .append("<p>A total of <b>" + count + "</b> characters learned</p>");
}

function DrawLattice(characters : Array<Character>) : void {
    $(".main").append("<div class='row character'></div>");

    characters.forEach(char => {
        let htmlChar;

        switch(char.type) {
            case charType.RADICAL:
                if(char.character == null) {
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
                console.log("NULL TYPE")
                htmlChar = "<h4 class='radical-highlight'>" + char.character + "</h4>";
                break;
        }
        
        $(".character").append(htmlChar);
    });
}

function ClearLattice() : void {
    $(".character").remove();
}
//badge badge-primary, Blp