import React, {useState, useEffect} from "react";
import {View,Text,I18nManager,LogBox} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {auth,onAuthStateChanged} from './src/utilis/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator, OnboardingStack } from './src/navigation/index';

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: '#1E1B18',
  },
};

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
LogBox.ignoreAllLogs();

const fetchFonts = () => {
  return Font.loadAsync({
    "BebasNeue-Regularttf": require("./assets/fonts/BebasNeue-Regular.ttf"),
    "Raleway-Boldttf": require("./assets/fonts/Raleway-Bold.ttf"),
    "Raleway-ExtraLightttf": require("./assets/fonts/Raleway-ExtraLight.ttf"),
    "Raleway-Italicttf": require("./assets/fonts/Raleway-Italic.ttf"),
    "Raleway-Lightttf": require("./assets/fonts/Raleway-Light.ttf"),
    "Raleway-Mediumttf": require("./assets/fonts/Raleway-Medium.ttf"),
    "Raleway-Regularttf": require("./assets/fonts/Raleway-Regular.ttf"),
    "Raleway-Thinttf": require("./assets/fonts/Raleway-Thin.ttf"),
  });
};

const App = props => {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  },[]);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => { setFontLoaded(true); }}
        onError={(err) => {console.log(err.message)}}
      />
    );
  }

  return(
    <PaperProvider theme={theme}>
    <NavigationContainer>
      {
        user ? (<TabsNavigator />) : (<OnboardingStack />)
      }
    </NavigationContainer>
    </PaperProvider>
  )
}

export default App;