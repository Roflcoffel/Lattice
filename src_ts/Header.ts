class Header {
    data : Subject;
    data_updated_at : string;
    id : number;
    object : charType;
    url : string;

    constructor(data : Subject, data_updated_at : string, id : number, object : charType, url : string) {
        this.data = data;
        this.data_updated_at = data_updated_at;
        this.id = id;
        this.object = object;
        this.url = url;
    }
}