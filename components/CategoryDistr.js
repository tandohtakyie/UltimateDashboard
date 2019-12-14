import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { VictoryPie } from "victory-native";
import ajax from "../ajax";
import { PropTypes } from "prop-types";

const scr = Dimensions.get("window").width;

class CategoryDistr extends React.PureComponent {
  static propTypes = {
    catDistr: PropTypes.array.isRequired,
    onListRefresh: PropTypes.bool.isRequired,
    onPullDownRefresh: PropTypes.func.isRequired
  };

  render() {
    const data = this.props.catDistr;
    const feedb = data.map((key, index) => key.feedback);
    const sugg = data.map((key, index) => key.suggestion);
    const bugr = data.map((key, index) => key.bugreport);


    // calculate total count and then percentages
    const max = parseInt(feedb) + parseInt(sugg) + parseInt(bugr);
    const feP = ((parseInt(feedb) / max) * 100).toFixed(1);
    const suP = ((parseInt(sugg) / max) * 100).toFixed(1);
    const buP = ((parseInt(bugr) / max) * 100).toFixed(1);

    return (
      <View style={{ width: scr, position: "relative" }}>
        <View style={{ width: scr * 0.85, marginLeft: -10 }}>
        {data.length !== 0 ? (
          <VictoryPie
            data={[
              { x: " ", y: feedb[0] },
              { x: " ", y: bugr[0] },
              { x: " ", y: sugg[0] }
            ]}
            padAngle={1}
            innerRadius={30}
            labelRadius={100}
            colorScale={["turquoise", "lightgray", "#cc99ff"]}
          />
          ) : (
            <Text> No data to display </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "column",
            width: scr * 0.15,
            paddingLeft: 10,
            paddingTop: 10
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.boxes}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "turquoise",
                  marginTop: 7
                }}
              />
              <Text style={styles.text}>Feedback {feP}%</Text>
            </View>
            <View style={styles.boxes}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "lightgray",
                  marginTop: 7
                }}
              />
              <Text style={styles.text}>Bug report {buP}%</Text>
            </View>
            <View style={styles.boxes}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#cc99ff",
                  marginTop: 7
                }}
              />
              <Text style={styles.text}>Suggestion {suP}%</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 5,
    color: "#fff"
  },
  boxes: {
    paddingBottom: 10,
    marginLeft: 25,
    flexDirection: "row",
    width: scr / 5,
    height: 50
  }
});

export default CategoryDistr;