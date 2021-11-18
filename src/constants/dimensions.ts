import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const topPadding =
  Platform.OS === 'android' ? (DeviceInfo.hasNotch() ? HEIGHT * 0.075 : HEIGHT * 0.035) : HEIGHT <= 736 ? HEIGHT * 0.035 : HEIGHT * 0.05;