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
  FlatList,
  Button,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
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
import Colors from "../../utilis/AppColors";
import Post from "../../components/Post";
const { height, width } = Dimensions.get("window");

const ProfileView = (props) => {
  const [projects, setProjects] = useState([]);
  const [postState, setPostState] = useState();
  const [account, setAccount] = useState(props.route.params.profile);
  const [isLoading, setIsLoading] = useState(false);
  const [myAccount, setMyAccount] = useState(auth.currentUser.uid);
  const [isMe, setIsMe] = useState();
  const [isfollowed, setIsfollowed] = useState(false);
  ///////
  const [isPromember, setIsPromember] = useState(false);

  // console.log("=============USER==========", account);

  const GetAccountSubscription = async () => {
    const accountRef = collection(db, "promembers");
    const accountQuery = query(
      accountRef,
      where("associateId", "==", account.uuid)
    );
    const accountQuerySnapshot = await getDocs(accountQuery);
    if (accountQuerySnapshot.docs.length > 0) {
      setIsPromember(true);
    }
  };

  ////
  const getPublicProject = async () => {
    const projectsRef = collection(db, "projects");
    const projectsQuery = query(projectsRef, where("isPrivate", "==", false));
    const projectsQuerySnapshot = await getDocs(projectsQuery);
    const accountsRef = await getDocs(collection(db, "accounts"));

    setMyAccount(
      accountsRef.docs
        .map((doc) => doc.data())
        .filter((x) => x.uuid == props.route.params.myAccount)[0]
    );

    const connectionsRef = collection(db, "connections");
    const connectionsQuery = query(
      connectionsRef,
      where("followerId", "==", myAccount.uuid) &&
        where("followedId", "==", account.uuid)
    );
    const connectionsQuerySnapshot = await getDocs(connectionsQuery);
    const connections = connectionsQuerySnapshot.docs.map((doc) => doc.data());
    setIsfollowed(connections?.length > 0);
    console.log("connections", isfollowed);

    setProjects(
      projectsQuerySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
          account: accountsRef.docs
            .find((x) => x.data().uuid == doc.data().associateId)
            .data(),
        }))
        .filter((x) => x.associateId == props.route.params.profile.uuid)
    );

    setIsMe(account.uuid == myAccount);
  };

  //// set follower

  const setFollow = async () => {
    console.log("account", account.uuid);
    console.log("myAccount", myAccount.uuid);
    const accountRef = await addDoc(collection(db, "connections"), {
      followedId: account.uuid,
      followerId: myAccount.uuid,
    });
    console.log("Followed");
  };

  useEffect(() => {
    async function getPublicProjects() {
      await getPublicProject();
      await GetAccountSubscription();
    }
    getPublicProjects();
    console.log("-----------");
  }, []);

  const butnClick = () => {
    console.log(projects, account);
  };

  const publisher = props.route.params.profile;

  let levelIcon =
    "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/junior_uouq0h.png";
  if (publisher.points <= 500) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/junior_uouq0h.png";
  } else if (publisher.points > 500 && publisher.points <= 1500) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/young_designer_hh4htn.png";
  } else if (publisher.points > 1500 && publisher.points <= 3000) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/rising_star_uigpeo.png";
  } else if (publisher.points > 3000 && publisher.points <= 5000) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/super_star_ioadpd.png";
  } else if (publisher.points > 5000 && publisher.points <= 7000) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/world_class_designer_gtvp4x.png";
  } else if (publisher.points > 7000) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/master_designer_plz7v0.png";
  }

  return (
    <ScrollView>
      <View style={Style.avatar_container_sub}>
        <View style={{ width: 100, height: 100 }}>
          {account?.avatar ? (
            <Avatar.Image source={{ uri: account?.avatar }} size={100} />
          ) : (
            <Avatar.Image source={"assets/images/avatar.png"} size={100} />
          )}

          <Image
            source={{ uri: levelIcon }}
            style={{
              width: width * 0.1,
              height: width * 0.1,
              display: "flex",
              position: "absolute",
              top: 35,
              left: 80,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("EditProfile");
            }}
          >
            <Image
              source={require("../../../assets/images/suitcase.png")}
              style={{
                borderRadius: 50,
                width: width * 0.09,
                height: width * 0.09,
                display: "flex",
                position: "absolute",
                top: -95,
                left: -5,
              }}
            />
          </TouchableOpacity>
        </View>

        <Text style={Style.name_title}>
          {account.firstName} {account.lastName}
        </Text>
        <Text style={Style.name_level}>{account.coverLetter}</Text>
        {!isMe ? (
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 15 }}
          >
            {isfollowed ? (
              <TouchableOpacity
                style={{
                  // justifyContent: "flex-end",
                  borderColor: "#D8315B",
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderRadius: 24,
                  padding: height * 0.013,
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#D8315B",
                    textTransform: "uppercase",
                  }}
                >
                  Following
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  // justifyContent: "flex-end",
                  borderColor: "#D8315B",
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderRadius: 24,
                  padding: height * 0.013,
                  marginRight: 8,
                }}
                onPress={setFollow}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#D8315B",
                    textTransform: "uppercase",
                  }}
                >
                  Follow
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                // justifyContent: "flex-end",
                borderColor: "#D8315B",
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderRadius: 24,
                padding: height * 0.013,
              }}
              onPress={() => {
                props.navigation.navigate("MessageView", {
                  myAccount: myAccount,
                  receiverAccount: account,
                });
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#D8315B",
                  textTransform: "uppercase",
                }}
              >
                Messages
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {/* //////////////// */}

      {isPromember ? (
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: height * 0.01,
            marginBottom: height * 0.01,
            backgroundColor: "white",
            borderRadius: 15,
            width: width * 0.95,
            alignSelf: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            props.navigation.navigate("ProProfile", {
              profile: account,
            });
          }}
        >
          <View style={{ width: width * 0.2, display: "flex" }}>
            <Image
              source={require("../../../assets/images/furniture.jpg")}
              style={{ width: width * 0.2, height: width * 0.4 }}
            />
          </View>
          <View
            style={{
              width: width * 0.5,
              marginTop: height * 0.04,
              marginBottom: height * 0.05,
              marginLeft: height * 0.02,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>FURNITURE LTD</Text>
            <Text>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../assets/images/greater-than.png")}
              style={{
                height: width * 0.05,
                width: width * 0.05,
                marginTop: height * 0.1,
              }}
            />
          </View>
        </TouchableOpacity>
      ) : null}

      {/* ////////// */}
      <View>
        {!projects.length ? (
          <ActivityIndicator style={{ height: 100 }} />
        ) : (
          <FlatList
            data={projects.sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })}
            keyExtractor={(item) => item.id}
            renderItem={(itemRow) => (
              setPostState(itemRow.item),
              (
                <Post
                  post={itemRow.item}
                  myAccount={auth.currentUser.uid}
                  nav={props.navigation}
                  profileClick={() => {
                    props.navigation.navigate("ProfileInfo", {
                      profile: itemRow.item,
                      myAccount: auth.currentUser.uid,
                    });
                  }}
                />
              )
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  white_btn: {
    borderStyle: "solid",
    borderColor: Colors.pink,
    borderRadius: 30,
    backgroundColor: Colors.white,
    paddingVertical: 14,
    width: width * 0.2,
    alignItems: "center",
  },
  white_btn_text: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.pink,
    fontSize: 20,
  },
});
export const screenOptions = (navData) => {
  return {
    headerTitle: "Profile View",
    headerShown: true,
  };
};

export default ProfileView;
