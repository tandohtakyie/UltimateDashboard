import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BottomNavigation } from "react-native-paper";

import DashboardScreen from "./screens/DashboardScreen";
import FeedbackListScreen from "./screens/FeedbackListScreen";
import QuestionScreen from "./screens/QuestionScreen";

const DashboardRoute = () => <DashboardScreen />;
const FeedbackRoute = () => <FeedbackListScreen />;
const QuestionsRoute = () => <QuestionScreen />;

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      {
        key: "dashboard",
        title: "Dashboard",
        icon: "monitor-dashboard",
        color: "#181f2d"
      },
      {
        key: "feedbackList",
        title: "Feedback List",
        icon: "format-list-checkbox",
        color: "#181f2d"
      },
      {
        key: "questions",
        title: "Questions",
        icon: "format-text-rotation-none",
        color: "#181f2d"
      }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    dashboard: DashboardRoute,
    feedbackList: FeedbackRoute,
    questions: QuestionsRoute
  });

  render() {
    console.disableYellowBox = true;
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        shifting={true}
      />
    );
  }
}
