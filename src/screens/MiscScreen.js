import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';

export default class MiscScreen extends Component {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarElevationShadowEnabled: true,
    topBarBorderColor: 'red',
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      screens: [
        {
          route: 'ItemScreen',
          title: 'Items',
        },
        {
          route: 'QuestScreen',
          title: 'Quests',
        },
        {
          route: 'MapScreen',
          title: 'Maps',
        },
      ],
    };
  }

  renderListItems = ({ item }) => {
    return (
      <View style={{
        paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 0, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5
      }}>
        <View style={{
          flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0,
        }}>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({
            screen: item.route,
            passProps: {

            },
            animationType: 'fade',
            title: item.title,
          })}>
            <Text style={{ fontSize: 15.5, flex: 1, color: '#191919' }}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <FlatList
          data={this.state.screens}
          keyExtractor={(item) => item.route}
          renderItem={this.renderListItems}
        />
      </Container>
    );
  }
}
