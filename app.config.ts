import 'dotenv/config';

export default {
  expo: {
    name: "GOU-app",
    slug: "GOU-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    schema: "GOU",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    extra: {
      API_URL: process.env.API_URL,
      STORAGE_URL: process.env.STORAGE_URL,
      ENTORNO: process.env.APP_ENV
    }
  }
};
