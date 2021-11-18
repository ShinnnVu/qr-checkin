import * as Font from "expo-font";
const useFonts = async () =>
  await Font.loadAsync({
    'Poppins-Black': require('../assets/fonts/font-poppins/Poppins-Black.otf'),
    'Poppins-Bold' : require('../assets/fonts/font-poppins/Poppins-Bold.otf'),
    'Poppins-SemiBold' : require('../assets/fonts/font-poppins/Poppins-SemiBold.otf'),
    'Poppins-Medium' : require('../assets/fonts/font-poppins/Poppins-Medium.otf'),
    'Poppins-Regular' : require('../assets/fonts/font-poppins/Poppins-Regular.otf'),
    'Poppins-Italic': require('../assets/fonts/font-poppins/Poppins-Italic.otf'),
    'Poppins-Light': require('../assets/fonts/font-poppins/Poppins-Light.otf'),
  });

export default useFonts