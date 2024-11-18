import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'NeoBarber',
  webDir: 'www',
  // server: {
  //   cleartext: true
  // },
  plugins: {
    // CapacitorHttp: {
    //   enabled: true,
    // },
    // SplashScreen: {
    //   launchShowDuration: 0,
    //   launchAutoHide: true,
    //   // launchFadeOutDuration: 3000,
    //   backgroundColor: "#ffffff",
    //   androidSplashResourceName: "splash",
    //   androidScaleType: "CENTER_CROP",
    //   showSpinner: false,
    //   androidSpinnerStyle: "large",
    //   iosSpinnerStyle: "small",
    //   spinnerColor: "#999999",
    //   splashFullScreen: false,
    //   splashImmersive: false,
    //   layoutName: "launch_screen",
    //   useDialog: false,
    // },
  },
};

export default config;
