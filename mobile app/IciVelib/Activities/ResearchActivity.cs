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

        protected override void OnCreate(Bundle savedInstanceState)
		{
			base.OnCreate(savedInstanceState);
          
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);          
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
    }
}

