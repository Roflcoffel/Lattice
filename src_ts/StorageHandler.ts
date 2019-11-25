
class StorageHandler {
    static Store(key : string, object : any, local_or_session : string = "local") : void {
        console.log("Storing in storage");
        try {
            if(local_or_session == "local") {
                localStorage.setItem(key, JSON.stringify(object));
                return
            }
            sessionStorage.setItem(key, JSON.stringify(object));
        } catch (error) {
            console.log(error);
        }
    }

    static Retrieve(key : string, local_or_session : string = "local") : any {
        console.log("Retrieving object");
        let json : string | null;
        json = local_or_session == "local" ? localStorage.getItem(key) : sessionStorage.getItem(key);
        if(json != null)
            return JSON.parse(json);
        console.log("Tried to retrieve a null value!");
        return "null";
    }

    //Only Removes LOCAL keys
    static Remove(key : string) : void {
        console.log("Removing object with key: " + key);
        localStorage.removeItem(key);
    }

    
    static isEmpty(key : string, local_or_session : string = "local") : boolean {
        return local_or_session == "local" ? (localStorage.getItem(key) == null) : (sessionStorage.getItem(key) == null);
    }

    //Only Clears LOCAL Storage
    static ClearAll() : void {
        console.log("Clearing Local Storage");
        localStorage.clear();
    }
}