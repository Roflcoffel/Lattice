
class WaniKaniAPI {
    APIKey: string;
    URL: string;
    Revision: string;

    constructor(APIKey: string) {
        this.APIKey = APIKey;
        this.URL = "https://api.wanikani.com/v2/";
        this.Revision = "20170710";
    }

    private Request(url: string, filters: string) : Request {
        return new Request(url + "?" + filters, {
            method: 'GET',
            headers: new Headers({
                'Wanikani-Revision': this.Revision,
                Authorization: 'Bearer ' + this.APIKey
            })
        });
    }

    async GetAllAssignments() : Promise<any> {
        const response = await fetch(this.Request("assignments", ""));
        return await response.json();
    }

    private async GetAllSubjectHeaders(filter: string = "levels=1", new_url: string = this.URL + "subjects") : Promise<Header[]> {
        const response = await fetch(this.Request(new_url, filter));
        const result = await response.json();

        const pages : Page = result.pages;
        const data : Array<Header> = result.data;

        console.log("Next Url: " + pages.next_url);

        if(pages.next_url != null) {
            return data.concat(await this.GetAllSubjectHeaders("", pages.next_url))
        }
        else {
            return data;
        }
    }

    async GetAllSubjects(filter: string = "levels=1") : Promise<Subject[]> {
        const headers : Array<Header> = await this.GetAllSubjectHeaders(filter);
        return headers.map(header => header.data);
    }

    async GetAllCharacters(filter: string = "levels=1") : Promise<Character[]> {
        const headers : Array<Header> = await this.GetAllSubjectHeaders(filter);
        return headers.map(header => new Character(header.data.level, header.data.characters, false, header.object));
    }

    async GetUser(filter: string = "") : Promise<User> {
        const response = await fetch(this.Request(this.URL + "user", filter));
        return await response.json().then(response => new User(response.data.level, response.data.username, new Date(response.data_updated_at)));
    }
}