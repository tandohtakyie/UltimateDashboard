import React, { Component } from "react";
import { View, Text, StatusBar, Platform, StyleSheet } from "react-native";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

class StatusBarAdjust extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor="#1d2637" barStyle="light-content" />
        <View style={styles.appBar} />
        <View style={styles.content} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  },
  appBar: {
    backgroundColor: "#fff"
    // height: APPBAR_HEIGHT
  },
  content: {
    // flex: 1,
    backgroundColor: "#fff"
  }
});

export default StatusBarAdjust;
