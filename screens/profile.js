import React from "react";
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#FFF",
    marginBottom: 10,
    marginTop: 45,
  },
  indicatorTab: {
    backgroundColor: "transparent",
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: "row",
  },
  tabBar: {
    backgroundColor: "#EEE",
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
  },
  tabLabelNumber: {
    color: "gray",
    fontSize: 12.5,
    textAlign: "center",
  },
  tabLabelText: {
    color: "black",
    fontSize: 22.5,
    fontWeight: "600",
    textAlign: "center",
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: "gray",
    fontSize: 13.5,
    textAlign: "center",
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: "#5B5A5A",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  userRow: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12,
  },
});

function TextStyle(props) {
  //change the text color if being selected
  let name = props.name.replace(
    /&#(?:x([\da-f]+)|(\d+));/gi,
    function (_, hex, dec) {
      return String.fromCharCode(dec || +("0x" + hex));
    }
  );
  return <Text>{name}</Text>;
}

const Profile = ({ student }) => {
  const renderLabel = () => {
    let labels = [];
    routes.forEach((e, index) => {
      labels.push(true ? "black" : "gray");
    });

    const currentIndex = parseInt(route.key) - 1;
    const color = labels[currentIndex];

    return (
      <View>
        <Animated.Text style={[styles.tabLabelText, { color }]}>
          {route.count}
        </Animated.Text>
        <Animated.Text style={[styles.tabLabelNumber, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    );
  };

  const ContactHeader = () => {
    const avatar = student.profile_photo;
    const major = student.qualifications.Major;
    const { colors } = useTheme();

    const initials = (
      <View
        style={StyleSheet.compose(
          {
            backgroundColor: colors.accent,
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          },
          styles.userImage
        )}
      >
        <Text
          style={{
            color: "white",
            fontSize: 80,
          }}
        >
          {student.name[0]}
        </Text>
      </View>
    );

    return (
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          {student.profile_photo == "placeholder" ? (
            initials
          ) : (
            <Image style={styles.userImage} source={{ uri: avatar }} />
          )}
          <View style={styles.userNameRow}>
            <TextStyle style={styles.userNameText} name={student.name}>
              {name}
            </TextStyle>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{major}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <ContactHeader />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
