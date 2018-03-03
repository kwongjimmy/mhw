import React, { Component } from 'react';
import { FlatList, Platform } from 'react-native';
import { Container, ListItem, Text, Left } from 'native-base';

export default class MiscScreen extends Component {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
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
          route: 'CharmScreen',
          title: 'Charms'
        },
        {
          route: 'DecorationScreen',
          title: 'Decorations'
        },
        {
          route: 'SkillScreen',
          title: 'Skills'
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
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
        screen: item.route,
        passProps: {

        },
        animationType: 'fade',
        title: item.title,
        })}>
        <Left>
          <Text>{item.title}</Text>
        </Left>
      </ListItem>
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
