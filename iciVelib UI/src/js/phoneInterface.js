import { TestPhoneInterface } from "@/js/testPhoneInterface.js";

const ProdPhoneInterface = { 
    getFavoriteVelibStationsCallId: "GetFavoriteVelibStations",
    
    getVelibStationsFromPosition(lat, lon, dist, filterValues) {
        return JSON.parse(Velib.GetVelibStationsFromPosition(lat, lon, dist, filterValues.join(';')));
    },

    getFavoritesVelibStationsAsync() {
       Velib.GetFavoritesVelibStationsAsync(this.getFavoriteVelibStationsCallId);
    },

    addFavoriteVelibStationAsync(stationId, customLabel) {
        Velib.AddFavoriteVelibStationAsync(stationId, customLabel, this.getFavoriteVelibStationsCallId);
    },

    removeFavoriteVelibStationAsync(stationId) {
        Velib.RemoveFavoriteVelibStationAsync(stationId, this.getFavoriteVelibStationsCallId);
    },

    updateFavoriteVelibStation(station){
        Velib.UpdateFavoriteVelibStationCustomLabelAsync(station.id, station.customLabel , this.getFavoriteVelibStationsCallId);
    },

    getGpsLocation() {
        var location = Phone.GetGpsLocation();
        return location ? JSON.parse(Phone.GetGpsLocation()) : null;
    },

    openGoogleMaps(lat, lon) {
        Phone.OpenGoogleMaps(lat, lon);
    },

    networkAvailable() {
        var networkAvailable = Phone.CheckConnectivity();
        return networkAvailable === "ok";
    },

    showToastMessage(text) {
        Phone.ShowToastMessage(text);
    }
}

export const PhoneInterface = process.env.NODE_ENV === "development" ? TestPhoneInterface : ProdPhoneInterface;



