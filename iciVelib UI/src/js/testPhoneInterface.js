export const TestPhoneInterface = {
  getFavoriteVelibStationsCallId: "GetFavoriteVelibStations",

  getVelibStationsFromPosition(lat, lon, dist, filterValues) {
    return FakeData.getVelibStations();
  },

  getFavoritesVelibStationsAsync() {
    FakeData.fakeRaiseAsyncCallMobileResult(this.getFavoriteVelibStationsCallId, FakeData.getFavoriteVelibStations(), 3000);
  },

  addFavoriteVelibStationAsync(stationId, customLabel) {
    let favStations = FakeData.getFavoriteVelibStationsDtos();

    if (favStations.find(s => s.id === stationId))
      this.showToastMessage("velib station " + stationId + " already exists in your favorites");
    else {
      let favStationToAdd = FakeData.getVelibStationDtos().find(s => s.id === stationId);
      favStationToAdd.customLabel = customLabel;

      favStations.push(favStationToAdd);
      FakeData.fakeRaiseAsyncCallMobileResult(this.getFavoriteVelibStationsCallId, favStations, 1500);

      const text = stationId + (customLabel ? "-" + customLabel : "");
      this.showToastMessage("velib station " + text + " added with success to fav");
    }
  },

  removeFavoriteVelibStationAsync(stationId) {
    let favStations = FakeData.getVelibStationDtos().filter(s => s.id !== stationId);
    FakeData.fakeRaiseAsyncCallMobileResult(this.getFavoriteVelibStationsCallId, favStations, 1500);
    this.showToastMessage("velib station " + stationId + " removed from fav");
  },

  updateFavoriteVelibStation(station){
    const favStations = FakeData.getFavoriteVelibStationsDtos();
    const index = favStations.findIndex(s => s.id === station.id);
    favStations[index] = station;

    FakeData.fakeRaiseAsyncCallMobileResult(this.getFavoriteVelibStationsCallId, favStations, 1500);
    this.showToastMessage("velib station " + station.id + " custom label edited");
  },

  getGpsLocation() {
    return FakeData.getPhoneLocation();
  },

  openGoogleMaps(lat, lon) {
    console.log("open google maps", lat, lon);
  },

  networkAvailable() {
    return true;
  },

  showToastMessage(text) {
    console.log("show toast message: ", text);
  }
}

