import React, { PureComponent } from 'react';
import { View, Linking, Platform, StyleSheet } from 'react-native';
import { Text, ListItem, Left, Right, Body } from 'native-base';
import { connect } from 'react-redux';

// Styles
import colors from '../styles/colors';

class AboutScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
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

  setNavSettings() {
    this.props.navigator.setStyle({
      navBarButtonColor: this.props.theme.main,
      navBarTextColor: this.props.theme.main,
      navBarBackgroundColor: this.props.theme.background,
      statusBarTextColorScheme: this.props.theme.statusbar,
      statusBarColor: this.props.theme.background,
      tabBarBackgroundColor: this.props.theme.background,
    });
  }

  render() {
    this.setNavSettings();
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
        <ListItem style={[styles.listHeader, { backgroundColor: this.props.theme.listItemHeader }]}>
          <Text style = {{ fontSize: 15.5, color: this.props.theme.main }}>Contact Info</Text>
        </ListItem>
        <ListItem
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
          onPress={() => Linking.openURL('mailto:chingoosat242@gmail.com?subject=[MHW DB] Suggestions and Feedback')}>
          <Left>
            <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>chingoosat242@gmail.com</Text>
          </Left>
        </ListItem>
        <ListItem style={[styles.listHeader, { backgroundColor: this.props.theme.listItemHeader }]}>
          <Text style = {{ fontSize: 15.5, color: this.props.theme.main }}>Sources</Text>
        </ListItem>
        <ListItem
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
          onPress={() => Linking.openURL('https://mhworld.kiranico.com/')}>
          <Left>
            <Text style = {{ fontSize: 15.5, color: this.props.theme.main }}>Kiranico - Monster Hunter World Data</Text>
          </Left>
        </ListItem>
        <ListItem
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
          onPress={() => Linking.openURL('http://monsterhunter.wikia.com/wiki/Monster_Hunter:_World')}>
          <Left>
          <Text style = {{ fontSize: 15.5, color: this.props.theme.main }}>Wikia - Monster Hunter World Data</Text>
          </Left>
        </ListItem>
        <ListItem
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
          onPress={() => Linking.openURL('https://monsterhunterworld.wiki.fextralife.com/Monster+Hunter+World+Wiki')}>
          <Left>
            <Text style = {{ fontSize: 15.5, color: this.props.theme.main }}>Fextralife - Monster Hunter World Wiki Data</Text>
          </Left>
        </ListItem>
        <ListItem
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
          onPress={() => Linking.openURL('http://monsterhunter.wikia.com/wiki/Images_GeneStarwind')}>
          <Left>
            <Text style = {{ fontSize: 15.5, color: this.props.theme.main }}>GeneStarwind - Monster Hunter Icons</Text>
          </Left>
        </ListItem>
        <ListItem
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
          onPress={() => Linking.openURL('http://monsterhunter.wikia.com/wiki/User:YukiHerz')}>
          <Left>
            <Text style = {{ fontSize: 15.5, color: this.props.theme.main }}>YukiHerz - Monster Icons</Text>
          </Left>
        </ListItem>
        <ListItem
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
          onPress={() => Linking.openURL('http://monsterhunter.wikia.com/wiki/User:Mckrongs')}>
          <Left>
            <Text style = {{ fontSize: 15.5, color: this.props.theme.main }}>Mckrongs - Element Icons</Text>
          </Left>
        </ListItem>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listHeader: {
    height: 45,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 0,
  },
  listItem: {
    height: 45,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps, {})(AboutScreen);
