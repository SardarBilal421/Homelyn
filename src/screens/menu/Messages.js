import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
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
  distinct,
  deleteDoc,
  where,
  query,
} from "../../utilis/firebase";

import { Avatar } from "react-native-paper";
const { width, height } = Dimensions.get("window");

const Messages = (props) => {
  const [allChat, setAllChats] = useState([]);
  const [receiverAccount, setReceiverAccount] = useState([]);

  const chat = async () => {
    console.log("myAccount", props.route.params.myAccount);
    const chatsRef = collection(db, "chatroom");
    const chatsQuery = query(
      chatsRef,
      where("senderId", "==", props.route.params.myAccount.uuid) ||
        where("receiverId", "==", props.route.params.myAccount.uuid)
    );
    const chatsQuerySnapshot = await getDocs(chatsQuery);
    let allChats = chatsQuerySnapshot.docs
      .map((x) => x.data())
      .map((x) => x.receiverId);

    let a = chatsQuerySnapshot.docs
      .map((x) => x.data())
      .map((x) => x.sendedAt)
      .sort((a, b) => {
        return a - b;
      });

    // a.sort((a, b) => {
    //   return a - b;
    // });

    console.log(
      a.map((x) => {
        const date = new Date(x);
        console.log(
          date.getHours() + ":" + date.getMinutes() + ":" + date.toDateString()
        );
      })
    );
    // console.log(
    //   date.getHours() + ":" + date.getMinutes() + ":" + date.toDateString()
    // );
    // console.log(
    //   "allChats"
    // chatsQuerySnapshot.docs
    //   .map((x) => x.data())
    //   .map((x) => x.sendedAt)
    //   .sort((a, b) => {
    //     return a.sendedAt - b.sendedAt;
    //   })
    // );

    allChats = allChats.filter(
      (item, index) => allChats.indexOf(item) === index
    );
    const receiverAccounts = await Promise.all(
      allChats.map(async (chat) => {
        const receiverQuery = query(
          collection(db, "accounts"),
          where("uuid", "==", chat)
        );
        const receiverSnapshot = await getDocs(receiverQuery);
        return receiverSnapshot.docs[0].data();
      })
    );

    setReceiverAccount(receiverAccounts);
  };

  const optimizedChat = useMemo(
    () => chat,
    [props.route.params.myAccount.uuid]
  );

  useEffect(() => {
    optimizedChat();
  }, [optimizedChat]);

  return (
    <>
      {receiverAccount.length !== 0 && (
        <FlatList
          data={receiverAccount}
          keyExtractor={(item) => item.uuid}
          renderItem={(item) => (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: height * 0.01,
                paddingBottom: height * 0.01,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
              }}
              onPress={() => {
                props.navigation.navigate("MessageView", {
                  myAccount: props.route.params.myAccount,
                  receiverAccount: item.item,
                });
              }}
            >
              <Avatar.Image
                size={65}
                source={item.item?.avatar && { uri: item.item?.avatar }}
                style={{
                  marginTop: height * 0.01,
                }}
              />
              <View
                style={{
                  marginLeft: height * 0.02,
                  marginTop: height * 0.02,
                  width: width * 0.6,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "600" }}>
                    {item.item?.firstName} {item.item?.lastName}
                  </Text>

                  <Text style={{ color: "grey" }}>12:50</Text>
                </View>
                <Text
                  style={{
                    color: "grey",
                    fontStyle: "italic",
                    fontSize: 12,
                    marginTop: height * 0.01,
                  }}
                >
                  {item.item?.level}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
};
export const screenOptions = (navData) => {
  return {
    headerTitle: "Messages",
    headerShown: true,
    headerTitleAlign: "center",
  };
};
export default Messages;
