import React, { Component } from 'react';
import {View, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import QuestionItem from './QuestionItem';
import {DataTable} from 'react-native-paper';


class QuestionList extends Component {

    static propTypes = {
      feedbacks: PropTypes.array.isRequired,
      onItemPress: PropTypes.func.isRequired,
      onListRefresh: PropTypes.bool.isRequired,
      onPullDownRefresh: PropTypes.func.isRequired,
      appName: PropTypes.string.isRequired
    };
  
    render() {
      return (
        <View style={{ backgroundColor: "#fff" }}>
          <DataTable>
            <DataTable.Header>
            <DataTable.Title style={{justifyContent: 'center', backgroundColor: '#8f9db3'}}>{this.props.appName}</DataTable.Title>
            </DataTable.Header>
            <DataTable.Header>
                <DataTable.Title>Question</DataTable.Title>
                <DataTable.Title style={{justifyContent: 'flex-end'}}> Avg star</DataTable.Title>
            </DataTable.Header>
          </DataTable>
          <FlatList
            style={{marginBottom: 10 }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={this.props.feedbacks}
            renderItem={({ item }) => (
              <QuestionItem
                key={item.id}
                feedback={item}
                feedbackID={item.id}
              />
            )}
          />
        </View>
      );
    }
}

export default QuestionList;