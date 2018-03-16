import React, { PureComponent } from 'react';
import { View, FlatList, Platform, Image, Linking} from 'react-native';
import { Container, ListItem, Text, Left, Body } from 'native-base';
import firebase from 'react-native-firebase';
import { MiscImages } from '../assets';
import AdBanner from '../components/AdBanner';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('games');
request.addKeyword('monster hunter');
request.addKeyword('video games');

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
        {
          route: 'AboutScreen',
          title: 'About',
        }
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          style={{ backgroundColor: 'white' }}
          data={this.state.screens}
          keyExtractor={(item) => item.route}
          renderItem={this.renderListItems}
        />
      {/* <Banner
        unitId={'ca-app-pub-3940256099942544/6300978111'}
          // unitId={'ca-app-pub-9661316023859369/7600878725'}
         size={'SMART_BANNER'}
         request={request.build()}
         onAdFailedToLoad={error => console.log(error)}
         onAdLoaded={() => {
           console.log('Advert loaded');
         }}
       /> */}
       <AdBanner />
     </View>
    );
  }
}
