import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";

import { Avatar } from "react-native-paper";
import {
  auth,
  db,
  collection,
  getDocs,
  where,
  query,
} from "../../utilis/firebase";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const { height, width } = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();

const MyFollowers = (props) => {
  const [followersData, setFollowersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const getDetails1 = collection(db, "connections");
    const query1 = query(
      getDetails1,
      where("followedId", "==", auth.currentUser.uid)
    );
    const docSnap1 = await getDocs(query1);
    const followerIds = docSnap1.docs.map((doc) => doc.data().followerId);

    const getFollowerDetails = collection(db, "accounts");

    const followerDetailsPromises = followerIds.map((followerId) =>
      getDocs(query(getFollowerDetails, where("uuid", "==", followerId)))
    );

    const followerDetailsSnapshots = await Promise.all(followerDetailsPromises);

    const flattenedFollowerData = followerDetailsSnapshots
      .map((snapshot) => snapshot.docs.map((doc) => doc.data()))
      .flat();

    setFollowersData(flattenedFollowerData);

    // console.log(
    //   "ZERO INDEX DATA=================",
    //   flattenedFollowerData.map((item) => item.uuid)
    // );
    setIsLoading(false);
  };

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      "focus",
      async () => {
        await getData();
      }
    );
    return willFocusSubscription;
  }, []);
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

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="red"
          style={{
            top: height / 2 - 130,
          }}
        />
      ) : (
        <FlatList
          style={{
            height: height * 0.8,
            paddingHorizontal: width * 0.06,
          }}
          data={followersData}
          key={followersData.uuid}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => (
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

                  {item?.points > 0 && (
                    <Image
                      source={{
                        uri: getLevelIcon(item?.points),
                      }}
                      style={{
                        position: "absolute",
                        bottom: 18,
                        right: 57,
                        width: 30,
                        height: 30,
                      }}
                      resizeMode="contain"
                    />
                  )}
                </View>

                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.firstName} {item.lastName}
                </Text>
              </View>
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
                  {item.followed ? "Following" : "Remove"}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const MyFollowing = (props) => {
  const [followingData, setFollowingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    console.log("GETTING DATA");
    const getDetails1 = collection(db, "connections");
    const query1 = query(
      getDetails1,
      where("followerId", "==", auth.currentUser.uid)
    );
    const docSnap1 = await getDocs(query1);
    const followingsData = docSnap1.docs.map((doc) => doc.data());
    const followingIds = followingsData.map((follower) => follower.followedId);
    // console.log("FOLLOWING IDS", followingIds);

    const getFollowingDetails = collection(db, "accounts");

    const followerDetailsPromises = followingIds.map((followerId) =>
      getDocs(query(getFollowingDetails, where("uuid", "==", followerId)))
    );

    const followingDetailsSnapshots = await Promise.all(
      followerDetailsPromises
    );

    // console.log(
    //   "FOLLOWING DETAILS",
    //   followingDetailsSnapshots
    //     .map((snapshot) => snapshot.docs.map((doc) => doc.data()))
    //     .map((data) => data)
    // );
    const flattenedFollowingData = followingDetailsSnapshots
      .map((snapshot) => snapshot.docs.map((doc) => doc.data()))
      .flat();
    setFollowingData(flattenedFollowingData);
    setIsLoading(false);
  };

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      "focus",
      async () => {
        await getData();
      }
    );
    return willFocusSubscription;
  }, []);

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

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="red"
          style={{
            top: height / 2 - 130,
          }}
        />
      ) : (
        <FlatList
          style={{
            height: height * 0.8,
            paddingHorizontal: width * 0.06,
          }}
          data={followingData}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => (
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
                        uri: getLevelIcon(item?.points),
                      }}
                      style={{
                        position: "absolute",
                        bottom: 18,
                        right: 57,
                        width: 30,
                        height: 30,
                      }}
                      resizeMode="contain"
                    />
                  )}
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.firstName} {item.lastName}
                </Text>
              </View>
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
                  Following
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const FollowersTab = (props) => {
  const marginLeftValue = useRef(new Animated.Value(0)).current;
  return (
    <Tab.Navigator
      tabBar={({ navigation }) => {
        const myFunc = () => {
          for (let i = 0; i < 2; i++) {
            if (navigation?.getState()?.index == i) {
              Animated.timing(marginLeftValue, {
                toValue: width * 0.5 * i,
                duration: 200,
                useNativeDriver: false,
              }).start();
            }
          }
        };
        myFunc();
        return (
          <View
            style={{
              width: width,
              flexDirection: "row",
              backgroundColor: "#C9C2BB",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: width * 0.5,
                alignItems: "center",
                paddingVertical: height * 0.03,
                backgroundColor:
                  navigation.getState().index == 0 ? "#000" : "#C9C2BB",
              }}
              onPress={() => {
                navigation.navigate("Followers");
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: navigation.getState().index == 0 ? "#FFF" : "#000",
                }}
              >
                Followers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: width * 0.5,
                alignItems: "center",
                paddingVertical: height * 0.03,
                backgroundColor:
                  navigation.getState().index == 1 ? "#000" : "#C9C2BB",
              }}
              onPress={() => {
                navigation.navigate("Following");
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: navigation.getState().index == 1 ? "#FFF" : "#000",
                }}
              >
                Following
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
      initialRouteName="Followers"
      screenOptions={{
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "#000",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#C9C2BB",
        },
      }}
    >
      <Tab.Screen name="Followers" component={MyFollowers} />
      <Tab.Screen name="Following" component={MyFollowing} />
    </Tab.Navigator>
  );
};

const Followers = ({ props }) => {
  return (
    <View style={styles.container}>
      <FollowersTab />
    </View>
  );
};

export default Followers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
