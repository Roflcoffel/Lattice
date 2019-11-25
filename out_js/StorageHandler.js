"use strict";
class StorageHandler {
    static Store(key, object, local_or_session = "local") {
        console.log("Storing key: " + key);
        try {
            if (local_or_session == "local") {
                localStorage.setItem(key, JSON.stringify(object));
                return;
            }
            sessionStorage.setItem(key, JSON.stringify(object));
        }
        catch (error) {
            console.log(error);
        }
    }
    static Retrieve(key, local_or_session = "local") {
        console.log("Retrieving key: " + key);
        let json;
        json = local_or_session == "local" ? localStorage.getItem(key) : sessionStorage.getItem(key);
        if (json != null)
            return JSON.parse(json);
        console.log("Tried to retrieve a null value!");
        return "null";
    }
    //Only Removes LOCAL keys
    static Remove(key) {
        console.log("Removing object with key: " + key);
        localStorage.removeItem(key);
    }
    static isEmpty(key, local_or_session = "local") {
        return local_or_session == "local" ? (localStorage.getItem(key) == null) : (sessionStorage.getItem(key) == null);
    }
    //Only Clears LOCAL Storage
    static ClearAll() {
        console.log("Clearing Local Storage");
        localStorage.clear();
    }
}
