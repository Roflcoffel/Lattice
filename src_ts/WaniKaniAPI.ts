
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

    async GetAllSubjects(new_url: string = "subjects", filter: string = "") : Promise<any> {
        const response = await fetch(this.Request(new_url, filter));
        return await response.json();
    }

    async GetUser() : Promise<any> {
        const response = await fetch(this.Request("user", ""));
        return await response.json();
    }

    MapCharacter(jsonData : any) : Array<Character> {
        let data = new Array<any>();
        let imgData = new Array<any>();

        let level = new Array<Character>();

        data = jsonData;

        data.forEach(cha => {
            let images = new Array<ImageUrl>();

            if(cha.data.character_images != null) {
                imgData = cha.data.character_images
                imgData.forEach(prop => {
                    images.push(new ImageUrl(
                        prop.content_type,
                        prop.metadata,
                        prop.url
                    ));
                });
            }

            level.push(new Character(
                cha.data.level, 
                cha.data.characters, 
                false, 
                cha.object, //contains the type
                images
            ));
        });
        
        //console.log(data);
        console.log(level);

        return level;
    }

    MapUser(jsonData : any) : User {
        return new User(jsonData.level, jsonData.username )
    }
}