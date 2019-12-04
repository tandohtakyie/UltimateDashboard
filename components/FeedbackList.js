import React, { Component } from "react";
import { View, RefreshControl, FlatList } from "react-native";
import PropTypes from "prop-types";
import styles from "../style";
import FeedbackItem from "./FeedbackItem";

class FeedbackList extends Component {
  static propTypes = {
    feedbacks: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onListRefresh: PropTypes.bool.isRequired,
    onPullDownRefresh: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={{ marginBottom: 75 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={this.props.feedbacks}
          renderItem={({ item }) => (
            <FeedbackItem
              key={item.id}
              feedback={item}
              onPress={this.props.onItemPress}
              feedbackID={item.id}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.props.onListRefresh}
              onRefresh={this.props.onPullDownRefresh}
            />
          }
        />
      </View>
    );
  }
}

export default FeedbackList;
