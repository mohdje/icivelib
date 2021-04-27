# IciVelib

IciVelib is a mobile application made with Xamarin and Vuetify. It is has been developped only for Android (cause I dont have the equipment to develop it also for iOS). 
With this application the user can find Velib stations in Paris and its suburbs (Velib is the name of bicyles you can rent). This application is free and you can see how it looks here https://play.google.com/store/apps/details?id=com.icivelib.icivelib&hl=en_NZ.

The project is divided in two parts:
* Xamarin : this is the framework I use to develop mobile applications. I use a home-made library XamarinCustomHelper (https://github.com/mohdje/xamarincustomhelper) that embeds common features we use when developing a mobile app (activity transition, data storage, etc). 
* Vuetify : I used Vuetify to build the UI of the application. With the ease of Vue js to build modular and scalable interfaces and the "mobile native look" of Vuetify, it is a lot more easier to build UI for mobile than using xaml in Xamarin.  

I use WebView to load the UI and it can interacts with the phone throw Javascipt Interfaces. The development and maintenance of the application is a lot more efficient with this approach.
