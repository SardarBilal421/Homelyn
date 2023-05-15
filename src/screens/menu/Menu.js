import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Avatar } from "react-native-paper";
import Style from "../../utilis/AppStyle";
import Colors from "../../utilis/AppColors";
import {
  auth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  db,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  where,
  query,
} from "../../utilis/firebase";

//ICONS
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Menu = (props) => {
  const [account, setAccount] = useState(null);

  // const getAccountData = useCallback(async () => {
  //   const accountsRef = collection(db, "accounts");
  //   const q = query(accountsRef, where("uuid", "==", auth.currentUser.uid));
  //   const querySnapshot = await getDocs(q);
  //   setAccount(querySnapshot.docs[0].data());

  //   console.log("account");
  // }, []);

  useEffect(() => {
    async function getAccountData() {
      const accountsRef = collection(db, "accounts");
      const q = query(accountsRef, where("uuid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      setAccount(querySnapshot.docs[0].data());

      console.log(account);
    }
    getAccountData();
  }, []);

  const [email, setEmail] = useState(auth.currentUser.email);

  return (
    <ScrollView>
      <View style={Style.container}>
        <TouchableOpacity
          style={Style.profile_container}
          onPress={() => {
            props.navigation.navigate("Profile", { account: account });
          }}
        >
          <View style={Style.avatar_container}>
            {account ? (
              <Avatar.Image size={50} source={{ uri: account?.avatar }} />
            ) : (
              <Avatar.Image
                size={50}
                source={require("../../../assets/images/avatar.png")}
              />
            )}
          </View>
          <View style={Style.profile_name}>
            {account ? (
              <Text style={Style.displayName}>
                {account.firstName} {account.lastName}
              </Text>
            ) : (
              <Text style={Style.displayName}>{email}</Text>
            )}
            <Text style={Style.avatar_text}>
              Click here to view/edit your profile
            </Text>
          </View>
        </TouchableOpacity>

        <View style={Style.main_title_container}>
          <Text style={Style.main_title}>SHORTCUTS</Text>
        </View>

        <View style={Style.sub_title_container}>
          <Text style={Style.sub_main_title}>SPACES & PROJECTS</Text>
        </View>

        <TouchableOpacity
          style={Style.menu_blue_btn}
          onPress={() => {
            props.navigation.navigate("SpacesTab");
          }}
        >
          <View style={{ width: 30 }}>
            <Ionicons name="grid-outline" color={Colors.pink} size={20} />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Spaces</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.menu_blue_btn}
          onPress={() => {
            props.navigation.navigate("CreateSpace");
          }}
        >
          <View style={{ width: 30 }}>
            <MaterialCommunityIcons
              name="shape-square-rounded-plus"
              color={Colors.pink}
              size={20}
            />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Create new space</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.menu_blue_btn}
          onPress={() => {
            props.navigation.navigate("CreateSpace");
          }}
        >
          <View style={{ width: 30 }}>
            <MaterialCommunityIcons
              name="ruler"
              color={Colors.pink}
              size={20}
            />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Create new project</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={Style.menu_blue_btn}>
          <View style={{ width: 30 }}>
            <FontAwesome5 name="chair" color={Colors.pink} size={20} />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>
              Explorer home furnitures & assets
            </Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.menu_blue_btn}
          onPress={() => {
            props.navigation.navigate("Community", {
              screen: "Favorites",
            });
          }}
        >
          <View style={{ width: 30 }}>
            <FontAwesome5 name="heart" color={Colors.pink} size={20} />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>My favorites</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <View style={Style.sub_title_container_community}>
          <Text style={Style.sub_main_title}>COMMUNITY</Text>
        </View>

        <TouchableOpacity
          style={Style.menu_blue_btn}
          onPress={() => {
            props.navigation.navigate("CommunityTab");
          }}
        >
          <View style={{ width: 30 }}>
            <Entypo name="network" color={Colors.pink} size={20} />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Community</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.menu_blue_btn}
          onPress={() => {
            props.navigation.navigate("Messages", {
              myAccount: account,
            });
          }}
        >
          <View style={{ width: 30 }}>
            <Ionicons name="chatbubble-sharp" color={Colors.pink} size={20} />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Messages</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.menu_blue_btn}
          onPress={() => {
            props.navigation.navigate("CreateNewProject");
          }}
        >
          <View style={{ width: 30 }}>
            <FontAwesome5 name="pencil-alt" color={Colors.pink} size={20} />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Create new article</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.menu_blue_btn}
          onPress={() => {
            props.navigation.navigate("WhoToFollow");
          }}
        >
          <View style={{ width: 30 }}>
            <Entypo name="users" color={Colors.pink} size={20} />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Find out who to follow</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={Style.menu_blue_btn}>
          <View style={{ width: 30 }}>
            <MaterialCommunityIcons
              name="star-four-points"
              color={Colors.pink}
              size={20}
            />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Find interests</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 1,
            marginVertical: 20,
            backgroundColor: Colors.line,
          }}
        ></View>

        <View style={Style.sub_title_container}>
          <Text style={Style.sub_main_title}>HELP & SUPPORT</Text>
        </View>

        <TouchableOpacity
          style={Style.menu_white_btn}
          onPress={() => {
            props.navigation.navigate("FaqScreen");
          }}
        >
          <View style={{ width: 30 }}>
            <Ionicons name="help-buoy-sharp" color={Colors.pink} size={20} />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>FAQ</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.menu_white_btn}
          onPress={() => {
            props.navigation.navigate("Tutorials");
          }}
        >
          <View style={{ width: 30 }}>
            <FontAwesome5 name="video" color={Colors.pink} size={20} />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Tutorials</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.menu_white_btn}
          onPress={() => {
            props.navigation.navigate("Settings");
          }}
        >
          <View style={{ width: 30 }}>
            <FontAwesome name="gear" color={Colors.pink} size={20} />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Settings</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.menu_white_btn}
          onPress={() => {
            props.navigation.navigate("TermsOfUse");
          }}
        >
          <View style={{ width: 30 }}>
            <MaterialCommunityIcons
              name="check-decagram"
              color={Colors.pink}
              size={20}
            />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Terms of services</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.menu_white_btn}
          onPress={() => {
            props.navigation.navigate("PrivacyPolicy");
          }}
        >
          <View style={{ width: 30 }}>
            <MaterialCommunityIcons
              name="account-lock"
              color={Colors.pink}
              size={20}
            />
          </View>
          <View>
            <Text style={Style.menu_blue_btn_text}>Privacy policy</Text>
          </View>
          <View style={{ width: 30, marginLeft: 20 }}>
            <AntDesign name="right" color={Colors.gray} size={20} />
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 1,
            marginVertical: 20,
            backgroundColor: Colors.line,
          }}
        ></View>

        <TouchableOpacity
          style={Style.button_pink}
          onPress={() => {
            auth.signOut();
          }}
        >
          <Text style={Style.button_pink_text}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Menu",
    headerShown: true,
  };
};

export default Menu;
