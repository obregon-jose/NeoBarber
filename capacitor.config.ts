import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'NeoBarber',
  webDir: 'www',
  // server: {
  //   cleartext: true
  // },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
