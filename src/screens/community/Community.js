import React, { useEffect, useCallback, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  Alert,
  Modal,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";

import CheckBox from "expo-checkbox";
import { Avatar, TextInput } from "react-native-paper";
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

import MaterialIcons from "@expo/vector-icons/Feather";
import MIcons from "@expo/vector-icons/MaterialIcons";
import Post from "../../components/Post";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as ImagePicker from "expo-image-picker";

const { height, width } = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();

const CommunityScreen = (props) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [projects, setProjects] = useState([]);

  const getPublicProject = useCallback(async () => {
    const projectsRef = collection(db, "projects");
    const projectsQuery = query(projectsRef, where("isPrivate", "==", false));
    const projectsQuerySnapshot = await getDocs(projectsQuery);
    const accountsRef = await getDocs(collection(db, "accounts"));
    console.log("---", auth.currentUser.uid);
    setProjects(
      projectsQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        account: accountsRef.docs
          .find((x) => x.data().uuid == doc.data().associateId)
          .data(),
      }))
    );

    console.log("hellloo");
  }, []);

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      "focus",
      async () => {
        await getPublicProject();
      }
    );
    return willFocusSubscription;
  }, []);

  const [postState, setPostState] = useState();

  return (
    <View style={Style.container}>
      {projects.length > 0 && (
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
                    profile: itemRow.item.account,
                    myAccount: auth.currentUser.uid,
                  });
                }}
              />
            )
          )}
        />
      )}
    </View>
  );
};

const FavoritesScreen = (props) => {
  const [projects, setProjects] = useState([]);

  const getPublicProjects = useCallback(async () => {
    const projectsRef = collection(db, "projects");
    const projectsQuery = query(projectsRef, where("isPrivate", "==", false));
    const projectsQuerySnapshot = await getDocs(projectsQuery);
    const accountsRef = await getDocs(collection(db, "accounts"));

    setProjects(
      projectsQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        account: accountsRef.docs
          .find((x) => x.data().uuid == doc.data().associateId)
          .data(),
      }))
    );
    console.log("hellloo12");
  }, []);

  // useEffect(() => {
  //   getPublicProjects();
  // }, []);

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      "focus",
      async () => {
        await getPublicProjects();
      }
    );
    return willFocusSubscription;
  }, []);

  const [postState, setPostState] = useState();

  return (
    <View style={Style.container}>
      {projects.length > 0 && (
        <FlatList
          data={projects.filter(
            (x) =>
              x.likesCount.length > 0 &&
              x.likesCount
                .map((f) => f.associateId)
                .includes(auth.currentUser.uid)
          )}
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
                    profile: itemRow.item.account,
                    myAccount: auth.currentUser.uid,
                  });
                }}
              />
            )
          )}
        />
      )}
    </View>
  );
};

const SearchScreen = (props) => {
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [postState, setPostState] = useState();

  const getPublicProjects = useCallback(async () => {
    const projectsRef = collection(db, "projects");
    const projectsQuery = query(projectsRef, where("isPrivate", "==", false));
    const projectsQuerySnapshot = await getDocs(projectsQuery);
    const accountsRef = await getDocs(collection(db, "accounts"));

    setProjects(
      projectsQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        account: accountsRef.docs
          .find((x) => x.data().uuid == doc.data().associateId)
          .data(),
      }))
    );
    console.log("hellloo123");
  }, []);

  // useEffect(() => {
  //   getPublicProjects();
  // }, []);

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      "focus",
      async () => {
        await getPublicProjects();
      }
    );
    return willFocusSubscription;
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <TextInput
          style={[
            styles.searchInput,
            { width: width * 0.8, marginLeft: width * 0.05 },
          ]}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Search by project name"
          placeholderTextColor="#a8a8a8"
        />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Latest");
          }}
          style={{
            // backgroundColor: "blue",
            padding: height * 0.01,
            marginTop: height * 0.03,
          }}
        >
          <MIcons name="cancel" size={25} color="#D8315B" />
        </TouchableOpacity>
      </View>
      {filteredProjects.length > 0 ? (
        <FlatList
          data={filteredProjects.sort(function (a, b) {
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
                    profile: itemRow.item.account,
                    myAccount: auth.currentUser.uid,
                  });
                }}
              />
            )
          )}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      )}
    </View>
  );
};

