import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Alert,
  Modal,
  Button,
} from "react-native";
import { Avatar } from "react-native-paper";
import Style from "../../utilis/AppStyle";
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Profile = (props) => {
  const [account, setAccount] = useState(props.route.params.account);
  const [modalVisible, setModalVisible] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [projects, setProjects] = useState([]);
  const [follower, setFollower] = useState();
  const [followed, setFollowed] = useState();

  const getAccountData = async () => {
    const spacesRef = collection(db, "spaces");
    const qspacesQuery = query(
      spacesRef,
      where("associateId", "==", auth.currentUser.uid)
    );
    const spacesQuerySnapshot = await getDocs(qspacesQuery);

    setSpaces(
      spacesQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );

    const projectsRef = collection(db, "projects");
    const projectsQuery = query(
      projectsRef,
      where("associateId", "==", auth.currentUser.uid)
    );
    const projectsQuerySnapshot = await getDocs(projectsQuery);

    setProjects(
      projectsQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );

    const getDetails1 = await collection(db, "connections");
    const query1 = query(getDetails1, where("followedId", "==", account.uuid));
    const docSnap1 = await getDocs(query1);
    setFollower(docSnap1.docs.map((doc) => doc.data()));

    const query2 = query(getDetails1, where("followerId", "==", account.uuid));
    const docSnap2 = await getDocs(query2);
    setFollowed(docSnap2.docs.map((doc) => doc.data()));
  };

  const [count, setCount] = useState(0);

  const handleButtonClick = async () => {
    setCount(count + 1);

    /////////////////////////////////

    // SomeOneFollowed YOU

    // const accountsRef = await addDoc(collection(db, "connections"), {
    //   followerId: "1lnj8NTsfxgo5aoHLphqtZXMLOg1",
    //   followedId: account.uuid,
    // });

    /////////////////////////////////

    // You Followed SomONE

    // const accountsRef = await addDoc(collection(db, "connections"), {
    //   followedId: "1lnj8NTsfxgo5aoHLphqtZXMLOg1",
    //   followerId: account.uuid,
    // });

    // console.log(
    //   docSnap.docs.map((d) => {
    //     console.log(d.data());
    //   })
    // );

    // const accountRef = doc(collection(db, "accounts"), "ZmvaLNeVrEgvgrYnXr15"); // specify the document to update using its ID
    // await updateDoc(accountRef, {
    //   // update the document directly, no need for a query
    //   followers: docSnap.docs.length,
    // });

    //  onsole.log("//////////////////////////////////");

    // if (docSnap.exists) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  };

  useEffect(() => {
    getAccountData();
  }, []);

  return (
    <ScrollView>
      <View style={Style.container_nopadding}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={Style.centeredView}>
            <View style={Style.modalView}>
              <Text style={Style.modalText}>Levels & Points</Text>

              <View style={Style.level_container}>
                <View style={Style.level_icon_container}>
                  <Image
                    source={require("../../../assets/images/levels/junior.png")}
                    style={{ width: 60, height: 60 }}
                  />
                </View>
                <View style={Style.level_desc_container}>
                  <Text style={Style.level_name}>Junior</Text>
                  <Text style={Style.level_name_points}>0-500 points</Text>
                </View>
              </View>

              <View style={Style.level_container}>
                <View style={Style.level_icon_container}>
                  <Image
                    source={require("../../../assets/images/levels/young_designer.png")}
                    style={{ width: 60, height: 60 }}
                  />
                </View>
                <View style={Style.level_desc_container}>
                  <Text style={Style.level_name}>Young Designer</Text>
                  <Text style={Style.level_name_points}>501-1,500 points</Text>
                </View>
              </View>

              <View style={Style.level_container}>
                <View style={Style.level_icon_container}>
                  <Image
                    source={require("../../../assets/images/levels/rising_star.png")}
                    style={{ width: 60, height: 60 }}
                  />
                </View>
                <View style={Style.level_desc_container}>
                  <Text style={Style.level_name}>Rising Star</Text>
                  <Text style={Style.level_name_points}>
                    1,501-3,000 points
                  </Text>
                </View>
              </View>

              <View style={Style.level_container}>
                <View style={Style.level_icon_container}>
                  <Image
                    source={require("../../../assets/images/levels/super_star.png")}
                    style={{ width: 60, height: 60 }}
                  />
                </View>
                <View style={Style.level_desc_container}>
                  <Text style={Style.level_name}>Super Star</Text>
                  <Text style={Style.level_name_points}>
                    3,001-5,000 points
                  </Text>
                </View>
              </View>

              <View style={Style.level_container}>
                <View style={Style.level_icon_container}>
                  <Image
                    source={require("../../../assets/images/levels/world_class_designer.png")}
                    style={{ width: 60, height: 60 }}
                  />
                </View>
                <View style={Style.level_desc_container}>
                  <Text style={Style.level_name}>World Class Designer</Text>
                  <Text style={Style.level_name_points}>
                    5,001-7,000 points
                  </Text>
                </View>
              </View>

              <View style={Style.level_container}>
                <View style={Style.level_icon_container}>
                  <Image
                    source={require("../../../assets/images/levels/master_designer.png")}
                    style={{ width: 60, height: 60 }}
                  />
                </View>
                <View style={Style.level_desc_container}>
                  <Text style={Style.level_name}>Master Designer</Text>
                  <Text style={Style.level_name_points}>
                    7,001-10,000 points
                  </Text>
                </View>
              </View>

              <Pressable
                style={[Style.button, Style.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={Style.textStyle}>Got It!</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={Style.avatar_container_sub}>
          <View style={{ width: 100, height: 100 }}>
            <Avatar.Image size={100} source={{ uri: account.avatar }} />
          </View>

          <Text style={Style.name_title}>
            {account.firstName} {account.lastName}
          </Text>
          <Text style={Style.name_level}>{account.coverLetter}</Text>
        </View>

        <View style={Style.summery_container}>
          <View style={Style.summery_row}>
            <TouchableOpacity
              style={Style.row_item}
              onPress={() => setModalVisible(true)}
            >
              <Text style={Style.item_title}>{account.points}</Text>
              <Text style={Style.item_desc}>Points</Text>
            </TouchableOpacity>
            <View style={Style.row_item}>
              {spaces.length > 0 ? (
                <Text style={Style.item_title}>{spaces.length}</Text>
              ) : (
                <Text style={Style.item_title}>0</Text>
              )}

              <Text style={Style.item_desc}>Spaces</Text>
            </View>
            <View style={Style.row_item}>
              {projects.length > 0 ? (
                <Text style={Style.item_title}>{projects.length}</Text>
              ) : (
                <Text style={Style.item_title}>0</Text>
              )}
              <Text style={Style.item_desc}>Projects</Text>
            </View>
          </View>
          <View style={Style.summery_row}>
            <View style={Style.row_item}>
              <Text style={Style.item_title}>0</Text>
              <Text style={Style.item_desc}>Posts</Text>
            </View>
            <View style={Style.row_item}>
              {follower?.length > 0 ? (
                <Text style={Style.item_title}>{follower.length}</Text>
              ) : (
                <Text style={Style.item_title}>0</Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Followers", {
                    followerAA: followed,
                  });
                }}
              >
                <Text style={Style.item_desc}>Followers</Text>
              </TouchableOpacity>
            </View>
            <View style={Style.row_item}>
              {followed?.length > 0 ? (
                <Text style={Style.item_title}>{followed.length}</Text>
              ) : (
                <Text style={Style.item_title}>0</Text>
              )}

              <Text style={Style.item_desc}>Following</Text>
            </View>
          </View>
        </View>
      </View>

      {/* <View>
        <TouchableOpacity onPress={handleButtonClick}>
          <Text style={Style.button}>Click me</Text>
        </TouchableOpacity>
        <Text>You clicked the button {count} times</Text>
      </View> */}
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Profile",
    headerShown: true,
    headerRight: () => (
      <MaterialIcons
        onPress={() => {
          navData.navigation.navigate("EditProfile");
        }}
        name="edit"
        color="#ffffff"
        size={28}
      />
    ),
  };
};

export default Profile;
