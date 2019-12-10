import React from 'react';
import {VictoryPie, VictoryLabel} from 'victory-native';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import Svg from 'react-native-svg';
import SmileyComponent from './SmileyComponent';

class PieChart extends React.PureComponent {
  static propTypes = {
    smileys: PropTypes.array.isRequired,
    onListRefresh: PropTypes.bool.isRequired,
    onPullDownRefresh: PropTypes.func.isRequired,
  };

  render() {
    const smileys = this.props.smileys;
    const smileyRangeCount = smileys.map((item, index) => item.SmileyRange);
    const smileyComponentData = [
      {x: '1', y: smileyRangeCount[0]},
      {x: '2', y: smileyRangeCount[1]},
      {x: '3', y: smileyRangeCount[2]},
      {x: '4', y: smileyRangeCount[3]},
      {x: '5', y: smileyRangeCount[4]},
      {x: '6', y: smileyRangeCount[5]},
      {x: '7', y: smileyRangeCount[6]},
      {x: '8', y: smileyRangeCount[7]},
      {x: '9', y: smileyRangeCount[8]},
      {x: '10', y: smileyRangeCount[9]},
    ];

    return (
      <Svg
        width={400}
        height={400}
        style={{width: '100%', height: 'auto'}}>
        {smileys.length !== 0 ? (
          <VictoryPie
            standalone={false}
            style={{
              data: {
                stroke: 'black',
                opacity: ({datum}) => (datum.y > 75 ? 1 : 0.4),
              },
            }}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: 'labels',
                        mutation: (props) => { 
                          return props.text === "😻" ?
                          null : { text: "😻" }
                        },
                      },
                    ];
                  },
                },
              },
            ]} 
            innerRadius={({datum}) => datum.y}
            data={smileyComponentData}
            colorScale={[
              '#D85F49',
              '#F66D3B',
              '#D92E1D',
              '#D73C4C',
              '#FFAF59',
              '#E28300',
              '#F6A57F',
            ]}
          />
        ) : (
          <Text>No data available</Text>
        )}
      </Svg>
    );
  }
}

export default PieChart;