import Vue from "vue";
import { PhoneInterface } from "@/js/phoneInterface.js";

export const FavoritesStationsStore = Vue.observable({
    stations: [],
    isLoading: false,
    load() {
        this.isLoading = true;
        window.context.favoritesStationsStore = this;
        PhoneInterface.getFavoritesVelibStationsAsync((e) => {
            window.context.favoritesStationsStore.stations = e.result;
            window.context.favoritesStationsStore.isLoading = false;
        });
    },
    add(stationId, customLabel) {
        window.context.favoritesStationsStore = this;
        PhoneInterface.addFavoriteVelibStationAsync(stationId, customLabel, (e) => {
            window.context.favoritesStationsStore.stations = e.result;
        });
    },
    delete(stationId) {
        window.context.favoritesStationsStore = this;
        PhoneInterface.removeFavoriteVelibStationAsync(stationId, (e) => {
            window.context.favoritesStationsStore.stations = e.result;
        });
    },
    update(stationId, customLabel) {
        window.context.favoritesStationsStore = this;
        PhoneInterface.updateFavoriteVelibStationAsync(stationId, customLabel, (e) => {
            window.context.favoritesStationsStore.stations = e.result;
        });
    },
    hasStations() {
        return this.stations ? this.stations.length > 0 : false;
    }
});
