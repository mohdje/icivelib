import { FakeData } from "./fakeData";

export const TestPhoneInterface = {
  getVelibStationsFromPositionAsync(lat, lon, dist, filterValues, callback) {
    FakeData.fakeAsyncCallMobile(callback, FakeData.getVelibStations(), 2000);
  },

  getFavoritesVelibStationsAsync(callback) {
    FakeData.fakeAsyncCallMobile(callback, FakeData.getFavoriteVelibStations(), 2000);
  },

  addFavoriteVelibStationAsync(stationId, customLabel, callback) {
    if (FakeData.getFavoriteVelibStations().find(s => s.id === stationId))
      this.showToastMessage("velib station " + stationId + " already exists in your favorites");
    else {
      FakeData.addFavoriteVelibStation(stationId, customLabel);
      const text = stationId + (customLabel ? "-" + customLabel : "");
      this.showToastMessage("velib station " + text + " added with success to fav");
      FakeData.fakeAsyncCallMobile(callback, FakeData.getFavoriteVelibStations(), 1000);
    }
  },

  removeFavoriteVelibStationAsync(stationId, callback) {
    FakeData.removeFavoriteVelibStation(stationId);
    this.showToastMessage("velib station " + stationId + " removed from fav");
    FakeData.fakeAsyncCallMobile(callback, FakeData.getFavoriteVelibStations(), 1000);
  },

  updateFavoriteVelibStationAsync(stationId, customLabel, callback) {
    FakeData.updateFavoriteVelibStationCustomLabel(stationId, customLabel);
    this.showToastMessage("velib station " + stationId + " custom label edited");
    FakeData.fakeAsyncCallMobile(callback, FakeData.getFavoriteVelibStations(), 1000);
  },

  getGpsLocationAsync(callback) {
    FakeData.fakeAsyncCallMobile(callback, FakeData.getPhoneLocation(), 2000);
  },

  openGoogleMaps(lat, lon) {
    console.log("open google maps", lat, lon);
  },

  networkAvailable() {
    return true;
  },

  showToastMessage(text) {
    console.log("show toast message: ", text);
  },

  goToPreviousActivity(){
    console.log("go to previous activity");
  },

  openAdVideoActivity(){
    console.log("open ad video activity");
  },

  loadAdVideo(fail) {
    console.log("ad video loading");
    
   if (fail) {
      setTimeout(() => {
        console.log("ad video failed to load");
        document.dispatchEvent(new CustomEvent('adFailedToLoad'));
      }, 1000);
    }
    else {
      setTimeout(() => {
        console.log("ad video playing");
        setTimeout(() => {
          console.log("ad video ended");
          document.dispatchEvent(new CustomEvent('adWatched'));
        }, 3000);
      }, 1000);
    }

  }

}


