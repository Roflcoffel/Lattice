"use strict";
class StorageHandler {
    static Store(key, object) {
        console.log("Storing in storage");
        try {
            localStorage.setItem(key, JSON.stringify(object));
        }
        catch (error) {
            console.log(error);
        }
    }
    static Retrieve(key) {
        console.log("Retrieving object with key: " + key);
        let json = localStorage.getItem(key);
        if (json != null)
            return JSON.parse(json);
        console.log("Tried to retrieve a null value!");
        return "null";
    }
    static Remove(key) {
        console.log("Removing object with key: " + key);
        localStorage.removeItem(key);
    }
    static isEmpty(key) {
        return localStorage.getItem(key) == null;
    }
    static ClearAll() {
        console.log("Clearing Local Storage");
        localStorage.clear();
    }
}
