import React, { Component } from "react";
import { View, Text, Picker } from "react-native";
import styles from "../style";
import ajax from "../ajax";
import StatusBarAdjust from "../components/StatusBarAdjust";
import QuestionList from "../components/QuestionList";

class QuestionScreen extends Component {
  state = {
    questions: [],
    questionsFormFilter: [],
    currentFeedbackId: null,
    dataSource: [],
    loading: false,
    refreshing: false,
    isFeedbackClick: false,
    isPickerLoading: true,
    pickerValueHolder: "",
    justPicked: false
  };  
  
  
  _getFeedbackAppNames = async () => {
    const apiHost = await ajax.getApiHost();
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
        console.error("getFeedbackAppNames "+error);
      });
  };  
  
  _filterFeedbacks = async () => {
    console.log("Filtering");

    const pickerValue = this.state.pickerValueHolder;
    let questionsFormFilter = [];
    if (pickerValue !== "Choose An App") {
      questionsFormFilter = await ajax.getQuestionsAndAvg(pickerValue);
    }
    this.setState({ questionsFormFilter });
    this.setState({ justPicked: false})

  };  
  
  componentDidMount() {
    this._getFeedbackAppNames();
    this._filterFeedbacks();
  }
  
  componentWillUpdate() {
    console.log("Inside WillUpdate");

    const picked = this.state.justPicked;
    console.log(picked);

      if (picked){
        this._filterFeedbacks();
        console.log("Inside if");
    }  
  }  
  
  render() {
    const questionsToDisplay = this.state.questionsFormFilter;
    const appname = this.state.pickerValueHolder;

    if (questionsToDisplay.length > 0) {
      return (
          <View style={styles.container}>
            <StatusBarAdjust />
            <View style={styles.mlr20}>
              <View>
                <View style={styles.ptb10}>
                  <Text style={[styles.text_white, styles.text_h2]}>
                    Average star rating per question
                  </Text>
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
                        this.setState({ 
                          pickerValueHolder: itemValue,
                          justPicked : true })
                      }
                    >
                      <Picker.Item label="Choose An App" value="0" />
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
              <View>
                <QuestionList
                  style={{backgroundColor: "#fff"}}
                  feedbacks={questionsToDisplay}
                  appName={appname}/>
              </View>
            </View>
          </View>
        );
      }
      else {
          return (
              <View style={styles.container}>
                <StatusBarAdjust />
                <View style={styles.mlr20}>
                  <View>
                    <View style={styles.ptb10}>
                      <Text style={[styles.text_white, styles.text_h2]}>
                        Average star rating per question
                      </Text>
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
                            this.setState({ 
                              pickerValueHolder: itemValue,
                              justPicked : true })
                          }
                        >
                          <Picker.Item label="Choose An App" value="0" />
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

                </View>
              </View>
            );
      }
  }        
}         
export default QuestionScreen;
