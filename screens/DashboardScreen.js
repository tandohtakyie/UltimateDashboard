import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import StatusBarAdjust from "../components/StatusBarAdjust";
import styles from "../style";
import Bar from "../components/Bar";
import PieChartWithClickSlices from "../components/PieChartWithClickSlices";
import TACatDistr from "../components/TACatDistr";
import TAappSmileys from "../components/TAappsSmileys";
import LineChart from "../components/LineChart";
import ajax from "../ajax";

const apiHost = ajax.getApiHost() + "/get";

class DashboardScreen extends Component {
  state = {
    feedbacksPerYear: [],
    months: [],
    os: [],
    loading: false,
    smileys: [],
    refreshing: false
  };

  componentDidMount() {
    this._getFeedbackAmountPerYear();
    this._getOsAmount();
    this._getSmileyRangeAmount();
  }

  _getFeedbackAmountPerYear = async () => {
    fetch(apiHost + "/feedbacks/year", { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          feedbacksPerYear: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _getOsAmount = async () => {
    fetch(apiHost + "/os2/android+ios", { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          os: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _getSmileyRangeAmount = async () => {
    fetch(apiHost + "/linecount/smiley", { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          smileys: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this._getOsAmount();
    this._getSmileyRangeAmount();
    this._getFeedbackAmountPerYear().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    const feedbacksPerYear = this.state.feedbacksPerYear;
    const os = this.state.os;
    //console.log("osDashboardscreen: " + os);
    //console.log("feedbackPerYear: " + feedbacksPerYear);
    const smileyRange = this.state.smileys;

    return (
      <View style={[styles.container]}>
        <StatusBarAdjust />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.handleRefresh()}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.mlr10, styles.ptb10]}>
            <View style={styles.panel_Dashboard}>
              <Text style={[styles.text_white, styles.text_bold]}>
                Feedback amount this year
              </Text>
              <View>
                <LineChart feedbacksPerYear={feedbacksPerYear} />
              </View>
            </View>
            <View style={styles.panel_Dashboard}>
              <Text style={[styles.text_white, styles.text_bold, styles.ptb10]}>
                OS distribution
              </Text>
              {this.state.os.length > 0 ? (
                <Bar os={os} />
              ) : (
                <Text style={styles.text_white_opacity}>No data available</Text>
              )}
            </View>
            <View style={styles.panel_Dashboard}>
              <Text style={[styles.text_bold, styles.text_white]}>
                Satisfaction index
              </Text>
              {this.state.smileys.length > 0 ? (
                <Text>PieChartWithClickSlices will come here</Text>
              ) : (
                <Text style={styles.text_white_opacity}>No data available</Text>
              )}
            </View>
            <View style={styles.panel_Dashboard}>
              <View>
                <Text
                  style={[styles.text_white, styles.text_bold, styles.ptb10]}
                >
                  Average rating per app
                </Text>
                <TAappSmileys />
              </View>
            </View>
            <View style={styles.panel_Dashboard}>
              <View>
                <Text
                  style={[styles.text_bold, styles.text_white, styles.ptb10]}
                >
                  Category distribution
                </Text>
                <TACatDistr />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DashboardScreen;
