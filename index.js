/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { InvisibleLogBox } from './src/screens/Function/Chung/functionLogBoxignorelog';

InvisibleLogBox();

AppRegistry.registerComponent(appName, () => App);
