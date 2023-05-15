import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Latest from '../screens/community/Latest';
// import { NavigationContainer } from "@react-navigation/native";

//ICONS
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

const defaultNavOptions = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "#D8315B" : "#D8315B",
  },
  headerTitleStyle: { fontFamily: "Raleway-Mediumttf" },
  headerBackTitleStyle: { fontFamily: "Raleway-Mediumttf" },
  headerTintColor: Platform.OS === "android" ? "#FFFFFF" : "#FFFFFF",
};

//SCREENS
import OnboardingScreen, {
  screenOptions as OnboardingScreenOptions,
} from "../screens/onboarding/Onboarding";
import LoginScreen, {
  screenOptions as LoginScreenOptions,
} from "../screens/onboarding/Login";
import Welcome, {
  screenOptions as WelcomeScreenOptions,
} from "../screens/onboarding/Welcome";
import SignUpWithEmail, {
  screenOptions as SignUpWithEmailScreenOptions,
} from "../screens/onboarding/SignUpWithEmail";
import PrivacyPolicyScreen, {
  screenOptions as PrivacyPolicyScreenOptions,
} from "../screens/onboarding/PrivacyPolicy";
import TermsOfUseScreen, {
  screenOptions as TermsOfUseScreenOptions,
} from "../screens/onboarding/TermsOfUse";

import CommunityScreen, {
  screenOptions as CommunityScreenOptions,
} from "../screens/community/Community";
import ProfileViewScreen, {
  screenOptions as ProfileViewScreenOptions,
} from "../screens/community/ProfileView";
import PostViewScreen, {
  screenOptions as PostViewScreenOptions,
} from "../screens/community/PostView";
// import CreateNewProject,{screenOptions as CreateNewProjectScreenOptions} from '../screens/spaces/CreateNewProject';
import Messages, {
  screenOptions as MessageOptions,
} from "../screens/menu/Messages";

import DashboardScreen, {
  screenOptions as DashboardScreenOptions,
} from "../screens/dashboard/Dashboard";

import MenuScreen, {
  screenOptions as MenuScreenOptions,
} from "../screens/menu/Menu";
import ProfileScreen, {
  screenOptions as ProfileScreenOptions,
} from "../screens/menu/Profile";
import EditProfileScreen, {
  screenOptions as EditProfileScreenOptions,
} from "../screens/menu/EditProfile";
import PromemberScreen, {
  screenOptions as PromemberScreenOptions,
} from "../screens/menu/Promember";
import FaqScreen, {
  screenOptions as FaqScreenOptions,
} from "../screens/menu/Faq";
import SettingsScreen, {
  screenOptions as SettingsScreenOptions,
} from "../screens/menu/Settings";
import TutorialsScreen, {
  screenOptions as TutorialsScreenOptions,
} from "../screens/menu/Tutorials";

import SpacesScreen, {
  screenOptions as SpacesScreenOptions,
} from "../screens/spaces/Spaces";
import CreateSpaceScreen, {
  screenOptions as CreateSpaceScreenOptions,
} from "../screens/spaces/CreateSpace";
import SpacePageScreen, {
  screenOptions as SpacePageScreenOptions,
} from "../screens/spaces/SpacePage";
import CreateNewProjectScreen, {
  screenOptions as CreateNewProjectScreenOptions,
} from "../screens/spaces/CreateNewProject";
import ProProfileView, {
  screenOptions as ProProfileViewScreenOptions,
} from "../screens/community/ProProfileView";
import Followers, {
  screenOptions as FollowerScreenOption,
} from "../screens/menu/Followers";
import MessageView, {
  screenOptions as MessageViewOptions,
} from "../screens/menu/MessageView";
import WhoToFollow, {
  screenOptions as WhoToFollowScreenOptions,
} from "../screens/menu/WhoToFollow";

