import React, { PureComponent } from 'react';
import { View, FlatList, Platform, Image, ActivityIndicator } from 'react-native';
import { Container, ListItem, Text, Left, Body } from 'native-base';
import firebase from 'react-native-firebase';
import { MiscImages } from '../assets';
import AdBanner from '../components/AdBanner';

// Styles
import colors from '../styles/colors';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('games');
request.addKeyword('monster hunter');
request.addKeyword('video games');

export default class MiscScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
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
          title: 'Charms',
        },
        {
          route: 'DecorationScreen',
          title: 'Decorations',
        },
        {
          route: 'SkillScreen',
          title: 'Skills',
        },
        {
          route: 'MapScreen',
          title: 'Maps',
        },
        {
          route: 'AboutScreen',
          title: 'About',
        },
      ],
      loading: true,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'willAppear' && this.state.loading) {
      this.setState({
        loading: false,
      });
    }
  }

  renderListItems = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => this.props.navigator.push({
        screen: item.route,
        passProps: {

        },
        animationType: 'slide-horizontal',
        title: item.title,
        })}>
        <Left>
          <Image
            resizeMode="contain"
            style={{ width: 35, height: 35 }}
            source={MiscImages[item.title]}
          />
        </Left>
        <Body style={{ flex: 6 }}>
          <Text style={{ fontSize: 20, color: colors.main }}>{item.title}</Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          style={{ backgroundColor: 'white' }}
          data={this.state.screens}
          keyExtractor={item => item.route}
          renderItem={this.renderListItems}
        />
       <AdBanner />
     </View>
    );
  }
}