const FilterScreen = (props) => {
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterState, setFilterState] = useState({
    filter1: false,
    filter2: false,
    filter3: false,
  });

  const getPublicProjects = useCallback(async () => {
    const projectsRef = collection(db, "projects");
    const projectsQuery = query(projectsRef, where("isPrivate", "==", false));
    const projectsQuerySnapshot = await getDocs(projectsQuery);
    const accountsRef = await getDocs(collection(db, "accounts"));

    setProjects(
      projectsQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        account: accountsRef.docs
          .find((x) => x.data().uuid == doc.data().associateId)
          .data(),
      }))
    );
    console.log("hellloo1234");
  }, []);

  // useEffect(() => {
  //   getPublicProjects();
  // }, []);

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      "focus",
      async () => {
        await getPublicProjects();
      }
    );
    return willFocusSubscription;
  }, []);

  const applyFilters = () => {
    let filteredProjects = projects;
    if (filterState.filter1) {
      filteredProjects = filteredProjects.filter(
        (project) => project.filter1 === true
      );
    }
    if (filterState.filter2) {
      filteredProjects = filteredProjects.filter(
        (project) => project.filter2 === true
      );
    }
    if (filterState.filter3) {
      filteredProjects = filteredProjects.filter(
        (project) => project.filter3 === true
      );
    }
    return filteredProjects;
  };

  const handleFilter1 = () => {
    setFilterState((prevState) => ({
      ...prevState,
      filter1: !prevState.filter1,
    }));
  };

  const handleFilter2 = () => {
    setFilterState((prevState) => ({
      ...prevState,
      filter2: !prevState.filter2,
    }));
  };

  const handleFilter3 = () => {
    setFilterState((prevState) => ({
      ...prevState,
      filter3: !prevState.filter3,
    }));
  };

  const filteredProjects = applyFilters().filter((project) =>
    project.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter by:</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={filterState.filter1}
            onValueChange={handleFilter1}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Filter 1</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={filterState.filter2}
            onValueChange={handleFilter2}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Filter 2</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={filterState.filter3}
            onValueChange={handleFilter3}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Filter 3</Text>
        </View>
      </View>
      {filteredProjects.length > 0 ? (
        <FlatList
          data={filteredProjects
            .filter((project) => {
              return (
                (filterState.filter1 && project.filter1) ||
                (filterState.filter2 && project.filter2) ||
                (filterState.filter3 && project.filter3)
              );
            })
            .sort(function (a, b) {
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
                    profile: itemRow.item.account,
                    myAccount: auth.currentUser.uid,
                  });
                }}
              />
            )
          )}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      )}
    </View>
  );
};

const MyTabNavigator = (props) => {
  const marginLeftValue = useRef(new Animated.Value(0)).current;

  return (
    <Tab.Navigator
      tabBar={({ navigation }) => {
        const myFunc = () => {
          for (let i = 0; i < 2; i++) {
            if (navigation?.getState()?.index == i) {
              Animated.timing(marginLeftValue, {
                toValue: width * 0.4 * i,
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
              width: "100%",
              flexDirection: "row",
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            {navigation.getState().index < 2 ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: height * 0.0085,
                  }}
                >
                  <Animated.View
                    style={{
                      backgroundColor: "#D8315B",
                      width: width * 0.4,
                      height: height * 0.01,
                      position: "absolute",
                      bottom: -1,
                      marginLeft: marginLeftValue,
                      zIndex: 1,
                    }}
                  ></Animated.View>
                  <View
                    style={{
                      backgroundColor: "#C9C2BB",
                      width: width * 0.8,
                      height: height * 0.01,
                      position: "absolute",
                      bottom: -1,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "80%",
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        width: width * 0.4,
                        alignItems: "center",
                        paddingVertical: height * 0.015,
                      }}
                      onPress={() => {
                        navigation.navigate("Latest");
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#000",
                          fontWeight: "bold",
                        }}
                      >
                        Latest
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        width: width * 0.4,
                        alignItems: "center",
                        paddingVertical: height * 0.015,
                      }}
                      onPress={() => {
                        navigation.navigate("Favorites");
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#000",
                          fontWeight: "bold",
                        }}
                      >
                        Favorites
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: width * 0.2,
                    alignItems: "center",
                    height: height * 0.05,
                  }}
                >
                  <TouchableOpacity
                    style={{ marginLeft: width * 0.01 }}
                    onPress={() => {
                      navigation.navigate("SearchTab");
                      console.log("search");
                    }}
                  >
                    <MaterialIcons name="search" size={25} color="#D8315B" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: width * 0.03 }}
                    onPress={() => {
                      navigation.navigate("FilterTab");
                      console.log("filter");
                    }}
                  >
                    <MaterialIcons name="filter" size={25} color="#D8315B" />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View>{/* <Text>SEARCH</Text> */}</View>
            )}
          </View>
        );
      }}
      initialRouteName="Latest"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#D8315B",
          height: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen name="Latest" component={CommunityScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="SearchTab" component={SearchScreen} />
      <Tab.Screen name="FilterTab" component={FilterScreen} />
    </Tab.Navigator>
  );
};

const MyTopTabs = () => {
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <MyTabNavigator style={{ flex: 1 }} />
    </View>
  );
};

const Community = (props) => {
  return <MyTopTabs />;
};
export const screenOptions = (navData) => {
  return {
    headerTitle: "Community",
    headerShown: true,
  };
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
  },
  searchInput: {
    backgroundColor: "#f2f2f2",
    // borderRadius: ,
    fontSize: 16,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  filterContainer: {
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    padding: width * 0.02,
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  filterText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: width * 0.023,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#000",
  },
});