//STACKS
const OnboardingStackNavigator = createNativeStackNavigator();
export const OnboardingStack = () => {
  const [showComponent, setShowComponent] = useState(true);
  useEffect(() => {
    // setValue(props)
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
  return (
    <OnboardingStackNavigator.Navigator
      initialRouteName={!showComponent ? "Onboarding" : "Login"}
      screenOptions={defaultNavOptions}
    >
      <OnboardingStackNavigator.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={OnboardingScreenOptions}
      />
      <OnboardingStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={LoginScreenOptions}
      />
      <OnboardingStackNavigator.Screen
        name="Welcome"
        component={Welcome}
        options={WelcomeScreenOptions}
      />
      <OnboardingStackNavigator.Screen
        name="SignUpWithEmail"
        component={SignUpWithEmail}
        options={SignUpWithEmailScreenOptions}
      />
      <OnboardingStackNavigator.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={PrivacyPolicyScreenOptions}
      />
      <OnboardingStackNavigator.Screen
        name="TermsOfUse"
        component={TermsOfUseScreen}
        options={TermsOfUseScreenOptions}
      />
    </OnboardingStackNavigator.Navigator>
  );
};

// const TopTab = createMaterialTopTabNavigator();

// const TopbarNavigator = ()=>{
//   return(
//     <TopTab.Navigator>
//     <TopTab.Screen name="Latest" component={Community} />
//       <TopTab.Screen name="Favorites" component={Latest} />
//     </TopTab.Navigator>
//   )
// }

const CommunityStackNavigator = createNativeStackNavigator();
export const CommunityStack = () => {
  return (
    // <NavigationContainer>
    <CommunityStackNavigator.Navigator screenOptions={defaultNavOptions}>
      {/* <CommunityStackNavigator.Screen name='topNavigator' component={TopbarNavigator}/> */}
      <CommunityStackNavigator.Screen
        name="Community"
        component={CommunityScreen}
        options={CommunityScreenOptions}
      />
      <CommunityStackNavigator.Screen
        name="ProfileInfo"
        component={ProfileViewScreen}
        options={ProfileViewScreenOptions}
      />
      <CommunityStackNavigator.Screen
        name="MessageView"
        component={MessageView}
        options={MessageViewOptions}
      />
      <CommunityStackNavigator.Screen
        name="PostInfo"
        component={PostViewScreen}
        options={PostViewScreenOptions}
      />

      <CommunityStackNavigator.Screen
        name="ProProfile"
        component={ProProfileView}
        options={ProProfileViewScreenOptions}
      />
      <CommunityStackNavigator.Screen
        name="Followers"
        component={Followers}
        options={FollowerScreenOption}
      />
    </CommunityStackNavigator.Navigator>

    // </NavigationContainer>
  );
};
const DashboardStackNavigator = createNativeStackNavigator();
export const DashboardStack = () => {
  return (
    <DashboardStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <DashboardStackNavigator.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={DashboardScreenOptions}
      />
      <DashboardStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={ProfileScreenOptions}
      />
      <DashboardStackNavigator.Screen
        name="Followers"
        headerTitle={"Become a Pro Member"}
        component={Followers}
        options={FollowerScreenOption}
      />
      <DashboardStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={EditProfileScreenOptions}
      />
    </DashboardStackNavigator.Navigator>
  );
};
const SpacesStackNavigator = createNativeStackNavigator();
export const SpacesStack = () => {
  return (
    <SpacesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SpacesStackNavigator.Screen
        name="Spaces"
        component={SpacesScreen}
        options={SpacesScreenOptions}
      />
      <SpacesStackNavigator.Screen
        name="CreateSpace"
        component={CreateSpaceScreen}
        options={CreateSpaceScreenOptions}
      />
      <SpacesStackNavigator.Screen
        name="SpacePage"
        component={SpacePageScreen}
        options={SpacePageScreenOptions}
      />
    </SpacesStackNavigator.Navigator>
  );
};
const MenuStackNavigator = createNativeStackNavigator();
export const MenuStack = () => {
  return (
    <MenuStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <MenuStackNavigator.Screen
        name="Menu"
        component={MenuScreen}
        options={MenuScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={ProfileScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={EditProfileScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="Promember"
        component={PromemberScreen}
        options={PromemberScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="CreateSpace"
        component={CreateSpaceScreen}
        options={CreateSpaceScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="FaqScreen"
        component={FaqScreen}
        options={FaqScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="Tutorials"
        component={TutorialsScreen}
        options={TutorialsScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={SettingsScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="TermsOfUse"
        component={TermsOfUseScreen}
        options={TermsOfUseScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={PrivacyPolicyScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="Messages"
        component={Messages}
        options={MessageOptions}
      />
      <MenuStackNavigator.Screen
        name="MessageView"
        component={MessageView}
        options={MessageViewOptions}
      />
      <MenuStackNavigator.Screen
        name="Community"
        component={CommunityScreen}
        options={CommunityScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="CreateNewProject"
        component={CreateNewProjectScreen}
        options={CreateNewProjectScreenOptions}
      />
      <MenuStackNavigator.Screen
        name="Followers"
        headerTitle={"Become a Pro Member"}
        component={Followers}
        options={FollowerScreenOption}
      />
      <MenuStackNavigator.Screen
        name="WhoToFollow"
        component={WhoToFollow}
        options={WhoToFollowScreenOptions}
      />
    </MenuStackNavigator.Navigator>
  );
};

//BOTTOM TABS NAVIGATOR
const Tab = createMaterialBottomTabNavigator();
export const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="DashboardTab"
      activeColor="#D8315B"
      inactiveColor="#ffffff"
      barStyle={{ backgroundColor: "#1E1B18" }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="home"
              color={color}
              size={28}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SpacesTab"
        component={SpacesStack}
        options={{
          tabBarLabel: "Spaces",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="grid-outline"
              color={color}
              size={28}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CommunityTab"
        component={CommunityStack}
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ color }) => (
            <Entypo
              name="network"
              color={color}
              size={28}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuStack}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="menu"
              color={color}
              size={28}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
