import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../../utilis/AppColors";
import { Avatar } from "react-native-paper";
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
  firebase,
} from "../../utilis/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

const Dashboard = (props) => {
  const [account, setAccount] = useState(null);
  const [image, setImage] = useState("");
  const [accountId, setAccountId] = useState();

  //   const getAccountData = useCallback(async () => {
  //     const accountsRef = collection(db, "accounts");
  //     const q = query(accountsRef, where("uuid", "==", auth.currentUser.uid));
  //     const querySnapshot = await getDocs(q);
  //     setImage(querySnapshot.docs[0].data().avatar);
  //     setAccountId(querySnapshot.docs[0].id);
  //     setAccount(querySnapshot.docs[0].data());
  //     console.log("Dashboard");
  //   }, []);

  useEffect(() => {
    async function getAccountData() {
      const accountsRef = collection(db, "accounts");
      const q = query(accountsRef, where("uuid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      setImage(querySnapshot.docs[0].data().avatar);
      setAccountId(querySnapshot.docs[0].id);
      setAccount(querySnapshot.docs[0].data());
      console.log("Dashboard");
    }
    getAccountData();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/homelyne_full.png")}
            style={{ width: 100, height: 30 }}
          />
        </View>

        <View style={{ height: "100%", justifyContent: "center", width: 40 }}>
          <Ionicons size={30} color={Colors.gray_1} name="md-search-outline" />
        </View>
        <View style={{ height: "100%", justifyContent: "center", width: 40 }}>
          <Ionicons
            size={30}
            color={Colors.gray_1}
            name="md-notifications-outline"
          />
        </View>

        <TouchableOpacity
          style={styles.avatar_container}
          onPress={() => {
            props.navigation.navigate("Profile", { account: account });
          }}
        >
          {account?.avatar && (
            <Avatar.Image size={40} source={{ uri: account.avatar }} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.containerA}>
        <View style={styles.shadeB}>
          <Text style={styles.white_title}>CREATE</Text>
          <Text style={styles.white_title}>YOUR</Text>
          <Text style={styles.white_title}>DESIGN</Text>
          <Text style={styles.white_title}>SPACE</Text>
          <TouchableOpacity
            style={styles.white_btn}
            onPress={() => {
              props.navigation.navigate("SpacesTab");
            }}
          >
            <Text style={styles.white_btn_text}>CREATE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.shadeA}></View>
        <View style={styles.image2_container}>
          <Image
            style={{ resizeMode: "cover", width: "100%", height: 450 }}
            source={require("../../../assets/images/dash_1.png")}
          />
        </View>
      </View>
      <View style={styles.containerB}>
        <View style={styles.get_inspire_container}>
          <Text style={styles.get_inspire_pink}>GET</Text>
          <Text style={styles.get_inspire_pink}>INSPIRED</Text>
          <Text style={styles.get_inspire_white}>BY PRO</Text>
          <TouchableOpacity
            style={styles.white_btn}
            onPress={() => {
              props.navigation.navigate("CommunityTab");
            }}
          >
            <Text style={styles.white_btn_text}>DISCOVER</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.image2_container}>
          <Image
            style={{ resizeMode: "cover", width: "100%", height: 300 }}
            source={require("../../../assets/images/dash_2.png")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  get_inspire_container: {
    left: 20,
    top: 20,
    position: "absolute",
    zIndex: 100,
  },
  avatar_container: {
    width: 50,
    marginRight: 10,
    height: "100%",
    justifyContent: "center",
  },

  get_inspire_pink: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.pink,
    fontSize: 46,
    lineHeight: 46,
    marginTop: -5,
  },
  get_inspire_white: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.white,
    fontSize: 46,
    lineHeight: 46,
    marginTop: -5,
  },

  white_btn: {
    borderRadius: 30,
    backgroundColor: Colors.white,
    paddingVertical: 14,
    width: 160,
    alignItems: "center",
  },
  white_btn_text: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.pink,
    fontSize: 30,
  },
  white_title: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.white,
    fontSize: 60,
    lineHeight: 60,
    marginTop: -7,
  },

  shadeB: {
    width: "50%",
    height: "100%",
    position: "absolute",
    zIndex: 110,
    top: 50,
    left: 20,
  },

  shadeA: {
    width: "50%",
    height: "100%",
    backgroundColor: Colors.black,
    position: "absolute",
    zIndex: 100,
    top: 0,
    left: 0,
    opacity: 0.4,
  },
  image2_container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  header: {
    height: "10%",
    width: "100%",
    backgroundColor: Colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerA: {
    height: "55%",
    backgroundColor: Colors.gray_1,
  },
  containerB: {
    height: "35%",
    backgroundColor: Colors.gray,
    position: "relative",
    overflow: "hidden",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Dashboard",
    headerShown: false,
  };
};

export default Dashboard;
