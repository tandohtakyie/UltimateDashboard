import {PropTypes} from 'prop-types';
import Smiley from './Smiley';

class SmileyComponent extends React.Component {
  static propTypes = {
    pieData: PropTypes.object.isRequired,
  };

  render() {
    const {x, y} = this.props.pieData; // VictoryPie supplies x, y and datum
    const cat = <Smiley size={50} />;
    return (
      <text x={x} y={y} fontSize={30}>
        {cat}
      </text>
    );
  }
}

export default SmileyComponent;