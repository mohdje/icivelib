using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IciVelib.Models
{
    public class VelibApiResult
    {
        public VelibApiRecords[] Records { get; set; }
    }

    public class VelibApiRecords
    {
        public VelibApiFields Fields { get; set; }
    }

    public class VelibApiFields
    {
        public string Name { get; set; }
        [JsonProperty("stationcode")]
        public string StationCode { get; set; }

        [JsonProperty("coordonnees_geo")]
        public float[] Coordinates { get; set; }

        [JsonProperty("is_installed")]
        public string IsInstalled { get; set; }

        [JsonProperty("is_returning")]
        public string IsResturning { get; set; }

        [JsonProperty("is_renting")]
        public string IsRenting { get; set; }
        public int Mechanical { get; set; }

        [JsonProperty("ebike")]
        public int Ebike { get; set; }
        public int Capacity { get; set; }

        [JsonProperty("numbikesavailable")]
        public int NumBikesAvailable { get; set; }
        public string Dist { get; set; }
    }

    public class VelibApiGeometry
    {
        public float[] Coordinates { get; set; }
    }
}