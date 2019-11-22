
class StorageHandler {
    static Store(key : string, object : any) : void {
        console.log("Storing in storage");
        try {
            localStorage.setItem(key, JSON.stringify(object));    
        } catch (error) {
            console.log(error);
        }
    }

    static Retrieve(key : string) : any {
        console.log("Retrieving object with key: " + key);
        let json : string | null = localStorage.getItem(key);
        if(json != null)
            return JSON.parse(json);
        console.log("Tried to retrieve a null value!");
        return "null";
    }

    static Remove(key : string) : void {
        console.log("Removing object with key: " + key);
        localStorage.removeItem(key);
    }

    static isEmpty(key : string) : boolean {
        return localStorage.getItem(key) == null;
    }

    static ClearAll() : void {
        console.log("Clearing Local Storage");
        localStorage.clear();
    }
}