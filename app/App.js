import App from './src/index';
require('react-native-browser-polyfill');

if (global && !global.self && Platform.OS === 'android') {
  global.self = global;
}

export default App;