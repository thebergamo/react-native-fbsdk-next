import {AppRegistry} from 'react-native';
import App from './src/App';
import {Settings} from 'react-native-fbsdk-next';
import {name as appName} from './app.json';

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.initializeSDK();

AppRegistry.registerComponent(appName, () => App);
