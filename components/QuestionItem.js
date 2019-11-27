import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {DataTable} from 'react-native-paper';


class QuestionItem extends React.Component {
  static propTypes = {
    feedback: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };


  render() {
    const {feedback} = this.props;
    return (
      <View>
        <DataTable>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 11, paddingBottom: 20, flexWrap: 'wrap'}}>
                {feedback.question}
              </DataTable.Cell>
              <DataTable.Cell
                style={{flex: 1, justifyContent: 'flex-end'}}>
                {feedback.avg}
              </DataTable.Cell>
            </DataTable.Row>
        </DataTable>
      </View>
    );
  }
}

export default QuestionItem;