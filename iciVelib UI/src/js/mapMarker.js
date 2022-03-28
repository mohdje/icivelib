export const MapMarker = {
    loactionMarkerImage: require("@/assets/location.png"),
    velibLogoMarkerImage: require("@/assets/velib_logo.png"),
    velibMecaLogo: require("@/assets/filter_map_bike.png"),
    velibElecLogo: require("@/assets/filter_map_bike_elec.png"),
    parkingLogo: require("@/assets/filter_map_terminal.png"),

    getPositionMarker(lng, lat) {
        var marker = {
            img: this.loactionMarkerImage,
            size: {
                width: 49,
                height: 63,
            },
            coordinates: {
                lng: lng,
                lat: lat,
            },
        };
        return marker;
    },
    getVelibStationMarker(station) {
        var html = '<div class="velib-station-marker-container">';
        html += '      <div class="velib-station-marker-content">';
        html += '         <div class="velib-station-marker-label">' + station.name + '</div>';
       

        if(station.isAvailable){
            html += '         <div class="velib-station-marker-infos">';
            html += '           <div class="station-info"><img src='+ this.velibMecaLogo +'><div>'+ station.normalBikeCount + '</div></div>';
            html += '           <div class="station-info"><img src='+ this.velibElecLogo +'><div>'+ station.eBikeCount + '</div></div>';
            html += '           <div class="station-info"><img src='+ this.parkingLogo +'><div>'+ station.freePlaceCount + '</div></div>';
            html += '         </div>';
        }
        else{
            html += '         <div class="velib-station-not-available">';
            html += '          <div>Indisponible</div>';
            html += '           <i aria-hidden="true" class="v-icon notranslate mdi mdi-alert theme--light orange--text" style="font-size: 40px;"></i>';
            html += '         </div>';
        }

        html += '         <div class="velib-station-marker-distance-label">' + this.computeDistanceLabel(station.distance) + '</div>';
        html += '       </div>';
        html += '       <div class="velib-station-marker-bottom"><div class="triangle"></div></div>';
        html += "</div>";

        var marker = {
            id: 'full' + station.id,
            innerHTML: html.trim(),
            size: {
                width: 160,
                height: 140,
            },
            coordinates: {
                lng: station.longitude,
                lat: station.latitude,
            },
            minZoom: 15,
            data: station,
            clickEnabled: true,
            type: 'full'
        };
        return marker;
    },
    computeDistanceLabel(distance) {
        if (!distance) return '';
        else if (distance > 1000) return 'à ' + Number(distance / 1000).toFixed(2) + 'km';
        else return 'à ' + Number(distance).toFixed(0) + 'm';
    },
    getVelibStationLiteMarker(station) {      
        var html = '<div class="velib-station-marker-container">';
        html += '      <div class="velib-station-marker-content lite" style="background-image: url(' + this.velibLogoMarkerImage + ');">';
        html += '       </div>';
        html += '       <div class="velib-station-marker-bottom"><div class="triangle"></div></div>';
        html += "</div>";

        var marker = {
            id: 'lite' + station.id,
            innerHTML: html.trim(),
            size: {
                width: 65,
                height: 80,
            },
            coordinates: {
                lng: station.longitude,
                lat: station.latitude,
            },
            maxZoom: 15,
            data: station,
            clickEnabled: true,
            type: 'lite'
        };
        return marker;
    },
    selectMarker(marker){
        var htmlMarkerContentLite = document.getElementById(marker.id.replace("full", "lite")).getElementsByClassName("velib-station-marker-content")[0];
        htmlMarkerContentLite.classList.add("selected");

        var htmlMarkerContentFull = document.getElementById(marker.id.replace("lite", "full")).getElementsByClassName("velib-station-marker-content")[0];
        htmlMarkerContentFull.classList.add("selected");
    },
    unselectMarkers(markers){
        markers.forEach(m => {
            var htmlMarkerContent = document.getElementById(m.id)?.getElementsByClassName("velib-station-marker-content");
            if(htmlMarkerContent && htmlMarkerContent.length > 0)
                htmlMarkerContent[0].classList.remove("selected");
        })
    }

}