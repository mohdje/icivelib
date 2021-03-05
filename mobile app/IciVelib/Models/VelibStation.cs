using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Newtonsoft.Json;

namespace IciVelib.Models
{
    public class VelibStation
    {      
        public string Id { get; set; }
        public string CustomLabel { get; set; }
        public string Name { get;  }
        public float Latitude { get;  }
        public float Longitude { get;  }
        public bool IsAvailable { get;  }
        public int NormalBikeCount { get;  }
        public int EBikeCount { get;  }
        public int FreePlaceCount { get;  }
        public string Distance { get;  }

        public VelibStation(VelibApiFields velibApiFields)
        {
            Id = velibApiFields.StationCode;
            Name = velibApiFields.Name;
            Latitude = velibApiFields.Coordinates[0];
            Longitude = velibApiFields.Coordinates[1];
            IsAvailable = velibApiFields.IsInstalled == "OUI" && velibApiFields.IsRenting == "OUI" && velibApiFields.IsResturning == "OUI";
            NormalBikeCount = velibApiFields.Mechanical;
            EBikeCount = velibApiFields.Ebike;
            FreePlaceCount = velibApiFields.Capacity - velibApiFields.NumBikesAvailable;
            Distance = velibApiFields.Dist;
        }

        public VelibStation()
        {

        }
    }
}