using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using XamarinCustomHelper.Activities;
using XamarinCustomHelper.Javascript;
using IciVelib.JavascriptInterfaces;

namespace IciVelib.Activities
{
    [Activity(Label = "RewardedVideoActivity")]
    public class AdVideoActivity : WebViewActivity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            Xamarin.Essentials.Platform.Init(this, savedInstanceState);
            Android.Gms.Ads.MobileAds.Initialize(this);
            InitRewardedAdVideo();
        }

        private void InitRewardedAdVideo()
        {
            MarcTron.Plugin.CrossMTAdmob.Current.OnRewardedVideoAdLoaded += (s, e) =>
            {
                MarcTron.Plugin.CrossMTAdmob.Current.ShowRewardedVideo();
            };

            MarcTron.Plugin.CrossMTAdmob.Current.OnRewardedVideoAdClosed += (s, e) =>
            {
                this.DispacthJavaScriptEvent("adWatched", null);
            };

            MarcTron.Plugin.CrossMTAdmob.Current.OnRewardedVideoAdFailedToLoad += (s, e) =>
            {
                this.DispacthJavaScriptEvent("adFailedToLoad", null);
            };
        }

        public void LoadAdVideo()
        {
            // test ad id : ca-app-pub-3940256099942544/5224354917
            this.RunOnUiThread(() =>
            {
                MarcTron.Plugin.CrossMTAdmob.Current.LoadRewardedVideo("ca-app-pub-3940256099942544/5224354917");
            });
        }

        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Permission[] grantResults)
        {           
            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);
        }

        protected override string GetUrl()
        {
            return "file:///android_asset/UI/adVideoActivity/index.html";
        }

        protected override JavascriptWebViewInterface[] GetJavascriptInterfaces()
        {
            return new JavascriptWebViewInterface[]
            {
                new JavascriptAdInterface(this),
                new JavascriptPhoneInterface(this)
            };
        }

        protected override int GetLayoutResource()
        {
            return Resource.Layout.activity_main;
        }

        protected override int GetWebViewId()
        {
            return Resource.Id.webView;
        }
    }
}