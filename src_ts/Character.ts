
enum ReadType {
    NULL="null", RADICAL="radical", KANJI="kanji", VOCABULARY="vocabulary"
}

class Character {
    Level: number;               //The level this character appears in.
    Reading: string | null;      //The reading is a kanji, hiragana, or can be null.
    Burned: boolean;             //Has the character been burned.
    Type:  ReadType;             //What kind of character is it: Radical, Kanji, Vocab or null.
    Image: Array<ImageUrl>       //An image for radicals that do not have a utf-8 representation.

    constructor(Level: number, Reading: string, Burned: boolean, Type: ReadType, Image: Array<ImageUrl>) {
       this.Level = Level;
       this.Reading = Reading;
       this.Burned = Burned;
       this.Type = Type;
       this.Image = Image;
    }
}
