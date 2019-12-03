import React, { Component } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryTooltip
} from "victory-native";
import { PropTypes } from "prop-types";
import { Text, View } from "react-native";

class LineChart extends React.PureComponent {
  static propTypes = {
    feedbacksPerYear: PropTypes.array.isRequired,
    onListRefresh: PropTypes.bool.isRequired,
    onPullDownRefresh: PropTypes.func.isRequired
  };

  render() {
    const feedbacksCount = this.props.feedbacksPerYear;

    return (
      <View>
        {feedbacksCount.length !== 0 ? (
          <VictoryChart
            theme={VictoryTheme.material}
            containerComponent={<VictoryVoronoiContainer />}
          >
            {feedbacksCount.length !== 0 ? (
              <VictoryLine
                style={{
                  data: { stroke: "#ab34eb" },
                  parent: { border: "1px solid #ccc" }
                }}
                categories={{
                  x: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                  ]
                }}
                data={[
                  { x: "Jan", y: feedbacksCount[0] },
                  { x: "Feb", y: feedbacksCount[1] },
                  { x: "Mar", y: feedbacksCount[2] },
                  { x: "Apr", y: feedbacksCount[3] },
                  { x: "May", y: feedbacksCount[4] },
                  { x: "Jun", y: feedbacksCount[5] },
                  { x: "Jul", y: feedbacksCount[6] },
                  { x: "Aug", y: feedbacksCount[7] },
                  { x: "Sep", y: feedbacksCount[8] },
                  { x: "Oct", y: feedbacksCount[9] },
                  { x: "Nov", y: feedbacksCount[10] },
                  { x: "Dec", y: feedbacksCount[11] }
                ]}
              />
            ) : (
              <Text> No data to display </Text>
            )}
            {feedbacksCount.length !== 0 ? (
              <VictoryScatter
                style={{ data: { fill: "#ab34eb" } }}
                size={5}
                labelComponent={<VictoryTooltip constrainToVisibleArea />}
                data={[
                  { x: "Jan", y: feedbacksCount[0] },
                  { x: "Feb", y: feedbacksCount[1] },
                  { x: "Mar", y: feedbacksCount[2] },
                  { x: "Apr", y: feedbacksCount[3] },
                  { x: "May", y: feedbacksCount[4] },
                  { x: "Jun", y: feedbacksCount[5] },
                  { x: "Jul", y: feedbacksCount[6] },
                  { x: "Aug", y: feedbacksCount[7] },
                  { x: "Sep", y: feedbacksCount[8] },
                  { x: "Oct", y: feedbacksCount[9] },
                  { x: "Nov", y: feedbacksCount[10] },
                  { x: "Dec", y: feedbacksCount[11] }
                ]}
                labels={({ datum }) => datum.y}
              />
            ) : (
              <Text> No data to display </Text>
            )}
          </VictoryChart>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
}

export default LineChart;
