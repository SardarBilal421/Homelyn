import react, { useEffect, useCallback, useState } from "react";
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
  _View,
} from "react-native";
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
  firebase,
} from "../../utilis/firebase";
import Entypo from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";

const EditProfile = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAccountAvatar, setSelectedAccountAvatar] = useState(null);
  const [account, setAccount] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [image, setImage] = useState(
    "https://res.cloudinary.com/united-app/image/upload/v1670313692/appicons/categories/637be25efa59c200a42cd45b_kxdhd7.png"
  );
  const [store, setStore] = useState(null);
  const [accountId, setAccountId] = useState();
  const [promemberInfo, setPromemberInfo] = useState(null);

  const getAccountData = useCallback(async () => {
    const accountsRef = collection(db, "accounts");
    const q = query(accountsRef, where("uuid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    setAccount(querySnapshot.docs[0].data());
    setFirstName(querySnapshot.docs[0].data().firstName);
    setLastName(querySnapshot.docs[0].data().lastName);
    setCoverLetter(querySnapshot.docs[0].data().coverLetter);
    setImage(querySnapshot.docs[0].data().avatar);
    setAccountId(querySnapshot.docs[0].id);

    const promemberRef = collection(db, "promembers");
    const promember = query(
      promemberRef,
      where("associateId", "==", auth.currentUser.uid)
    );
    const memberShot = await getDocs(promember);

    if (memberShot.docs.length > 0) {
      setPromemberInfo(memberShot.docs[0].data());
    }
  }, []);

  useEffect(() => {
    async function getAccountData() {
      await getAccountData();
    }
    getAccountData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedAccountAvatar({ localUri: result.assets[0].uri });
    }
  };

  const HandleFileUpload = async (source) => {
    let sourceuri = source;
    let newFile = {
      uri: sourceuri,
      type: `test/${sourceuri.split(".")[1]}`,
      name: `test.${sourceuri.split(".")[1]}`,
    };
    const data = new FormData();
    data.append("file", newFile);
    data.append("upload_preset", "unitedUploads");
    data.append("cloud_name", "united-app");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/united-app/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const result = await res.json();
    return result.secure_url;
  };

  const updateProfile = async () => {
    setIsLoading(true);

    if (firstName != "" && lastName) {
      let _avatar = image;
      if (selectedAccountAvatar !== null) {
        _avatar = await HandleFileUpload(selectedAccountAvatar.localUri);
      }
      const accountRef = doc(db, "accounts", accountId);
      await updateDoc(accountRef, {
        avatar: _avatar,
        firstName: firstName,
        lastName: lastName,
        coverLetter: coverLetter,
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      Alert.alert("Update Profile", "User full name is mandatory");
    }
  };

  return (
    <ScrollView>
      <View style={Style.container_nopadding}>
        <View style={Style.avatar_container_sub_edit}>
          <View style={{ width: 100, height: 100, position: "relative" }}>
            <Avatar.Image
              style={{ backgroundColor: "#ebebeb" }}
              size={100}
              source={{
                uri:
                  selectedAccountAvatar == null
                    ? image
                    : selectedAccountAvatar.localUri,
              }}
            />
          </View>

          <View
            style={{
              width: "100%",
              paddingHorizontal: 50,
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 12,
            }}
          >
            <TouchableOpacity
              onPress={pickImage}
              style={{
                width: "48%",
                paddingVertical: 12,
                backgroundColor: Colors.background,
                borderRadius: 20,
                alignItems: "center",
              }}
            >
              <Entypo
                onPress={() => {}}
                name="images"
                color={Colors.gray_1}
                size={28}
              />
              <Text style={Style.upload_text}>Choose from library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "48%",
                paddingVertical: 12,
                backgroundColor: Colors.background,
                borderRadius: 20,
                alignItems: "center",
              }}
            >
              <Entypo
                onPress={() => {}}
                name="camera"
                color={Colors.gray_1}
                size={28}
              />
              <Text style={Style.upload_text}>Take a picture</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingHorizontal: 30, paddingTop: 12 }}>
          <TextInput
            style={Style.input}
            placeholder="First name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            keyboardType="default"
          />
          <TextInput
            style={Style.input}
            placeholder="Last name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            keyboardType="default"
          />
          <TextInput
            style={Style.inputfree}
            placeholder="Cover letter"
            value={coverLetter}
            onChangeText={(text) => setCoverLetter(text)}
            keyboardType="default"
            multiline={true}
          />

          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.pink} />
          ) : (
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                style={Style.button_pink}
                onPress={updateProfile}
              >
                <Text style={Style.button_pink_text}>UPDATE</Text>
              </TouchableOpacity>
            </View>
          )}
          {promemberInfo ? (
            <TouchableOpacity
              style={Style.button_pink_line}
              onPress={() => {
                props.navigation.navigate("Promember");
              }}
            >
              <Text style={Style.button_pink_line_text}>Update Pro Member</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={Style.button_pink_line}
              onPress={() => {
                props.navigation.navigate("Promember");
              }}
            >
              <Text style={Style.button_pink_line_text}>
                Become a pro member
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Edit Profile",
    headerShown: true,
  };
};

export default EditProfile;
