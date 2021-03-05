import ApiTokens from "@/js/apiTokens.js";

export const Geocoding = {
    accessToken: ApiTokens.mapboxToken,
    adressToGeocode: function (adress, callback) {

        if (!adress) {
            console.error('Geocoding.adressToGeocode: adress parameter is missing');
            return;
        }
    
        if (typeof adress !== 'string') {
            console.error('Geocoding.adressToGeocode: adress must be a string');
            return;
        }
    
        adress = adress.replace(' ', '%20');
    
        var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
        url += adress;
    
        url += ".json?bbox=2.065485,48.768394,2.700816,48.968154&access_token=";
        url += this.accessToken;
        url += "&cachebuster=1579680401203&autocomplete=true";
    
        var xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var result = JSON.parse(this.response);
                if(callback)
                    callback(result);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}
