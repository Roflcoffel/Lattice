
class WaniKaniAPI {
    APIKey: string;
    URL: string;
    Revision: string;

    constructor(APIKey: string) {
        this.APIKey = APIKey;
        this.URL = "https://api.wanikani.com/v2/";
        this.Revision = "20170710";
    }

    Request(path: string, filters: string) : Request {
        return new Request(this.URL + path + "?" + filters, {
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

    async GetAllSubjects(filter: string) : Promise<any> {
        const response = await fetch(this.Request("subjects", filter));
        return await response.json();
    }
}