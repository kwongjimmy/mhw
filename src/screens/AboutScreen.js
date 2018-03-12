import React, { PureComponent } from 'react';
import { View, Linking, Platform } from 'react-native';
import { Text, ListItem, Left, Right, Body } from 'native-base';

export default class AboutScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: 'red',
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      // console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ListItem itemDivider>
          <Text style = {{ fontSize: 15.5 }}>Contact Info</Text>
        </ListItem>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => Linking.openURL('mailto:support@domain.com?subject=[MHW DB] Suggestions and Feedback')}>
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>chingoosat242@gmail.com</Text>
          </Left>
        </ListItem>
        <ListItem itemDivider>
          <Text style = {{ fontSize: 15.5 }}>Sources</Text>
        </ListItem>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => Linking.openURL('https://mhworld.kiranico.com/')}>
          <Left>
            <Text style = {{ fontSize: 15.5 }}>Wikia - Monster Hunter World Data</Text>
          </Left>
        </ListItem>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => Linking.openURL('http://monsterhunter.wikia.com/wiki/Monster_Hunter:_World')}>
          <Left>
          <Text style = {{ fontSize: 15.5 }}>Kiranico - Monster Hunter World Data</Text>
          </Left>
        </ListItem>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => Linking.openURL('https://monsterhunterworld.wiki.fextralife.com/Monster+Hunter+World+Wiki')}>
          <Left>
            <Text style = {{ fontSize: 15.5 }}>Fextralife - Monster Hunter World Wiki Data</Text>
          </Left>
        </ListItem>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => Linking.openURL('http://monsterhunter.wikia.com/wiki/Images_GeneStarwind')}>
          <Left>
            <Text style = {{ fontSize: 15.5 }}>GeneStarwind - Monster Hunter Icons</Text>
          </Left>
        </ListItem>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => Linking.openURL('http://monsterhunter.wikia.com/wiki/User:YukiHerz')}>
          <Left>
            <Text style = {{ fontSize: 15.5 }}>YukiHerz - Monster Icons</Text>
          </Left>
        </ListItem>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => Linking.openURL('http://monsterhunter.wikia.com/wiki/User:Mckrongs')}>
          <Left>
            <Text style = {{ fontSize: 15.5 }}>Mckrongs - Element Icons</Text>
          </Left>
        </ListItem>
      </View>
    );
  }
}
