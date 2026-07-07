// NOAA Tide Predictions for Pebble Halcyon+
// Auto-detects nearest NOAA tide station from GPS coordinates

var Tide = {
  NOAA_STATIONS_URL: 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json',
  NOAA_PREDICTIONS_URL: 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter',

  findNearestStation: function (lat, lng, callback, errorCallback) {
    var url = this.NOAA_STATIONS_URL +
      '?type=tidepredictions&lat=' + lat.toFixed(4) +
      '&lon=' + lng.toFixed(4) + '&radius=80&units=metric';

    console.log('Tide: finding nearest station...');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.timeout = 10000;
    xhr.onload = function () {
      if (xhr.status !== 200) {
        errorCallback('Station lookup HTTP ' + xhr.status);
        return;
      }
      try {
        var data = JSON.parse(xhr.responseText);
        var stations = data.stations || [];
        if (stations.length === 0) {
          errorCallback('No tide stations found nearby');
          return;
        }
        var station = stations[0];
        console.log('Tide: nearest station ' + station.id + ' (' + station.name + ')');
        callback(station.id);
      } catch (e) {
        errorCallback('Station parse error: ' + e.message);
      }
    };
    xhr.onerror = function () { errorCallback('Station lookup network error'); };
    xhr.ontimeout = function () { errorCallback('Station lookup timeout'); };
    xhr.send();
  },

  fetchPredictions: function (stationId, callback, errorCallback) {
    var today = new Date();
    var beginDate = today.getFullYear() +
      ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);

    var endDate = new Date(today.getTime() + 2 * 86400000);
    var endStr = endDate.getFullYear() +
      ('0' + (endDate.getMonth() + 1)).slice(-2) + ('0' + endDate.getDate()).slice(-2);

    var url = this.NOAA_PREDICTIONS_URL +
      '?station=' + stationId +
      '&begin_date=' + beginDate +
      '&end_date=' + endStr +
      '&product=predictions' +
      '&datum=MLLW' +
      '&time_zone=lst_ldt' +
      '&interval=hilo' +
      '&units=metric' +
      '&format=json';

    console.log('Tide: fetching predictions for ' + stationId);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.timeout = 10000;
    xhr.onload = function () {
      if (xhr.status !== 200) {
        errorCallback('Predictions HTTP ' + xhr.status);
        return;
      }
      try {
        var data = JSON.parse(xhr.responseText);
        var predictions = data.predictions || [];
        if (predictions.length === 0) {
          errorCallback('No tide predictions returned');
          return;
        }
        var points = [];
        for (var i = 0; i < predictions.length; i++) {
          var p = predictions[i];
          var parts = p.t.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/);
          if (!parts) continue;
          var hour = parseInt(parts[4], 10);
          var minute = parseInt(parts[5], 10);
          var minuteOfDay = hour * 60 + minute;
          var heightCm = Math.round(parseFloat(p.v) * 100);
          points.push({ minute: minuteOfDay, height_cm: heightCm });
        }
        points.sort(function (a, b) { return a.minute - b.minute; });
        console.log('Tide: got ' + points.length + ' points for station ' + stationId);
        callback({ stationId: stationId, points: points });
      } catch (e) {
        errorCallback('Predictions parse error: ' + e.message);
      }
    };
    xhr.onerror = function () { errorCallback('Predictions network error'); };
    xhr.ontimeout = function () { errorCallback('Predictions timeout'); };
    xhr.send();
  },

  fetch: function (lat, lng, callback, errorCallback) {
    var self = this;
    this.findNearestStation(lat, lng,
      function (stationId) {
        self.fetchPredictions(stationId, callback, errorCallback);
      },
      errorCallback
    );
  }
};

module.exports = Tide;
