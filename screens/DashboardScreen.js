import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import StatusBarAdjust from "../components/StatusBarAdjust";
import styles from "../style";
import Bar from "../components/Bar";
import PieChartWithClickSlices from "../components/PieChartWithClickSlices";
import CategoryDistr from "../components/CategoryDistr";
import SmileysAvgPerApp from "../components/SmileysAvgPerApp";
import LineChart from "../components/LineChart";
import {
  IndicatorViewPager,
  PagerTitleIndicator,
} from 'rn-viewpager';
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
    catDistr: []
  };

  componentDidMount() {
    this._getFeedbackAmountPerYear();
    this._getOsAmount();
    this._getSmileyRangeAmount();
    this._getAvgPerApp();
    this._getCatDistr();
  }

  _getCatDistr = async () => {
    await fetch(ajax.getApiHost() + "/get/catDistr", { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          catDistr: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

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
    fetch(apiHost + "/feedbacks/year/2019", { method: "GET" })
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
    this._getCatDistr();
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
    console.log("osDashboardscreen: " + os);
    console.log("feedbackPerYear: " + feedbacksPerYear);
    const smileyRange = this.state.smileys;
    const avgPerAppData = this.state.avgPerApp;
    const catDistrData = this.state.catDistr;

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
                <LineChart 
                feedbacksPerYear={feedbacksPerYear}
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh} />
              </View>
            </View>
          <IndicatorViewPager
              style={{ height: 425 }}
              indicator={this._renderSmileyChartsTitleIndicator()}>
            <View style={styles.panel_Dashboard}>
              <Text style={[styles.text_bold, styles.text_white]}>
                Satisfaction index
              </Text>
              {this.state.smileys.length > 0 ? (
                <PieChartWithClickSlices 
                smileys={smileyRange}
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh}/>
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
                <SmileysAvgPerApp 
                avgPerApp={avgPerAppData}
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh} />
              </View>
            </View>
          </IndicatorViewPager>
          <IndicatorViewPager
              style={{ height: 550 }}
              indicator={this._renderSmileyChartsTitleIndicator()}>
                <View style={styles.panel_Dashboard}>
              <Text style={[styles.text_white, styles.text_bold, styles.ptb10]}>
                OS distribution
              </Text>
              {this.state.os.length > 0 ? (
                <Bar 
                os={os}
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh} />
              ) : (
                <Text style={styles.text_white_opacity}>No data available</Text>
              )}
            </View>
            <View style={styles.panel_Dashboard}>
              <View>
                <Text
                  style={[styles.text_bold, styles.text_white, styles.ptb10]}
                >
                  Category distribution
                </Text>
                <CategoryDistr 
                catDistr={catDistrData}
                onListRefresh={this.state.refreshing}
                onPullDownRefresh={this.handleRefresh} />
              </View>
            </View>
            </IndicatorViewPager>
          </View>
        </ScrollView>
      </View>
    );
  }

  _renderLineChartsTitleIndicator() {
    return <PagerTitleIndicator titles={['2019', '2020']} />;
  }
  _renderSmileyChartsTitleIndicator() {
    return <PagerTitleIndicator titles={['Smiley rating', 'App rating']} />;
  }
  _renderOSCatTitleIndicator() {
    return <PagerTitleIndicator titles={['Mobile OS', 'Category']} />;
  }

}

export default DashboardScreen;
