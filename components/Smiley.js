import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import Svg, { Path } from "react-native-svg";
const size = 60;
const size75 = (size * 100) / 185;
const size50 = (size * 75) / 125;

export default class Smiley extends Component {
  render() {
    const dVal = "M6 10 Q19 " + this.props.userInput * 2 + " 32 10";
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: size, height: size, position: "relative" }}
          source={require("../assets/facenomouth.png")}
        >
          <Svg
            height={size75}
            width={size75}
            style={{
              alignSelf: "center",
              marginTop: size50,
              position: "absolute",
              right: 17
            }}
          >
            <Path d={dVal} fill="none" stroke="black" strokeWidth="3" />
          </Svg>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
