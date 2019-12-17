import React from "react";
import { Text, View, Dimensions, StyleSheet, Image } from "react-native";
import { PieChart } from "react-native-svg-charts";
import PropTypes from "prop-types";

const deviceWidth = Dimensions.get("window").width;

class PieChartWithClickSlices extends React.PureComponent {
  static propTypes = {
    smileys: PropTypes.array.isRequired,
    onListRefresh: PropTypes.bool.isRequired,
    onPullDownRefresh: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: "",
        value: 0
      },
      labelWidth: 0
    };
  }
  render() {
    const data = this.props.smileys;
    const smileyRangeCount = data.map((key, value) => key.SmileyRange);

    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const keys = [
      "Smiley Range 1",
      "Smiley Range 2",
      "Smiley Range 3",
      "Smiley Range 4",
      "Smiley Range 5",
      "Smiley Range 6",
      "Smiley Range 7",
      "Smiley Range 8",
      "Smiley Range 9",
      "Smiley Range 10"
    ];
    const colors = [
      "#580085",
      "#7a0cb3",
      "#8f1ec9",
      "#993ac9",
      "#a253c9",
      "#984bbf",
      "#aa68cc",
      "#b77ad6",
      "#c996e3",
      "#dbb1f0",
      "#eeccff"
    ];
    const totalAmountOfSmileyVotes = 
    smileyRangeCount[0] + 
    smileyRangeCount[1] + 
    smileyRangeCount[2] + 
    smileyRangeCount[3] +
    smileyRangeCount[4] + 
    smileyRangeCount[5] +
    smileyRangeCount[6] +
    smileyRangeCount[7] +
    smileyRangeCount[8] +
    smileyRangeCount[9] 

    const smileyData = keys.map((key, index) => {
      return {
        key: `pie-${index}`,
        value: smileyRangeCount[index],
        svg: { fill: colors[index] },
        arc: {
          outerRadius: 100 + smileyRangeCount[index] + "%",
          padAngle: label === key ? 0.1 : 0
        },
        onPress: () =>
          this.setState({
            selectedSlice: { label: key, value: (parseInt(smileyRangeCount[index]) / parseInt(totalAmountOfSmileyVotes) * 100).toFixed(1) + "%" }
          })
      };
    });

    return (
  <View style={{ width: deviceWidth, position: "relative" }}>
      <View style={{ width: deviceWidth * 0.85, marginLeft: 10, marginTop: 10 }}>
        <PieChart
          style={{ height: 300 }}
          outerRadius={"90%"}
          innerRadius={"45%"}
          data={smileyData}
        ></PieChart>
        <Text
          onLayout={({
            nativeEvent: {
              layout: { width }
            }
          }) => {
            this.setState({ labelWidth: width });
          }}
          style={{
            marginTop: 135,
            marginLeft: -30,
            position: "absolute",
            left: deviceWidth / 2 - labelWidth / 2,
            textAlign: "center",
            color: "#fff"
          }}
        >
          {`${label} \n ${value}`}
        </Text>
      </View >
      <View
          style={{
            flexDirection: "column",
            width: deviceWidth * 0.15,
            paddingLeft: 10,
            paddingTop: 10
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.boxes}>
            <Image
              style={{width: 23, height: 23, marginTop: 7 }}
              source={require('../assets/SmileyRange10.png')}  
            /> 
            <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: "#eeccff",
                      marginTop: 7
                    }}
                  />
                  <Text style={styles.text}>Excellent</Text>
            </View>
            <View style={styles.boxes}>
            <Image
              style={{width: 20, height: 20, marginTop: 7 }}
              source={require('../assets/SmileyRange1.png')}  
            /> 
            <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: "#580085",
                      marginTop: 7
                    }}
                  />
                  <Text style={styles.text}>Miserable</Text>
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
    paddingTop: 10,
    color: "#fff"
  },
  boxes: {
    paddingBottom: 10,
    marginLeft: 50,
    flexDirection: "row",
    width: deviceWidth / 5,
    height: 50
  }
});

export default PieChartWithClickSlices;
