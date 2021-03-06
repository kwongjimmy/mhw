package com.chingoo.mhw;

import android.app.Activity;

import com.dooboolab.RNIap.RNIapPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import org.pgsqlite.SQLitePluginPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            // eg. new VectorIconsPackage()
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new SQLitePluginPackage(),  // register SQLite Plugin here
            new RNFirebasePackage(),
            new RNFirebaseAdMobPackage(),
            new RNIapPackage()
    );
  }

  @Override
  public boolean clearHostOnActivityDestroy(Activity activity) {
    return false;
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

  @Override
  public String getJSMainModuleName() {
    return "index";
  }
}
