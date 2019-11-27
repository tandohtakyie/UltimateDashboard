import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import styles from "../style";

class FeedbackItem extends Component {
  static propTypes = {
    feedback: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    feedbackID: PropTypes.number.isRequired
  };

  handlePress = () => {
    this.props.onPress(this.props.feedback.id);
  };
  handleDeletePress = () => {
    console.log("id: " + this.props.feedbackID);
  };

  checkOs = osText => {
    var text = osText;
    if (text.toLowerCase().indexOf("os") >= 0) {
      return (
        <Image
          source={require("../assets/ios-icon-img.png")}
          style={styles.osLogo}
        />
      );
    } else if (text.toLowerCase().indexOf("android") >= 0) {
      return (
        <Image
          source={require("../assets/android-icon-img.png")}
          style={styles.osLogo}
        />
      );
    }
  };

  _deleteIcon = () => {
    return (
      <View style={styles.center_objects}>
        <TouchableWithoutFeedback
          onPress={() =>
            Alert.alert(
              "Delete",
              "Delete selected feedback?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed!")
                },
                { text: "Yes", onPress: () => this.handleDeletePress }
              ],
              { cancelable: false }
            )
          }
        >
          <Text>
            <Ionicons name="ios-trash" color="white" size={30} />
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  onDeleteFeedback = () => {};

  render() {
    const { feedback } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.handlePress}>
          <View
            style={[
              styles.ptb15,
              styles.feedbackStyle,
              { flexDirection: "row", position: "relative" }
            ]}
          >
            <View>
              <Text style={[styles.text_white, styles.text_h3]}>
                {feedback.category}
              </Text>
              <Text style={styles.text_white_opacity}>{feedback.feedback}</Text>
              <Text style={[styles.text_white_opacity, styles.text_italic]}>
                {feedback.app} app
              </Text>
            </View>
            <View style={styles.image_list_icon}>
              {/* image comes here */}
              {this.checkOs(feedback.os)}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default FeedbackItem;
