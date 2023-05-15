import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../utilis/AppColors";
import Moment from "moment";

const SpaceItem = (props) => {
  const areaId = props.space.areaId;
  // console.log(areaId);
  let imageUrl = "";
  switch (areaId) {
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

  return (
    <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <View style={styles.image_containmer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </View>
      <View style={styles.info_container}>
        <Text style={styles.title}>{props.space.spaceName}</Text>
        <Text style={styles.created}>
          created: {Moment(props.space.createdAt).format("MM/DD/YYYY")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  created: {
    fontSize: 11,
    fontFamily: "Raleway-Regularttf",
  },
  title: {
    fontFamily: "Raleway-Regularttf",
  },
  info_container: {
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "flex-start",
    marginTop: 7,
  },
  image: {
    width: 120,
    height: 120,
  },
  image_containmer: {
    width: "100%",
    height: 130,
    borderRadius: 12,
    backgroundColor: Colors.brown_bg,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 150,
    height: 200,
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginRight: 12,
  },
});

export default SpaceItem;
