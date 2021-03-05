using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using IciVelib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using XamarinCustomHelper.Javascript;

namespace IciVelib.Helpers
{
    public class VelibRequester
    {
        private const string _baseUrl = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&";

        public async Task<VelibStation> GetStationInfos(string stationId, string customLabel)
        {
            var url = _baseUrl + "refine.stationcode=" + stationId;

            var result = await PerformGetRequestAsync(url);

            var resultObject = JsonHelper.ToObject<VelibApiResult>(result);
            var record = resultObject.Records.FirstOrDefault();

            return new VelibStation(record.Fields)
            {
                CustomLabel = customLabel
            };
        }

        public string GetStations(string longitude, string latitude, string distance, string filterValues)
        {
            var url = _baseUrl + $"geofilter.distance={latitude}%2C+{longitude}%2C+{distance}";

           var result = PerformGetRequestAsync(url).Result;

           var resultObject = JsonHelper.ToObject<VelibApiResult>(result);

            var velibStations = resultObject.Records.Select(r => new VelibStation(r.Fields));

            if (filterValues.Contains("velib_meca"))
                velibStations = velibStations.Where(v => v.NormalBikeCount > 0);

            if (filterValues.Contains("velib_elec"))
                velibStations = velibStations.Where(v => v.EBikeCount > 0);

            if (filterValues.Contains("free_parking"))
                velibStations = velibStations.Where(v => v.FreePlaceCount > 0);

            return JsonHelper.ToJson(velibStations.ToArray());
        }

        private Task<string> PerformGetRequestAsync(string url)
        {
            var httpClient = new HttpClient();

           return httpClient.GetStringAsync(url);
        }
    }
}