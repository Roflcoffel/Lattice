"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class WaniKaniAPI {
    constructor(APIKey) {
        this.APIKey = APIKey;
        this.URL = "https://api.wanikani.com/v2/";
        this.Revision = "20170710";
    }
    Request(path, filters) {
        return new Request(this.URL + path + "?" + filters, {
            method: 'GET',
            headers: new Headers({
                'Wanikani-Revision': this.Revision,
                Authorization: 'Bearer ' + this.APIKey
            })
        });
    }
    GetAllAssignments() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.Request("assignments", ""));
            return yield response.json();
        });
    }
    GetAllSubjects(new_url = "subjects", filter = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.Request(new_url, filter));
            return yield response.json();
        });
    }
    GetUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.Request("user", ""));
            return yield response.json();
        });
    }
    MapCharacter(jsonData) {
        let data = new Array();
        let imgData = new Array();
        let level = new Array();
        data = jsonData;
        data.forEach(cha => {
            let images = new Array();
            if (cha.data.character_images != null) {
                imgData = cha.data.character_images;
                imgData.forEach(prop => {
                    images.push(new ImageUrl(prop.content_type, prop.metadata, prop.url));
                });
            }
            level.push(new Character(cha.data.level, cha.data.characters, false, cha.object, //contains the type
            images));
        });
        //console.log(data);
        console.log(level);
        return level;
    }
    MapUser(jsonData) {
        return new User(jsonData.level, jsonData.username);
    }
}
