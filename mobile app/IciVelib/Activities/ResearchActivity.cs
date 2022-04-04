using System;
using Android.App;
using Android.Widget;
using Android.OS;

using Android.Views;
using Android.Webkit;
using IciVelib.Helpers;
using Android;
using Android.Content.PM;

using Android.Runtime;
using XamarinCustomHelper.Activities;
using XamarinCustomHelper.Phone.Location;
using XamarinCustomHelper.Javascript;
using IciVelib.JavascriptInterfaces;

namespace IciVelib
{
	[Activity(Theme = "@style/AppTheme", ScreenOrientation = Android.Content.PM.ScreenOrientation.Portrait)]
	public class ResearchActivity : WebViewActivity, ILocationPermissionRequest
    {
        public bool LocationPermissionReady { get; set; }

        private bool readyToPlayAd;

        //test id ca-app-pub-3940256099942544/5224354917 - prod id ca-app-pub-6560577025026684/9414138200
        const string RewardedAdVideoId = "ca-app-pub-6560577025026684/9414138200";

        // test id ca-app-pub-3940256099942544/1033173712 - prod id ca-app-pub-6560577025026684/4968029685
        const string InterstitialAdId = "ca-app-pub-6560577025026684/4968029685"; 

        protected override void OnCreate(Bundle savedInstanceState)
		{
			base.OnCreate(savedInstanceState);
          
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);

            InitAd();
        }

        protected override int GetLayoutResource()
        {
            return Resource.Layout.activity_main;
        }

        protected override int GetWebViewId()
        {
            return Resource.Id.webView;
        }

        protected override string GetUrl()
        {
            return "file:///android_asset/UI/researchActivity/index.html";
        }

        protected override JavascriptWebViewInterface[] GetJavascriptInterfaces()
        {
            return new JavascriptWebViewInterface[]
            {
                new JavascriptPhoneInterface(this),
                new JavascriptVelibInterface(this)
            };
        }

        public void RequestLocationPermission()
        {
            this.RequestPermissions(new string[] { Manifest.Permission.AccessFineLocation }, 1);
        }

        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Android.Content.PM.Permission[] grantResults)
        {
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);

            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);

            this.LocationPermissionReady = true;
        }

        private void InitAd()
        {
            Android.Gms.Ads.MobileAds.Initialize(this);

            MarcTron.Plugin.CrossMTAdmob.Current.OnInterstitialLoaded += (s, e) =>
            {
                readyToPlayAd = true;
            };

            MarcTron.Plugin.CrossMTAdmob.Current.OnInterstitialClosed += (s, e) =>
            {
                LoadAdVideo();
                this.DispacthJavaScriptEvent("adWatched", null);
            };

            //MarcTron.Plugin.CrossMTAdmob.Current.OnRewardedVideoAdLoaded += (s, e) =>
            //{
            //    readyToPlayAd = true;
            //};

            //MarcTron.Plugin.CrossMTAdmob.Current.OnRewardedVideoAdClosed += (s, e) =>
            //{
            //    LoadAdVideo();
            //    this.DispacthJavaScriptEvent("adWatched", null);
            //};

            //MarcTron.Plugin.CrossMTAdmob.Current.OnRewardedVideoAdFailedToLoad += (s, e) =>
            //{
            //    this.DispacthJavaScriptEvent("adFailedToLoad", null);
            //};

            LoadAdVideo();
        }

        private void LoadAdVideo()
        {
            readyToPlayAd = false;
            this.RunOnUiThread(() =>
            {
               // MarcTron.Plugin.CrossMTAdmob.Current.LoadRewardedVideo(RewardedAdVideoId);
                MarcTron.Plugin.CrossMTAdmob.Current.LoadInterstitial(InterstitialAdId);
            });
        }

        public void ShowAdVideo()
        {
            while (!readyToPlayAd)
                System.Threading.Tasks.Task.Delay(1000).Wait();

            this.RunOnUiThread(() =>
            {
                //MarcTron.Plugin.CrossMTAdmob.Current.ShowRewardedVideo();
                MarcTron.Plugin.CrossMTAdmob.Current.ShowInterstitial();
            });
            
        }
    }
}

