import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import StatusBarAdjust from "../components/StatusBarAdjust";
import styles from "../style";
import Bar from "../components/Bar";
import PieChartWithClickSlices from "../components/PieChartWithClickSlices";
import TACatDistr from "../components/TACatDistr";
import TAappsSmileysVictory from "../components/TAappsSmileysVictory";
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
    refreshing: false,
    avgPerApp: [],
  };

  componentDidMount() {
    this._getFeedbackAmountPerYear();
    this._getOsAmount();
    this._getSmileyRangeAmount();
    this._getAvgPerApp();
  }

  _getAvgPerApp = async () => {
    await fetch(ajax.getApiHost() + "/getAvgPerApp", { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          avgPerApp: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _getFeedbackAmountPerYear = async () => {
    await fetch(apiHost + "/feedbacks/year", { method: "GET" })
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
    await fetch(apiHost + "/os2/android+ios", { method: "GET" })
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
    await fetch(apiHost + "/linecount/smiley", { method: "GET" })
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
    this._getAvgPerApp();
    this._getFeedbackAmountPerYear().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    const feedbacksPerYear = this.state.feedbacksPerYear;
    const os = this.state.os;
    const smileyRange = this.state.smileys;
    const avgPerAppData = this.state.avgPerApp;

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
                <LineChart 
                feedbacksPerYear={feedbacksPerYear} 
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh} 
                />
            </View>
            <View style={styles.panel_Dashboard}>
              <Text style={[styles.text_white, styles.text_bold, styles.ptb10]}>
                OS distribution
              </Text>
                <Bar 
                os={os}
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh}
                />
            </View>
            <View style={styles.panel_Dashboard}>
              <Text style={[styles.text_bold, styles.text_white]}>
                Satisfaction index
              </Text>
                <PieChartWithClickSlices 
                smileys={smileyRange} 
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh}
                />
            </View>
            <View style={styles.panel_Dashboard}>
              <View>
                <Text
                  style={[styles.text_white, styles.text_bold, styles.ptb10]}
                >
                  Average rating per app
                </Text>
                <TAappsSmileysVictory 
                  avgPerAppCount={avgPerAppData}
                />
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
