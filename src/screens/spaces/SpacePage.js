import react, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
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
  firebase,
} from "../../utilis/firebase";

const SpacePage = (props) => {
  let imageUrl = "";
  switch (props.route.params.space.areaId) {
    case "gOFsmSmchFjh4hrwkYUc":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/living_room_icon_yapjqn.png";
      break;
    case "UK7197mHKm2kbJc7d6Nt":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/service_icon_wftdlb.png";
      break;
    case "63995iUKAWSrB7sQ5NeD":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/main_bedroom_icon_cfeklh.png";
      break;
    case "EDu63o92SDaIdsUkKFf5":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/terrace_icon_py5pau.png";
      break;
    case "zH6gUmslhy324Rr6qZLa":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/garden_icon_cbp5r2.png";
      break;
    case "pLzCmIrky5OUFVSSFAkJ":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/dining_room_icon_ssxout.png";
      break;
    case "c796rK92ubiKdr7kdLLQ":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/bedroom_icon_wrkrqu.png";
      break;
    case "19VrA5Vw9uIxRVDc1QC4":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/baby_bedroom_icon_skqfqf.png";
      break;
    case "rytiwqswyK34ttujg8XT":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/kitchen_icon_yjvjdb.png";
      break;
    case "S2DNKMmCuJbPdkqNar4m":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/seating_area_nklfyl.png";
      break;
    case "By1T8Rrj7p2BDpdDS0Dt":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/bathroom_icon_sjv930.png";
      break;
    case "IIqAiJIV6C6zpTyeS18e":
      imageUrl =
        "https://res.cloudinary.com/united-app/image/upload/v1669466884/appicons/categories/office_icon_lanbfo.png";
      break;
    default:
      break;
  }

  const [allProjects, setAllProjects] = useState([]);
  const getProjectsBySpace = async () => {
    console.log("Spaces Pages");
    const projectsRef = collection(db, "projects");
    const q = query(
      projectsRef,
      where("spaceId", "==", props.route.params.space.id)
    );
    const querySnapshot = await getDocs(q);
    setAllProjects(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      "focus",
      async () => {
        await getProjectsBySpace();
      }
    );
    return willFocusSubscription;
  }, []);

  return (
    <View style={Style.container_nopadding}>
      <View style={styles.header}>
        {/* {imageUrl != "" ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 100, height: 100, marginTop: 20 }}
          />
        ) : (
          <Image
            source={{ uri: "" }}
            style={{ width: 100, height: 100, marginTop: 20 }}
          />
        )} */}
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 100, height: 100, marginTop: 20 }}
          />
        ) : null}
        {/* <Image

          source={{ uri: imageUrl }}
          style={{ width: 100, height: 100, marginTop: 20 }}
        /> */}
        <View style={styles.space_title_container}>
          <Text style={styles.space_title}>
            {props.route.params.space.spaceName}
          </Text>
        </View>
      </View>
      <View style={styles.title_container}>
        <Text style={styles.project_counter}>
          {allProjects.length} projects
        </Text>
        <TouchableOpacity
          style={styles.button_pink}
          onPress={() => {
            props.navigation.navigate("CreateNewProject", {
              space: props.route.params.space,
            });
          }}
        >
          <Text style={styles.button_text_white}>create new</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.projects_container}></View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.space.spaceName,
    headerShown: true,
  };
};

const styles = StyleSheet.create({
  button_pink: {
    borderRadius: 10,
    backgroundColor: "#D8315B",
    height: 50,
    marginTop: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button_text_white: {
    fontSize: 22,
    color: Colors.white,
    fontFamily: "BebasNeue-Regularttf",
  },

  space_title: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.white,
    fontSize: 28,
  },
  project_counter: {
    fontFamily: "BebasNeue-Regularttf",
    marginTop: 20,
    color: Colors.black,
    fontSize: 22,
    flex: 1,
  },
  space_title_container: {
    width: "100%",
    height: 60,
    backgroundColor: Colors.black,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    position: "relative",
    backgroundColor: Colors.black,
  },
  title_container: {
    width: "100%",
    height: "10%",
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  projects_container: {
    width: "100%",
    height: "60%",
  },
});

export default SpacePage;
