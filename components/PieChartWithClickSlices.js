import React from "react";
import { Text, View, Dimensions } from "react-native";
import { PieChart } from "react-native-svg-charts";
import PropTypes from "prop-types";

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
      "#600080",
      "#9900cc",
      "#c61aff",
      "#d966ff",
      "#ecb3ff",
      "#600080",
      "#9900cc",
      "#c61aff",
      "#d966ff",
      "#ecb3ff"
    ];
    const smileyData = keys.map((key, index) => {
      return {
        key,
        value: smileyRangeCount[index],
        svg: { fill: colors[index] },
        arc: {
          outerRadius: 90 + smileyRangeCount[index] + "%",
          padAngle: label === key ? 0.05 : 0
        },
        onPress: () =>
          this.setState({
            selectedSlice: { label: key, value: smileyRangeCount[index] }
          })
      };
    });
    const deviceWidth = Dimensions.get("window").width;

    return (
      <View style={{ justifyContent: "center", flex: 1, position: "relative" }}>
        <PieChart
          style={{ height: 300 }}
          outerRadius={"80%"}
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
            position: "absolute",
            left: deviceWidth / 2 - labelWidth / 1.5,
            textAlign: "center",
            color: "#fff"
          }}
        >
          {`${label} \n ${value}`}
        </Text>
      </View>
    );
  }
}

export default PieChartWithClickSlices;
