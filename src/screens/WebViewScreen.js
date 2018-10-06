import React, { PureComponent } from 'react';
import { View, Linking, Platform, StyleSheet, ScrollView, WebView } from 'react-native';
import { Text, ListItem, Left, Right, Body } from 'native-base';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';

class WebViewScreen extends PureComponent {
  render() {
    return (
      <WebView
        source={{ uri: this.props.link }}
        // style={{ marginTop: 20 }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps, {})(WebViewScreen);
