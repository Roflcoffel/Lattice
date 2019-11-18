class ImageUrl {
    ContentType: string;
    Metadata: Array<Object>;
    Url: string; 

    constructor(ContentType: string, Metadata: Array<Object>, Url: string) {
        this.ContentType = ContentType;
        this.Metadata = Metadata;
        this.Url = Url;
    }
}