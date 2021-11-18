import { StyleSheet } from 'react-native';

import color from './colors';
import size from './sizes';
import fonts from './fonts';

const paddingButton = 13;
const heightButton = 42;
const marginLeftRightButton = 10;
const heightGroupButton = 55;

const globalStyle = StyleSheet.create({
  containerTransparent: {
    backgroundColor: color.TRANSPARENT,
  },
  absolute: {
    position: 'absolute',
  },
  containerMain: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  alignCenter: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: color.WHITE,
    marginBottom: 10,
  },
  flex0: {
    flex: 0,
  },
  flex1: {
    flex: 1,
    backgroundColor: '#0000',
  },
  flexCenterAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexStart: { alignItems: 'flex-start' },
  flexEnd: { alignItems: 'flex-end' },
  w100: {
    width: '100%',
  },
  flexShrink: {
    flexShrink: 1,
  },
  me3: {
    marginEnd: 3,
  },
  me10: {
    marginEnd: 10,
  },
  me15: {
    marginEnd: 15,
  },
  mt5: {
    marginTop: 5,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mt20: {
    marginTop: 20,
  },
  ml10: {
    marginStart: 10,
  },
  ml5: {
    marginStart: 5,
  },
  mlNegative5: {
    marginStart: -5,
  },
  mv15: {
    marginVertical: 15,
  },
  mv20: {
    marginVertical: 20,
  },
  mb0: {
    marginBottom: 0,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mr24: {
    marginRight: 24,
  },
  btnDisabled: {
    opacity: 0.65,
  },
  minHeight100: {
    minHeight: '100%',
  },
  hide: {
    display: 'none',
  },
  pt20: {
    paddingTop: 20,
  },
  pt10: {
    paddingTop: 10,
  },
  p20: {
    padding: 20,
  },
  p10: {
    padding: 10,
  },
  alignItemStart: {
    alignItems: 'flex-start',
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  pb30: {
    paddingBottom: 30,
  },
  pb15: {
    paddingBottom: 15,
  },
});

export default globalStyle;
