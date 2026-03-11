import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.faaa8b1c05fc4a3db8372ab4991550d1',
  appName: 'AI Crop Recommender',
  webDir: 'dist',
  server: {
    url: 'https://faaa8b1c-05fc-4a3d-b837-2ab4991550d1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#2F855A',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      backgroundColor: '#2F855A',
      style: 'LIGHT',
    },
  },
};

export default config;