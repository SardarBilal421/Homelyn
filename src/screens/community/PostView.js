import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../../utilis/AppColors";
import Styles from "../../utilis/AppStyle";
import { Avatar } from "react-native-paper";
import moment from "moment";

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
  getDoc,
  arrayUnion,
  arrayRemove,
} from "../../utilis/firebase";

const PostView = (props) => {
  const article = props.route.params.post;
  const publisher = props.route.params.post.account;
  const [project, setProject] = useState();
  const [comment, setComment] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [postLikes, setPostLikes] = useState(props.route.params.postLikes);

  const getArticle = useCallback(async () => {
    const docRef = doc(db, "projects", article.id);
    const accountsRef = await getDocs(collection(db, "accounts"));
    const docSnap = await getDoc(docRef);
    props.route.params.setIsPostLike(
      docSnap
        .data()
        .likesCount.filter((x) => x.associateId == props.route.params.myAccount)
        .length > 0
        ? true
        : false
    );

    props.route.params.setPostLikes(docSnap.data().likesCount.length);

    if (docSnap.exists()) {
      setProject(docSnap.data());
      setAllComments(
        docSnap.data().commentsCount.map((doc) => ({
          ...doc,
          id: doc.id,
          account: accountsRef.docs
            .find((x) => x.data().uuid == doc.associateId)
            .data(),
        }))
      );
    }
  }, []);

  useEffect(() => {
    getArticle();
  }, []);

  allComments.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const [isPostLike, setIsPostLike] = useState(props.route.params.isPostLike);
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

  const handleLike = async () => {
    const likes = postLikes + 1;
    props.route.params.setIsPostLike(!props.route.params.isPostLike);
    setIsPostLike(!isPostLike);
    props.route.params.setPostLikes(likes);
    setPostLikes(likes);
    try {
      const projectRef = doc(db, "projects", article.id);
      const _newlike = {
        associateId: auth.currentUser.uid,
        createdAt: Date.now(),
      };
      await updateDoc(projectRef, {
        likesCount: arrayUnion(_newlike),
      });
    } catch (error) {
      Alert.alert(error.message);
    }
    getArticle();
  };
  const handleUnlike = async () => {
    const likes = postLikes - 1;
    props.route.params.setIsPostLike(!props.route.params.isPostLike);
    setIsPostLike(!isPostLike);
    props.route.params.setPostLikes(likes);
    setPostLikes(likes);

    try {
      const projectRef = doc(db, "projects", article.id);
      const updatedArray = project?.likesCount.filter(
        (x) => x.associateId != props.route.params.myAccount
      );

      await updateDoc(projectRef, {
        likesCount: updatedArray,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
    getArticle();
  };

  const addNewComment = async () => {
    try {
      const projectRef = doc(db, "projects", article.id);
      const _newComment = {
        associateId: auth.currentUser.uid,
        createdAt: Date.now(),
        comment: comment,
      };
      await updateDoc(projectRef, {
        commentsCount: arrayUnion(_newComment),
      });
      setComment("");
    } catch (error) {
      Alert.alert(error.message);
    }
    getArticle();
  };

  return (
    <ScrollView>
      <View style={Styles.container_nopadding}>
        <View style={styles.image_container}>
          <Image
            style={styles.image}
            source={{ uri: project?.article?.articleMainImage }}
          />
        </View>

        <View style={styles.publisher_container}>
          <View style={{ width: "90%", flexDirection: "row" }}>
            <View style={{ width: 50, height: 50, position: "relative" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  top: 10,
                  right: -15,
                  zIndex: 100,
                }}
              >
                <Image
                  source={{ uri: levelIcon }}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              {publisher.avatar != "" ? (
                <Avatar.Image source={{ uri: publisher.avatar }} size={50} />
              ) : (
                <Avatar.Image
                  source={require("../../../assets/images/avatar.png")}
                  size={50}
                />
              )}
            </View>
            <View style={{ marginLeft: 20, marginTop: 8 }}>
              <Text style={styles.publisher_name}>
                {publisher.firstName} {publisher.lastName}
              </Text>
              <Text style={styles.publisher_date}>
                {moment(project?.createdAt).format("MMM/DD/YYYY, hh:mm")}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: 30,
              height: 30,
              width: "10%",
              alignItems: "center",
            }}
          >
            {isPostLike ? (
              <MaterialIcons
                onPress={handleUnlike}
                name="favorite"
                size={30}
                color={Colors.pink}
              />
            ) : (
              <MaterialIcons
                onPress={handleLike}
                name="favorite-border"
                size={30}
                color={Colors.pink}
              />
            )}
            <Text style={styles.socialCounter}>{postLikes}</Text>
          </View>
        </View>

        <View style={styles.article_container}>
          <Text style={styles.articleTitle}>
            {project?.article.articleTitle}
          </Text>
          <Text style={styles.articleContent}>
            {project?.article.articleContent}
          </Text>
        </View>

        <View style={styles.comments_container}>
          <View style={{ width: "90%" }}>
            <Text style={styles.commentsTitle}>Comments</Text>
          </View>
          <View style={{ width: "10%", flexDirection: "row" }}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color={Colors.pink}
            />
            <Text style={styles.commentsTitle}>
              {project?.commentsCount.length}
            </Text>
          </View>
        </View>

        <View style={styles.allComments_container}>
          {allComments.map((commentItem) => {
            return (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  marginVertical: 6,
                }}
                key={commentItem.id}
              >
                <View style={{ width: "10%" }}>
                  {commentItem.account.avatar != "" ? (
                    <Avatar.Image
                      source={{ uri: commentItem.account.avatar }}
                      size={30}
                    />
                  ) : (
                    <Avatar.Image
                      source={require("../../../assets/images/avatar.png")}
                      size={30}
                    />
                  )}
                </View>
                <View style={{ marginLeft: 14, width: "85%" }}>
                  <Text style={styles.commentDate}>
                    {commentItem.account.firstName}{" "}
                    {commentItem.account.lastName} |{" "}
                    {moment(commentItem.createdAt).format("MM/DD/YYYY hh:mm")}
                  </Text>
                  <Text style={styles.commentLine}>{commentItem.comment}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <TextInput
          value={comment}
          onChangeText={(text) => {
            setComment(text);
          }}
          onSubmitEditing={addNewComment}
          style={Styles.input}
          placeholder="Add comment"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  commentDate: { fontFamily: "Raleway-Mediumttf", fontSize: 11 },
  commentLine: { fontFamily: "Raleway-Lightttf", fontSize: 14, marginTop: 3 },
  allComments_container: { width: "100%", padding: 20 },
  commentsTitle: {
    fontFamily: "Raleway-Lightttf",
    fontSize: 15,
    marginLeft: 6,
  },
  comments_container: {
    width: "100%",
    marginTop: 10,
    padding: 20,
    flexDirection: "row",
    borderTopColor: Colors.brown_bg,
    borderTopWidth: 1,
    borderBottomColor: Colors.brown_bg,
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  socialCounter: { fontFamily: "Raleway-Lightttf", fontSize: 15, marginTop: 1 },
  articleContent: {
    fontFamily: "Raleway-Lightttf",
    fontSize: 16,
    lineHeight: 20,
    marginVertical: 15,
  },
  articleTitle: { fontFamily: "Raleway-Boldttf", fontSize: 24 },
  publisher_date: { fontFamily: "Raleway-Lightttf", fontSize: 13 },
  publisher_name: { fontFamily: "Raleway-Mediumttf", fontSize: 15 },
  publisher_container: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    backgroundColor: Colors.brown_bg,
  },
  article_container: { width: "100%", padding: 20 },
  image_container: { width: "100%", height: 400 },
  image: { width: "100%", resizeMode: "cover", height: 400 },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.post.article.articleTitle,
    headerShown: true,
  };
};

export default PostView;
