import React, { Component } from "react";
import {
  View,
  Text,
  BackHandler,
  Picker,
  ActivityIndicator,
  Alert,
  Button
} from "react-native";
import StatusBarAdjust from "../components/StatusBarAdjust";
import styles from "../style";
import ajax from "../ajax";
import FeedbackList from "../components/FeedbackList";
import FeedbackDetails from "./FeedbackDetails";

class FeedbackListScreen extends Component {
  state = {
    feedbacks: [],
    feedbackFormFilter: [],
    dataSource: [],
    currentFeedbackId: null,
    loading: false,
    refreshing: false,
    isFeedbackClick: false,
    isPickerLoading: true,
    pickerValueHolder: ""
  };

  setCurrentFeedback = feadbackId => {
    this.setState({
      currentFeedbackId: feadbackId
    });
  };

  currentFeedback = () => {
    return this.state.feedbacks.find(
      feedback => feedback.id === this.state.currentFeedbackId
    );
  };

  unsetCurrentFeedback = () => {
    this.setState({
      currentFeedbackId: null
    });
    return true;
  };

  _getFeedbackData = async () => {
    const _feedbacks = await ajax.getAllFeedbacks();
    this.setState({ feedbacks: _feedbacks });
  };

  _getFeedbackAppNames = async () => {
    const apiHost = ajax.getApiHost();
    return fetch(apiHost + "/get/apps")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isPickerLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this._getFeedbackData().then(() => {
      this.setState({ refreshing: false });
    });
  };

  _filterFeedbacks = async () => {
    const pickerValue = this.state.pickerValueHolder;
    let feedbackFormFilter = [];
    if (pickerValue !== "All") {
      feedbackFormFilter = await ajax.fetchFeedbacksFilteredResult(pickerValue);
    }
    this.setState({ feedbackFormFilter });
  };

  componentDidMount() {
    this._getFeedbackData();
    this._getFeedbackAppNames();
    this._filterFeedbacks();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.unsetCurrentFeedback
    );
  }
  componentWillUpdate() {
    this._filterFeedbacks();
  }

  render() {
    if (this.state.currentFeedbackId) {
      return (
        <View>
          <FeedbackDetails initialFeedbackData={this.currentFeedback()} />
        </View>
      );
    }

    const feedbacksToDisplay =
      this.state.feedbackFormFilter.length > 0
        ? this.state.feedbackFormFilter
        : this.state.feedbacks;
    if (feedbacksToDisplay.length > 0) {
      return (
        <View style={styles.container}>
          <StatusBarAdjust />
          <View style={styles.mlr20}>
            <View>
              <View style={styles.ptb10}>
                <Text style={[styles.text_white, styles.text_h2]}>
                  Feedback list
                </Text>
                <Text style={styles.text_white_opacity}>Updated 5 min ago</Text>
              </View>
              <View style={[styles.mtb25, { justifyContent: "flex-end" }]}>
                {() =>
                  this.state.isPickerLoading ? (
                    <View style={{ flex: 1, paddingTop: 20 }}>
                      <ActivityIndicator />
                    </View>
                  ) : (
                    <View>
                      <Text>Apps very well available</Text>
                    </View>
                  )
                }
                <View style={{ justifyContent: "center", flex: 1 }}>
                  <Picker
                    mode="dropdown"
                    style={[styles.filterDropdown, styles.pos_rel]}
                    selectedValue={this.state.pickerValueHolder}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ pickerValueHolder: itemValue })
                    }
                  >
                    <Picker.Item label="All" value="0" />
                    {this.state.dataSource.map((item, key) => {
                      return (
                        <Picker.Item
                          label={item.app}
                          value={item.app}
                          key={key}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={[styles.mtb25, { flexDirection: "row" }]}>
              <View>
                <Text style={[styles.text_white_opacity, styles.pt5]}>New</Text>
              </View>
              <View style={styles.badge}>
                <Text style={[styles.text_white]}>0</Text>
              </View>
            </View>
            <View>
              {/** feedback list comes here */}
              <FeedbackList
                feedbacks={feedbacksToDisplay}
                onItemPress={this.setCurrentFeedback}
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh.bind(this)}
              />
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>There is no feedback sent yet!</Text>
      </View>
    );
  }
}

export default FeedbackListScreen;
