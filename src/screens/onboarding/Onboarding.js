import react, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./Login";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
const backgroundColor = (isLight) => (isLight ? "blue" : "lightblue");
const color = (isLight) => backgroundColor(!isLight);
import Onboarding from "react-native-onboarding-swiper";

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? "#D8315B" : "#C9C2BB";
  } else {
    backgroundColor = selected ? "#D8315B" : "#C9C2BB";
  }
  return (
    <View
      style={{
        width: 30,
        height: 12,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Done = ({ isLight, ...props }) => (
  <Button
    title={"Finish"}
    color="#D8315B"
    buttonStyle={{
      backgroundColor: backgroundColor(isLight),
    }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
      backgroundColor: backgroundColor(isLight),
    }}
    textStyle={{ color: color(isLight) }}
    {...props}
  />
);

const Skip = ({ isLight, skipLabel, ...props }) => (
  <Button
    title={"Skip"}
    color="#D8315B"
    buttonStyle={{
      backgroundColor: backgroundColor(isLight),
    }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
    }}
    textStyle={{ color: color(isLight) }}
    {...props}
  >
    {skipLabel}
  </Button>
);

const Next = ({ isLight, ...props }) => (
  <Button
    title={"Next"}
    color="#D8315B"
    buttonStyle={{
      backgroundColor: backgroundColor(isLight),
    }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
      backgroundColor: backgroundColor(isLight),
    }}
    textStyle={{ color: color(isLight) }}
    {...props}
  />
);

const OnboardingScreen = (props) => {
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    async function checkShowComponent() {
      const hasShownComponent = await AsyncStorage.getItem("hasShownComponent");
      if (hasShownComponent) {
        setShowComponent(false);
        console.log("hasShowncomponent-----------", hasShownComponent);
      } else {
        await AsyncStorage.setItem("hasShownComponent", "true");
      }
    }
    checkShowComponent();
  }, []);

  const onboardingDonePress = () => {
    props.navigation.navigate("Login");
  };
  const onboardingSkipPress = () => {
    props.navigation.navigate("Login");
  };

  return showComponent ? (
    <Onboarding
      onDone={onboardingDonePress}
      onSkip={onboardingSkipPress}
      DotComponent={Square}
      NextButtonComponent={Next}
      SkipButtonComponent={Skip}
      DoneButtonComponent={Done}
      containerStyles={styles.containerStyles}
      imageContainerStyles={styles.imageContainerStyles}
      titleStyles={styles.titleStyles}
      subTitleStyles={styles.subTitleStyles}
      bottomBarColor="#ebebeb"
      pages={[
        {
          backgroundColor: "#ebebeb",
          image: (
            <Image
              resizeMode="contain"
              style={{ width: "100%", resizeMode: "cover", height: 450 }}
              source={require("../../../assets/images/1.jpg")}
            />
          ),
          title: "Design Your Dream Home",
          subtitle: "with furniture from online stores",
        },

        {
          backgroundColor: "#ebebeb",
          image: (
            <Image
              resizeMode="contain"
              style={{ width: "100%", resizeMode: "cover", height: 450 }}
              source={require("../../../assets/images/3.jpg")}
            />
          ),
          title: "Socialize",
          subtitle: "get advice and valuable feedback from HomeLyne community",
        },

        {
          backgroundColor: "#ebebeb",
          image: (
            <Image
              resizeMode="contain"
              style={{ width: "100%", resizeMode: "cover", height: 450 }}
              source={require("../../../assets/images/2.jpg")}
            />
          ),
          title: "Discover designs",
          subtitle: "and apply what’s most inspired you in to your own room",
        },
      ]}
    />
  ) : (
    <Login />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Overview",
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  containerStyles: {
    backgroundColor: "#ebebeb",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingHorizontal: 0,
    position: "relative",
  },
  imageContainerStyles: {
    position: "absolute",
    top: "30%",
    backgroundColor: "#ebebeb",
    flex: 0,
    alignItems: "center",
    width: "100%",
    marginTop: 50,
    marginBottom: 30,
    paddingBottom: 16,
    paddingTop: 16,
  },
  titleStyles: {
    color: "#D8315B",
    fontFamily: "BebasNeue-Regularttf",
    fontSize: 80,
    letterSpacing: -1.4,
    lineHeight: 84,
    marginTop: 80,
    marginBottom: 0,
    textAlign: "left",
    marginHorizontal: 20,
  },
  subTitleStyles: {
    color: "#000000",
    fontSize: 19,
    lineHeight: 26,
    marginHorizontal: 20,
    marginTop: -20,
    fontFamily: "Raleway-Regularttf",
    textAlign: "left",
  },
});

export default OnboardingScreen;
