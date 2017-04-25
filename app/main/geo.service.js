export default class GeoService {
    constructor($http) {
        this._http = $http;
    }

    userIP() {
        return this._http.get(`//freegeoip.net/json/`);
    }
}