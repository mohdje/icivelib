import Vue from "vue";

export const FavoritesStationsStore = Vue.observable({
    stations: [],
    isLoading: false,
    load() {
        this.isLoading = true;
        window.context.favoritesStationsStore = this;
        window.context.phoneInterface.getFavoritesVelibStationsAsync((e) => {
            window.context.favoritesStationsStore.stations = e.result;
            window.context.favoritesStationsStore.isLoading = false;
        });
    },
    add(stationId, customLabel) {
        window.context.favoritesStationsStore = this;
        window.context.phoneInterface.addFavoriteVelibStationAsync(stationId, customLabel, (e) => {
            window.context.favoritesStationsStore.stations = e.result;
        });
    },
    delete(stationId) {
        window.context.favoritesStationsStore = this;
        window.context.phoneInterface.removeFavoriteVelibStationAsync(stationId, (e) => {
            window.context.favoritesStationsStore.stations = e.result;
        });
    },
    update(stationId, customLabel) {
        window.context.favoritesStationsStore = this;
        window.context.phoneInterface.updateFavoriteVelibStationAsync(stationId, customLabel, (e) => {
            window.context.favoritesStationsStore.stations = e.result;
        });
    },
    hasStations() {
        return this.stations ? this.stations.length > 0 : false;
    }
});
