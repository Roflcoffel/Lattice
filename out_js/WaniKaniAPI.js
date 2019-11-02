"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
    GetAllSubjects(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.Request("subjects", filter));
            return yield response.json();
        });
    }
}
