class Subject {
    auxiliary_meanings : Array<any>;
    characters : string | null;
    created_at : Date;
    document_url : string;
    hidden_at : Date;
    lesson_position : number;
    level : number;
    meaning_mnemonic : string;
    meanings : Array<any>;
    slug : string;

    constructor(auxiliary_meanings : Array<any>, characters : string, created_at : Date, document_url : string, hidden_at : Date, lesson_position : number, level : number, meaning_mnemonic : string, meanings : Array<any>, slug : string) {
        this.auxiliary_meanings = auxiliary_meanings;
        this.characters = characters;
        this.created_at = created_at;
        this.document_url = document_url;
        this.hidden_at = hidden_at;
        this.lesson_position = lesson_position;
        this.level = level;
        this.meaning_mnemonic = meaning_mnemonic;
        this.meanings = meanings;
        this.slug = slug;
    }
}

