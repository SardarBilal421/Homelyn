import react, { useEffect, useCallback, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
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
import Style from "../../utilis/AppStyle";
import Colors from "../../utilis/AppColors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SpaceItem from "../../components/SpaceItem";

const Spaces = (props) => {
  const [allSpaces, setAllSpaces] = useState([]);

  const getMySpaces = useCallback(async () => {
    try {
      const spacesRef = collection(db, "spaces");
      const q = query(
        spacesRef,
        where("associateId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      setAllSpaces(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      console.log("Spaces-----------------------111---------------------");
    } catch (error) {
      console.error("Error getting spaces:", error);
    }
  }, [setAllSpaces]);

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      "focus",
      async () => {
        await getMySpaces();
        console.log("Spaces--------------------------------------------");
      }
    );
    return willFocusSubscription;
  }, []);

  return (
    <View style={Style.container}>
      <View>
        <Text style={Style.spaces_title}>
          my private <Text style={Style.spaces_title_gray}>spaces</Text>
        </Text>
        <View style={Style.spaces_container}>
          {allSpaces ? (
            <FlatList
              horizontal={true}
              data={allSpaces.filter((x) => x.isPrivateSpace == true)}
              keyExtractor={(item) => item.id}
              renderItem={(itemRow) => (
                <SpaceItem
                  space={itemRow.item}
                  onClick={() => {
                    props.navigation.navigate("SpacePage", {
                      space: itemRow.item,
                    });
                  }}
                />
              )}
            />
          ) : (
            <Text>No spces here</Text>
          )}
        </View>
      </View>

      <View>
        <Text style={Style.spaces_title}>
          my public <Text style={Style.spaces_title_gray}>spaces</Text>
        </Text>
        <View style={Style.spaces_container}>
          {allSpaces ? (
            <FlatList
              horizontal={true}
              data={allSpaces.filter((x) => x.isPrivateSpace == false)}
              keyExtractor={(item) => item.id}
              renderItem={(itemRow) => (
                <SpaceItem
                  space={itemRow.item}
                  onClick={() => {
                    props.navigation.navigate("SpacePage", {
                      space: itemRow.item,
                    });
                  }}
                />
              )}
            />
          ) : (
            <Text>No spces here</Text>
          )}
        </View>
      </View>

      <View>
        <Text style={Style.spaces_title}>
          my community <Text style={Style.spaces_title_gray}>spaces</Text>
        </Text>
        <View style={Style.spaces_container}></View>
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Spaces",
    headerShown: true,
    headerRight: () => (
      <MaterialCommunityIcons
        onPress={() => {
          navData.navigation.navigate("CreateSpace");
        }}
        name="plus"
        color="#ffffff"
        size={28}
      />
    ),
  };
};

export default Spaces;
