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
    Request(url, filters) {
        return new Request(url + "?" + filters, {
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
    GetAllSubjectHeaders(filter = "levels=1", new_url = this.URL + "subjects") {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.Request(new_url, filter));
            const result = yield response.json();
            const pages = result.pages;
            const data = result.data;
            console.log("Next Url: " + pages.next_url);
            if (pages.next_url != null) {
                return data.concat(yield this.GetAllSubjectHeaders("", pages.next_url));
            }
            else {
                return data;
            }
        });
    }
    GetAllSubjects(filter = "levels=1") {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = yield this.GetAllSubjectHeaders(filter);
            return headers.map(header => header.data);
        });
    }
    GetAllCharacters(filter = "levels=1") {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = yield this.GetAllSubjectHeaders(filter);
            return headers.map(header => new Character(header.data.level, header.data.characters, false, header.object));
        });
    }
    GetUser(filter = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.Request(this.URL + "user", filter));
            return yield response.json().then(response => new User(response.data.level, response.data.username, new Date(response.data_updated_at)));
        });
    }
}
