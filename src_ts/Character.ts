
enum charType {
    NULL="null", RADICAL="radical", KANJI="kanji", VOCABULARY="vocabulary"
}

class Character {
    level: number;               //The level this character appears in. <Subject>
    character: string | null;    //The reading is a kanji, hiragana, or can be null. <Subject>
    burned: boolean;             //Has the character been burned. <Assignment>
    type: charType;              //What kind of character is it: Radical, Kanji, Vocab or null. <Header>

    constructor(level: number, character: string | null, burned: boolean, type: charType) {
       this.level = level;
       this.character = character;
       this.burned = burned;
       this.type = type;
    }
}