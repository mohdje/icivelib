using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Webkit;
using Android.Widget;
using IciVelib.Activities;
using Java.Interop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using XamarinCustomHelper.Javascript;

namespace IciVelib.JavascriptInterfaces
{
    internal class JavascriptAdInterface : JavascriptWebViewInterface
    {
        public JavascriptAdInterface(AdVideoActivity context) : base(context)
        {

        }

        public override string InterfaceName()
        {
            return "Ad";
        }


        [Export]
        [JavascriptInterface]
        public void LoadAdVideo()
        {
            var adActivity = this.Context as AdVideoActivity;
            adActivity.LoadAdVideo();
        }
    }
}