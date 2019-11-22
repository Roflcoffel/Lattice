class User {
    level : string;
    username : string;
    updated_at : Date;

    constructor(level : string, username: string, updated_at : Date) {
        this.level = level;
        this.username = username;
        this.updated_at = updated_at;
    }
}