const FakeData = {
  velibStations: [
    {
      "datasetid": "velib-disponibilite-en-temps-reel",
      "recordid": "76b88febbd6b01d936801dc1f4d298a318d03583",
      "fields": {
        "ebike": 2,
        "capacity": 23,
        "name": "Nationale - Marcel Duchamp",
        "nom_arrondissement_communes": "Paris",
        "numbikesavailable": 5,
        "is_installed": "NON",
        "is_renting": "OUI",
        "mechanical": 3,
        "stationcode": "13114",
        "dist": "76.2578301848",
        "coordonnees_geo": [
          48.8246374934,
          2.36780148
        ],
        "numdocksavailable": 18,
        "duedate": "2021-02-09T15:39:16+00:00",
        "is_returning": "OUI"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.36780148,
          48.8246374934
        ]
      },
      "record_timestamp": "2021-02-09T16:27:00.345000+00:00"
    },
    {
      "datasetid": "velib-disponibilite-en-temps-reel",
      "recordid": "b7d2828d4ccd9d1ea1ccfcfcc3a697c0ad63caf6",
      "fields": {
        "ebike": 0,
        "capacity": 18,
        "name": "Ivry - Simone Weil",
        "nom_arrondissement_communes": "Paris",
        "numbikesavailable": 3,
        "is_installed": "OUI",
        "is_renting": "OUI",
        "mechanical": 3,
        "stationcode": "13039",
        "dist": "158.37916195",
        "coordonnees_geo": [
          48.823283932,
          2.36590951681
        ],
        "numdocksavailable": 16,
        "duedate": "2021-02-09T15:36:49+00:00",
        "is_returning": "OUI"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.36590951681,
          48.823283932
        ]
      },
      "record_timestamp": "2021-02-09T16:27:00.345000+00:00"
    },
    {
      "datasetid": "velib-disponibilite-en-temps-reel",
      "recordid": "0526f84b832dc34f34c8b38c6d21621e50d1b8f4",
      "fields": {
        "ebike": 4,
        "capacity": 20,
        "name": "Ivry - Baudricourt",
        "nom_arrondissement_communes": "Paris",
        "numbikesavailable": 5,
        "is_installed": "OUI",
        "is_renting": "OUI",
        "mechanical": 1,
        "stationcode": "13037",
        "dist": "267.888202211",
        "coordonnees_geo": [
          48.8246959954,
          2.36310607358
        ],
        "numdocksavailable": 15,
        "duedate": "2021-02-09T15:37:47+00:00",
        "is_returning": "OUI"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.36310607358,
          48.8246959954
        ]
      },
      "record_timestamp": "2021-02-09T16:27:00.345000+00:00"
    },
    {
      "datasetid": "velib-disponibilite-en-temps-reel",
      "recordid": "90ee699921b003aae74352b947a1e59f4c4d7c9f",
      "fields": {
        "ebike": 3,
        "capacity": 36,
        "name": "Olympiades",
        "nom_arrondissement_communes": "Paris",
        "numbikesavailable": 7,
        "is_installed": "OUI",
        "is_renting": "OUI",
        "mechanical": 4,
        "stationcode": "13036",
        "dist": "270.857997393",
        "coordonnees_geo": [
          48.8267646652,
          2.36508607864
        ],
        "numdocksavailable": 28,
        "duedate": "2021-02-09T15:39:44+00:00",
        "is_returning": "OUI"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.36508607864,
          48.8267646652
        ]
      },
      "record_timestamp": "2021-02-09T16:27:00.345000+00:00"
    },
    {
      "datasetid": "velib-disponibilite-en-temps-reel",
      "recordid": "7b434b68ee62cf85f4cff0bdc6f812145f5220f4",
      "fields": {
        "ebike": 7,
        "capacity": 50,
        "name": "Porte d'Ivry",
        "nom_arrondissement_communes": "Paris",
        "numbikesavailable": 13,
        "is_installed": "OUI",
        "is_renting": "OUI",
        "mechanical": 6,
        "stationcode": "13041",
        "dist": "349.933679774",
        "coordonnees_geo": [
          48.8217687476,
          2.36887067556
        ],
        "numdocksavailable": 37,
        "duedate": "2021-02-09T15:39:26+00:00",
        "is_returning": "OUI"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.36887067556,
          48.8217687476
        ]
      },
      "record_timestamp": "2021-02-09T16:27:00.345000+00:00"
    },
    {
      "datasetid": "velib-disponibilite-en-temps-reel",
      "recordid": "719b50e1819a48c4a554001449e73139386c8b33",
      "fields": {
        "ebike": 3,
        "capacity": 25,
        "name": "Choisy - Malmaisons",
        "nom_arrondissement_communes": "Paris",
        "numbikesavailable": 8,
        "is_installed": "OUI",
        "is_renting": "OUI",
        "mechanical": 5,
        "stationcode": "13038",
        "dist": "388.424210089",
        "coordonnees_geo": [
          48.821919703,
          2.36334688341
        ],
        "numdocksavailable": 17,
        "duedate": "2021-02-09T15:36:30+00:00",
        "is_returning": "OUI"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.36334688341,
          48.821919703
        ]
      },
      "record_timestamp": "2021-02-09T16:27:00.345000+00:00"
    },
    {
      "datasetid": "velib-disponibilite-en-temps-reel",
      "recordid": "bcc9e463badbe6aa6bc8737cd2db003c3ccb33c6",
      "fields": {
        "ebike": 1,
        "capacity": 33,
        "name": "Vistule - Choisy",
        "nom_arrondissement_communes": "Paris",
        "numbikesavailable": 4,
        "is_installed": "OUI",
        "is_renting": "OUI",
        "mechanical": 3,
        "stationcode": "13113",
        "dist": "393.970989456",
        "coordonnees_geo": [
          48.8236554366,
          2.36157238483
        ],
        "numdocksavailable": 27,
        "duedate": "2021-02-09T15:36:32+00:00",
        "is_returning": "OUI"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.36157238483,
          48.8236554366
        ]
      },
      "record_timestamp": "2021-02-09T16:27:00.345000+00:00"
    },
    {
      "datasetid": "velib-disponibilite-en-temps-reel",
      "recordid": "b9634e069d71759dc5b197cd3275cbf8dcccbde8",
      "fields": {
        "ebike": 4,
        "capacity": 36,
        "name": "Jean Colly - Tolbiac",
        "nom_arrondissement_communes": "Paris",
        "numbikesavailable": 7,
        "is_installed": "OUI",
        "is_renting": "OUI",
        "mechanical": 3,
        "stationcode": "13045",
        "dist": "453.203567876",
        "coordonnees_geo": [
          48.8278172916,
          2.37054906785
        ],
        "numdocksavailable": 29,
        "duedate": "2021-02-09T15:37:24+00:00",
        "is_returning": "OUI"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.37054906785,
          48.8278172916
        ]
      },
      "record_timestamp": "2021-02-09T16:27:00.345000+00:00"
    },
    {
      "datasetid": "velib-disponibilite-en-temps-reel",
      "recordid": "e931629394e4697f475d36cf063959b7765a4c9a",
      "fields": {
        "ebike": 1,
        "capacity": 40,
        "name": "Stade Georges Carpentier",
        "nom_arrondissement_communes": "Paris",
        "numbikesavailable": 3,
        "is_installed": "OUI",
        "is_renting": "OUI",
        "mechanical": 2,
        "stationcode": "13117",
        "dist": "457.106876776",
        "coordonnees_geo": [
          48.8204824384,
          2.36683219671
        ],
        "numdocksavailable": 36,
        "duedate": "2021-02-09T15:33:19+00:00",
        "is_returning": "OUI"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.36683219671,
          48.8204824384
        ]
      },
      "record_timestamp": "2021-02-09T16:27:00.345000+00:00"
    },
    {
      "datasetid": "velib-disponibilite-en-temps-reel",
      "recordid": "739b874d1704d9e8a771d6e6f720561122c850af",
      "fields": {
        "ebike": 1,
        "capacity": 26,
        "name": "Choisy - Tolbiac",
        "nom_arrondissement_communes": "Paris",
        "numbikesavailable": 5,
        "is_installed": "OUI",
        "is_renting": "OUI",
        "mechanical": 4,
        "stationcode": "13035",
        "dist": "499.507321491",
        "coordonnees_geo": [
          48.8259115559,
          2.36023932695
        ],
        "numdocksavailable": 20,
        "duedate": "2021-02-09T15:38:02+00:00",
        "is_returning": "OUI"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.36023932695,
          48.8259115559
        ]
      },
      "record_timestamp": "2021-02-09T16:27:00.345000+00:00"
    }
  ],
  timeConsummingOperation(value, millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
    return value;
  },
  getVelibStations() {
    return this.timeConsummingOperation(this.getVelibStationDtos(), 3000);
  },
  getFavoriteVelibStations() {
    return this.timeConsummingOperation(this.getFavoriteVelibStationsDtos(), 3000);
  },
  getPhoneLocation() {
    return this.timeConsummingOperation({
      lat: 48.8534,
      lng: 2.3488
    }, 3000);
  },
  fakeRaiseAsyncCallMobileResult(asyncCallId, objectResult, delayMillis) {

    setTimeout(() => {
      var obj = {
        callId: asyncCallId,
        result: JSON.stringify(objectResult)
      }
      document.dispatchEvent(new CustomEvent('asyncCallfinished', { 'detail': obj }));
    }, delayMillis);
  },
  getVelibStationDtos() {
    var stationDtos = [];
    this.velibStations.forEach(station => {
      stationDtos.push(this.velibDataToVelibDto(station));
    });

    return stationDtos;
  },
  velibDataToVelibDto(velibData) {
    return {
      name: velibData.fields.name,
      id: velibData.fields.stationcode,
      latitude: velibData.geometry.coordinates[1],
      longitude: velibData.geometry.coordinates[0],
      isAvailable: velibData.fields.is_installed === 'OUI' && velibData.fields.is_returning === 'OUI' && velibData.fields.is_renting === 'OUI',
      normalBikeCount: velibData.fields.mechanical,
      eBikeCount: velibData.fields.ebike,
      freePlaceCount: velibData.fields.capacity - velibData.fields.numbikesavailable,
      distance: velibData.fields.dist
    };
  },
  getFavoriteVelibStationsDtos() {
    var stationDtos = [];
    for (let index = 0; index < 5; index++) {
      const station = this.velibDataToVelibDto(this.velibStations[index]);
      station.customLabel = index > 1 ? "Station devant bureau" : "";
      stationDtos.push(station);
    }
    return stationDtos;
  },

}
