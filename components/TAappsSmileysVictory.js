import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

class TAappsSmileysVictory extends React.PureComponent {
   static propTypes = {
        avgPerAppCount: PropTypes.array.isRequired,
        onListRefresh: PropTypes.bool.isRequired,
        onPullDownRefresh: PropTypes.func.isRequired
      }; 
      
      render() {
        const avgPerAppData = this.props.avgPerAppCount;

    return(
    <View style={{ flex: 1 }}>
        <VictoryChart
        theme={VictoryTheme.material}
        domain={{ x: [0, 4] }}
        >
        {avgPerAppData.length !== 0 ? (
                    <VictoryBar
                        barWidth={({ index }) => index * 2 + 75}
                        style={{
                            data: {
                            fill: "rgb(134, 65, 244)",
                            stroke: "#000000",
                            fillOpacity: 0.7,
                            strokeWidth: 3
                            }
                        }}
                        data={avgPerAppData}
                    />
        ) : (
            <Text> No data to display </Text>
        )}
        </VictoryChart>
    </View>
    )
    }
}

export default TAappsSmileysVictory;