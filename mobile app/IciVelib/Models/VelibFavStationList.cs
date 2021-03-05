using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using XamarinCustomHelper.IO;
using XamarinCustomHelper.IO.Serialization;

namespace IciVelib.Models
{
    public class VelibFavStationList : SavableList<VelibStation>
    {
        public VelibFavStationList(ISerializer serializer) : base(serializer)
        {

        }
        protected override string GetSerializationFileName()
        {
            return  "VelibFavStations.xml";
        }
        protected override bool CheckBeforeAddElement(VelibStation element, out string errorMessage)
        {
            var maxFavorites = 10;
            if (_list.Count == maxFavorites)
            {
                errorMessage = "Vous ne pouvez pas avoir plus de " + maxFavorites + " stations vélib dans la liste de favoris";
                return false;
            }

            if (_list.Any(f => f.Id == element.Id))
            {
                errorMessage = "Cette station velib est déjà dans la liste des favoris";
                return false;
            }

            errorMessage = string.Empty;

            return true;
        }

        protected override bool CheckBeforeAddRange(VelibStation[] elements, out string errorMessage)
        {
            throw new NotImplementedException();
        }
    }
}