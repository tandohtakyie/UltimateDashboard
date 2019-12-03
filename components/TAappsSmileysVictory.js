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
        {avgPerAppData.length !== 0 ? (
                    <VictoryBar
                        style={{
                            data: {
                            fill: "rgb(134, 65, 244)"
                            }
                        }}
                        data={avgPerAppData}
                    />
        ) : (
            <Text> No data to display </Text>
        )}
    </View>
    )
    }
}

export default TAappsSmileysVictory;