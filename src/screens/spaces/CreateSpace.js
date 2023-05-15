import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  FlatList,
  TextInput,
  Switch,
  Alert,
  Image,
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

const CreateSpace = (props) => {
  const [spaceName, setSpaceName] = useState("");
  const [spaceDescription, setSpaceDescription] = useState("");
  const [switchText, setSwitchText] = useState("Public Space");
  const [isPrivateSpace, setIsPrivateSpace] = useState(true);
  const [spaceArea, setSpaceArea] = useState("Select area from list");
  const [spaceAreaId, setSpaceAreaId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const getCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    setCategories(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  const getMySpaces = async () => {
    const spacesRef = collection(db, "spaces");
    const q = query(
      spacesRef,
      where("associateId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    setSpaces(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    async function getMySpaces() {
      await getCategories();
    }
    getMySpaces();
  }, []);

  const selectCategoryAction = (categoryName, categoryId) => {
    setSpaceArea(categoryName);
    setSpaceAreaId(categoryId);
    setModalVisible(!modalVisible);
  };

  const toggleSwitch = () => {
    setIsPrivateSpace((previousState) => !previousState);
    setSwitchText(isPrivateSpace ? "Private Space" : "Public Space");
  };

  const create_new_space = async () => {
    try {
      const spacesRef = await addDoc(collection(db, "spaces"), {
        associateId: auth.currentUser.uid,
        spaceName: spaceName,
        spaceDescription: spaceDescription,
        isPrivateSpace: isPrivateSpace,
        areaId: spaceAreaId,
      });
      setSpaceName("");
      setSpaceDescription("");
      setSpaceArea("Select area from list");
      props.navigation.navigate("Spaces");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={Style.container}>
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
            {categories ? (
              <FlatList
                style={{ width: "100%" }}
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={(itemRow) => (
                  <TouchableOpacity
                    onPress={() => {
                      selectCategoryAction(
                        itemRow.item.categoryName,
                        itemRow.item.id
                      );
                    }}
                    style={Style.category_row}
                  >
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={{ uri: itemRow?.item?.categoryIconBlack }}
                    />
                    <Text style={Style.selectListText}>
                      {itemRow.item.categoryName}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </Modal>

      <Text style={Style.spaces_title}>
        create new <Text style={Style.spaces_title_gray}>space</Text>
      </Text>

      <KeyboardAvoidingView style={{ marginTop: 20, height: "80%" }}>
        <TextInput
          placeholder="Space Name"
          style={Style.input}
          value={spaceName}
          onChangeText={(text) => setSpaceName(text)}
          keyboardType="default"
        />

        <TextInput
          placeholder="Space Description"
          style={Style.inputfree}
          value={spaceDescription}
          onChangeText={(text) => setSpaceDescription(text)}
          keyboardType="default"
          multiline={true}
        />

        <View style={Style.check_container}>
          <View style={{ width: "80%" }}>
            <Text style={Style.switchText}>{switchText}</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Switch
              trackColor={{ false: "#767577", true: Colors.light_blue }}
              thumbColor={isPrivateSpace ? Colors.pink : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isPrivateSpace}
            />
          </View>
        </View>

        <TouchableOpacity
          style={Style.input_btn}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={Style.inputTextPlace}>{spaceArea}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View style={{ height: "20%", width: "100%" }}>
        <TouchableOpacity style={Style.button_pink} onPress={create_new_space}>
          <Text style={Style.button_text_white}>create space</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Create Space",
    headerShown: true,
  };
};

export default CreateSpace;
