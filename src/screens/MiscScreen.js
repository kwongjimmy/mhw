import React, { PureComponent } from 'react';
import { View, FlatList, Platform, Image } from 'react-native';
import { Container, ListItem, Text, Left, Body } from 'native-base';
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded,
// } from 'react-native-admob';
import { MiscImages } from '../assets';

export default class MiscScreen extends PureComponent {
  static navigatorStyle = {
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
      ],
    };
  }

  renderListItems = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18 }}
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
          <Text style={{ fontSize: 20, color: '#191919' }}>{item.title}</Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <FlatList
        style={{ backgroundColor: 'white' }}
        data={this.state.screens}
        keyExtractor={(item) => item.route}
        renderItem={this.renderListItems}
      />
      {/* <AdMobBanner
        style={{ alignSelf: 'center' }}
        adSize="fullBanner"
        validAdSizes={['banner', 'largeBanner', 'mediumRectangle']}
        adUnitID="ca-app-pub-9661316023859369/7600878725"
        // testDevices={[AdMobBanner.simulatorId]}
        // onAdFailedToLoad={error => console.error(error)}
        onAppEvent={event => console.log(event.name, event.info)}
      /> */}
    </View>
    );
  }
}
