import React from "react";
import Smiley from './Smiley';
import { Text } from 'react-native-svg';

class SmileyComponent extends React.Component {

  render() {
    const {x, y, datum} = this.props;
    const cat = "😻" ;
    return (
      <Text x={20} y={30} fontSize={30}>  
        {cat}
      </Text>
    );
  }
}

export default SmileyComponent;