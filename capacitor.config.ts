import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  // appId: 'com.josh.neobarber',
  appName: 'NeoBarber',
  webDir: 'www',
  
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    // SplashScreen: {
    //   launchShowDuration: 3000, // Duración en milisegundos
    //   backgroundColor: '#ffffff', // Color de fondo
    //   androidSplashResourceName: 'neo', // Nombre del recurso de imagen para Android
    //   //iosSplashResourceName: 'Default', // Nombre del recurso de imagen para iOS
    //   showSpinner: true, // Mostrar un spinner de carga
    //   spinnerColor: '#000000', // Color del spinner
    //   autoHide: true, // Ocultar automáticamente el splash screen
    // },
  },
  // icon: 'src/assets/icon/icon.png',
  //splash: 'src/assets/icon/icon.png',
};

export default config;
