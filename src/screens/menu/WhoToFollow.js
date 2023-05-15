import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";

// import { screenOptions } from './Messages'
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
const { height, width } = Dimensions.get("window");
const WhoToFollow = () => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [followed, setfollowed] = useState(false);

  const getLevelIcon = (points) => {
    let levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/junior_uouq0h.png";
    if (points > 500 && points <= 1500) {
      levelIcon =
        "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/young_designer_hh4htn.png";
    } else if (points > 1500 && points <= 3000) {
      levelIcon =
        "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/rising_star_uigpeo.png";
    } else if (points > 3000 && points <= 5000) {
      levelIcon =
        "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/super_star_ioadpd.png";
    } else if (points > 5000 && points <= 7000) {
      levelIcon =
        "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/world_class_designer_gtvp4x.png";
    } else if (points > 7000) {
      levelIcon =
        "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/master_designer_plz7v0.png";
    }
    return levelIcon;
  };

  //// set follower

  const setFollow = async (item) => {
    console.log("account", item.uuid);
    console.log("myAccount", auth.currentUser.uid);
    const accountRef = await addDoc(collection(db, "connections"), {
      followedId: item.uuid,
      followerId: auth.currentUser.uid,
    });

    setfollowed([
      ...followed,
      {
        followedId: item.uuid,
        followerId: auth.currentUser.uid,
      },
    ]);
    // setfollowed({ ...followed, accountRef });
  };

  const getUsers = async () => {
    try {
      setisLoading(true);
      const accountsRef = await getDocs(collection(db, "accounts"));
      const accounts = accountsRef.docs.map((x) => x.data());
      // console.log(
      //   "accounts",
      //   accounts.filter((x) => x.uuid !== auth.currentUser.uid)
      // );

      const connectionsRef = collection(db, "connections");
      const connectionsQuery = query(
        connectionsRef,
        where("followerId", "==", auth.currentUser.uid)
      );
      const connectionsQuerySnapshot = await getDocs(connectionsQuery);
      const connections = connectionsQuerySnapshot.docs.map((doc) =>
        doc.data()
      );
      setfollowed(connections);

      const con = connections.map((x) => x.followedId);

      setAllAccounts(
        accounts
          .filter((x) => x.uuid !== auth.currentUser.uid)
          .filter((x) => !con.includes(x.uuid))
      );

      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };
  useEffect(() => {
    // setTimeout(() => {
    getUsers();

    // }, 3000);
  }, []);
  //   getUsers()
  return (
    // <div>WhoToFollow</div>
    <>
      {isLoading ? (
        <ActivityIndicator
          style={{
            marginTop: height * 0.1,
          }}
        />
      ) : (
        <FlatList
          //    style={{flex:1,backgroundColor:'blue',height:height*0.1}}
          style={{
            flex: 1,
            paddingHorizontal: width * 0.09,
          }}
          data={allAccounts}
          keyExtractor={(items) => items.uuid}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: height * 0.02,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ position: "relative" }}>
                      {/* <Avatar.Image
                        source={{ uri: item.avatar }}
                        size={60}
                        style={{ marginHorizontal: 10 }}
                      /> */}
                      {item?.avatar ? (
                        <Avatar.Image
                          source={{ uri: item?.avatar }}
                          size={60}
                          style={{ marginHorizontal: 10 }}
                        />
                      ) : (
                        <Avatar.Image
                          source={"assets/images/avatar.png"}
                          size={60}
                          style={{ marginHorizontal: 10 }}
                        />
                      )}

                      {item.points > 0 && (
                        <Image
                          source={{
                            uri: getLevelIcon(item.points),
                          }}
                          style={{
                            position: "absolute",
                            bottom: 18,
                            right: 50,
                            width: 30,
                            height: 30,
                          }}
                          resizeMode="contain"
                        />
                      )}
                    </View>

                    <Text style={{ fontSize: 18 }}>
                      {item.firstName} {item.lastName}
                      {/* hjgjhgjhgjhgj */}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setFollow(item);
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "flex-end",
                        borderColor: "#D8315B",
                        backgroundColor: "#FFFFFF",
                        borderWidth: 1,
                        borderRadius: 20,
                        padding: height * 0.01,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "#D8315B",
                        }}
                      >
                        {followed.some((x) => x.followedId === item.uuid)
                          ? "Following"
                          : "Follow"}
                        {/* Follow */}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    height: 1,
                    backgroundColor: "grey",
                    borderBottomWidth: 1,
                    borderBottomColor: "grey",
                    marginVertical: height * 0.01,
                  }}
                ></View>
              </>
            );
          }}
        />
      )}
    </>
  );
};
export const screenOptions = () => {
  return {
    headerTitle: "People You May Know",
    headerShown: true,
  };
};
export default WhoToFollow;
