import React, { Component } from "react";
import { View, Text, ScrollView, Platform } from "react-native";
import PropTypes from "prop-types";
import StatusBarAdjust from "../components/StatusBarAdjust";
import ajax from "../ajax";
import styles from "../style";
import Smiley from "../components/Smiley";

class FeedbackDetails extends Component {
  static propTypes = {
    feedback: PropTypes.object
  };
  state = {
    feedback: this.props.initialFeedbackData
  };

  async componentDidMount() {
    const fullFeedback = await ajax.getFeedbackDetail(this.state.feedback.id);
    this.setState({
      FeedbackDetail: fullFeedback
    });
  }

  render() {
    const { feedback } = this.state;
    return (
      <View style={styles.container}>
        <StatusBarAdjust />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.mlr20, styles.pt5]}>
            <View style={styles.ptb10}>
              <Text style={[styles.text_h3, styles.text_white]}>
                Feedback id : {feedback.id}
              </Text>
            </View>
            <View style={styles.panel}>
              <View style={styles.panel_header}>
                <Text style={[styles.text_white, styles.h2, styles.text_bold]}>
                  Date
                </Text>
                <Text style={[styles.text_white_opacity, styles.ptb10]}>
                  {feedback.time}
                </Text>
              </View>
              <View style={styles.hr} />
              <View style={styles.ptb10}>
                <Text style={styles.text_white}>
                  <Text style={styles.text_bold}>Category : </Text>
                  <Text style={styles.text_white_opacity}>
                    {feedback.category}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.panel}>
              <View style={[styles.panel_header, styles.pos_rel]}>
                <Text style={[styles.text_white, styles.h2, styles.text_bold]}>
                  User's mood rate : {feedback.smiley}
                </Text>
                <View style={styles.smiley_icon_position}>
                  <Smiley userInput={feedback.smiley} />
                </View>
              </View>
              <View style={[styles.hr, styles.mt15]} />
              <View style={styles.ptb10}>
                <Text style={styles.text_white}>
                  <Text style={styles.text_bold}>Feedback : </Text>
                  <Text style={styles.text_white_opacity}>
                    {feedback.feedback}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.panel}>
              <View style={[styles.panel_header, styles.pos_rel]}>
                <Text style={[styles.text_white, styles.h2, styles.text_bold]}>
                  Feedback metadata
                </Text>
              </View>
              <View style={[styles.hr, styles.mt15]} />
              <View style={styles.ptb10}>
                <Text style={styles.text_white}>
                  <Text style={styles.text_bold}>Operation system : </Text>
                  <Text style={styles.text_white_opacity}>{feedback.os}</Text>
                </Text>
              </View>
              <View style={styles.ptb10}>
                <Text style={styles.text_white}>
                  <Text style={styles.text_bold}>User device : </Text>
                  <Text style={styles.text_white_opacity}>
                    {feedback.device}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default FeedbackDetails;
