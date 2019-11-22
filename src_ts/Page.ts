
class Page {
    next_url : string | null;
    per_page : number;
    previous_url : string | null;

    constructor(next_url : string | null, per_page : number, previous_url : string | null) {
        this.next_url = next_url;
        this.per_page = per_page;
        this.previous_url = previous_url;
    }
}