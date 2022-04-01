using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using IciVelib.Helpers;
using IciVelib.Models;

namespace IciVelib.Activities
{
    [Activity(Theme = "@style/AppTheme.Splash", MainLauncher = true, NoHistory = true, ScreenOrientation = Android.Content.PM.ScreenOrientation.Portrait)]
    public class SplashScreenActivity : Activity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
        }

        protected override void OnResume()
        {
            base.OnResume();

            Task startupWork = new Task(() =>
            {
              
            });

            startupWork.ContinueWith(t =>
            {
                XamarinCustomHelper.Activities.ActivitiesTransitionManager.SwitchToActivity(this, typeof(ResearchActivity), true, null, Resource.Animation.abc_fade_in, Resource.Animation.abc_fade_out);             
            }, TaskScheduler.FromCurrentSynchronizationContext());

            startupWork.Start();
        }
    }
}