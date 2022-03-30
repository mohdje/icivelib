import { TestPhoneInterface } from "@/js/testPhoneInterface.js";

const ProdPhoneInterface = { 
    getVelibStationsFromPositionAsync(lat, lon, dist, filterValues, callback) {
        Velib.GetVelibStationsFromPositionAsync(lat, lon, dist, filterValues.join(';'), callback.toString());
    },

    getFavoritesVelibStationsAsync(callback) {
       Velib.GetFavoritesVelibStationsAsync(callback.toString());
    },

    addFavoriteVelibStationAsync(stationId, customLabel, callback) {
        Velib.AddFavoriteVelibStationAsync(stationId, customLabel, callback.toString());
    },

    removeFavoriteVelibStationAsync(stationId, callback) {
        Velib.RemoveFavoriteVelibStationAsync(stationId, callback.toString());
    },

    updateFavoriteVelibStationAsync(stationId, customLabel, callback){
        Velib.UpdateFavoriteVelibStationCustomLabelAsync(stationId, customLabel , callback.toString());
    },

    getGpsLocationAsync(callback) {
        Phone.GetGpsLocation(callback.toString());
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



