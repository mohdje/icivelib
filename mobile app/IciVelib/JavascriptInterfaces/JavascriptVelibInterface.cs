using Android.Content;
using Android.Webkit;
using Java.Interop;
using IciVelib.Helpers;
using Xamarin.Essentials;
using IciVelib.Models;
using System.Collections.Generic;
using System.Linq;
using Android.App;
using System;
using System.Threading.Tasks;
using XamarinCustomHelper.Javascript;
using XamarinCustomHelper.IO;
using IciVelib.Activities;

namespace IciVelib.JavascriptInterfaces
{
    public class JavascriptVelibInterface : JavascriptWebViewInterface
    {
        private JavascriptPhoneInterface jSIPhone;
        private VelibFavStationList velibFavStationList;
        private VelibRequester velibRequester;
        public JavascriptVelibInterface(ResearchActivity context) : base(context)
        {
            jSIPhone = new JavascriptPhoneInterface(context);

            var serializer = new AndroidXmlSerializer(context);
            velibFavStationList = new VelibFavStationList(serializer);
            velibRequester = new VelibRequester();
        }

        public override string InterfaceName()
        {
            return "Velib";
        }

        [Export]
        [JavascriptInterface]
        public void GetVelibStationsFromPositionAsync(string latitude, string longitude, string distance, string filterValues, string callback)
        {
            AsyncCall.ExecuteAsync(this.Context, () =>
            {
                return velibRequester.GetStations(longitude, latitude, distance, filterValues);
            }, callback);
        }

        [Export]
        [JavascriptInterface]
        public void GetFavoritesVelibStationsAsync(string callback)
        {
            AsyncCall.ExecuteAsync(Context, () => GetFavoriteVelibStationsInfos(false), callback);
        }

        [Export]
        [JavascriptInterface]
        public void AddFavoriteVelibStationAsync(string id, string customLabel, string callback)
        {
            AsyncCall.ExecuteAsync(Context, () =>
            {
                var velibStation = new VelibStation()
                {
                    Id = id,
                    CustomLabel = customLabel
                };

                try
                {
                    velibFavStationList.Add(velibStation);
                    Context.RunOnUiThread(() => jSIPhone.ShowToastMessage("La station " + id + " a bien été ajoutée à vos stations favorites"));
                }
                catch (Exception ex)
                {
                    Context.RunOnUiThread(() => jSIPhone.ShowToastMessage(ex.Message));
                }

                return GetFavoriteVelibStationsInfos(true);

            }, callback);
        }

        [Export]
        [JavascriptInterface]
        public void UpdateFavoriteVelibStationCustomLabelAsync(string id, string customLabel, string callback)
        {
            AsyncCall.ExecuteAsync(Context, () =>
            {
                try
                {
                    var velibStation = new VelibStation()
                    {
                        Id = id,
                        CustomLabel = customLabel
                    };
                    velibFavStationList.Replace(v => v.Id == id, velibStation);
                    Context.RunOnUiThread(() => jSIPhone.ShowToastMessage("Le label personnalisé de la station " + id + " a bien été modifié"));
                }
                catch (Exception ex)
                {
                    Context.RunOnUiThread(() => jSIPhone.ShowToastMessage(ex.Message));
                }

                return GetFavoriteVelibStationsInfos(true);

            }, callback);
        }

        [Export]
        [JavascriptInterface]
        public void RemoveFavoriteVelibStationAsync(string id, string asyncCallId)
        {
            AsyncCall.ExecuteAsync(Context, () =>
            {
                var velibStation = new VelibStation()
                {
                    Id = id
                };

                try
                {
                    velibFavStationList.Remove(v => v.Id == id);
                    Context.RunOnUiThread(() => jSIPhone.ShowToastMessage("La station " + id + " a bien été supprimée de vos stations favorites"));
                }
                catch (Exception ex)
                {
                    Context.RunOnUiThread(() => jSIPhone.ShowToastMessage(ex.Message));
                }

                return GetFavoriteVelibStationsInfos(true);
            }, asyncCallId);
        }

        private VelibStation[] GetFavoriteVelibStationsInfos(bool fromCache)
        {
            var favStationsWithData = new List<VelibStation>();
            var velibDataTasks = new List<Task<VelibStation>>();

            foreach (var station in velibFavStationList.Elements)
            {
                velibDataTasks.Add(new Task<VelibStation>(() =>
                {
                    var velibStation = velibRequester.GetStationInfos(station.Id, fromCache).Result;
                    velibStation.CustomLabel = station.CustomLabel;
                    return velibStation;
                }));
            }

            foreach (var task in velibDataTasks)
                task.Start();

            Task.WhenAll(velibDataTasks).ContinueWith(t => favStationsWithData.AddRange(t.Result)).Wait();

            return favStationsWithData.ToArray();
        }

        [Export]
        [JavascriptInterface]
        public void ShowAdVideo()
        {
            var adActivity = this.Context as ResearchActivity;
            adActivity.ShowAdVideo();
        }
    }
}