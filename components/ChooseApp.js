import React, { Component } from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  Platform,
  Picker,
  ActivityIndicator,
  Button,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import ajax from "../ajax";
import styles from "../style";

export default class ChooseApp extends React.Component {
  static propTypes = {};
  state = {
    isPickerLoading: true,
    pickerValueHolder: "",
    dataSource: []
  };

  debounceFilterFeedbacks = debounce(this.props.filterFeedbacks, 200);

  handleChange = filterTerm => {
    this.setState({ filterTerm }, () => {
      this.debounceFilterFeedbacks(this.state.pickerValueHolder);
    });
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
        console.error(error);
      });
  };

  componentDidMount() {
    this._getFeedbackAppNames();
  }

  render() {
    return (
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
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ pickerValueHolder: itemValue });
            }}
          >
            <Picker.Item label="All" value="0" />
            {this.state.dataSource.map((item, key) => {
              return (
                <Picker.Item
                  label={item.appName}
                  value={item.appName}
                  key={key}
                />
              );
            })}
          </Picker>
        </View>
      </View>
    );
  }
}
