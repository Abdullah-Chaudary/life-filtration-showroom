import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = { appId: 'com.lifefiltration.showroom', appName: 'Life Filtration Showroom', webDir: 'dist', android: { backgroundColor: '#f8fbfa' }, plugins: { SplashScreen: { launchShowDuration: 1800, backgroundColor: '#f8fbfa', showSpinner: false } } };
export default config;
