package it.softwaresystem.convenzioniuil;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import io.rumors.reactnativesettings.RNSettingsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeYouTube(),
            new RNSettingsPackage(),
            new MapsPackage(),
            new ReactNativeConfigPackage(),
            new LocationServicesDialogBoxPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
