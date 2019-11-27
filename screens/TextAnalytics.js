import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
import StatusBarAdjust from "../components/StatusBarAdjust";
import styles from "../style";

class TextAnalytics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBarAdjust />
        <View>
          <Text>Analytics</Text>
        </View>
      </View>
    );
  }
}

export default TextAnalytics;
