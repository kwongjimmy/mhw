import React, { PureComponent } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import EquipArmorInfo from '../components/EquipArmorInfo';
import { MiscImages } from '../assets/';
import { addArmor, removeArmor } from '../actions/favoritesActions';

// Styles
import colors from '../styles/colors';

class EquipInfoScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    // if (this.props.favorites.armor[this.props.item_id] === undefined) {
    // if (_.findIndex(this.props.favorites.armor, obj => obj.armorID === this.props.item_id) === -1) {
    //   this.props.navigator.setButtons({
    //     rightButtons: [
    //       {
    //         // icon: require('../assets/images/misc/ItemIcon007.png'), // for icon button, provide the local image asset name
    //         icon: MiscImages.unfavorite,
    //         id: 'favorite', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
    //       },
    //     ], // see "Adding buttons to the navigator" below for format (optional)
    //     animated: true // does the change have transition animation or does it happen immediately (optional)
    //   });
    // } else {
    //   this.props.navigator.setButtons({
    //     rightButtons: [
    //       {
    //         // icon: require('../assets/images/misc/ItemIcon007.png'), // for icon button, provide the local image asset name
    //         icon: MiscImages.favorite,
    //         id: 'unfavorite', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
    //       },
    //     ], // see "Adding buttons to the navigator" below for format (optional)
    //     animated: true // does the change have transition animation or does it happen immediately (optional)
    //   });
    // }
  }

  onNavigatorEvent(event) {
    // if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
    //   if (event.id === 'favorite') { // this is the same id field from the static navigatorButtons definition
    //     this.props.addArmor({
    //       armorID: this.props.item_id,
    //       info: this.props.item,
    //     });
    //     this.props.navigator.setButtons({
    //       rightButtons: [
    //         {
    //           // icon: require('../assets/images/misc/ItemIcon007.png'), // for icon button, provide the local image asset name
    //           icon: MiscImages.favorite,
    //           id: 'unfavorite', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
    //         },
    //       ], // see "Adding buttons to the navigator" below for format (optional)
    //       animated: true // does the change have transition animation or does it happen immediately (optional)
    //     });
    //   } else if (event.id === 'unfavorite') {
    //     this.props.removeArmor({
    //       armorID: this.props.item_id,
    //     });
    //     this.props.navigator.setButtons({
    //       rightButtons: [
    //         {
    //           // icon: require('../assets/images/misc/ItemIcon007.png'), // for icon button, provide the local image asset name
    //           icon: MiscImages.unfavorite,
    //           id: 'favorite', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
    //         },
    //       ], // see "Adding buttons to the navigator" below for format (optional)
    //       animated: true // does the change have transition animation or does it happen immediately (optional)
    //     });
    //   }
    // }
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
      screenBackgroundColor: this.props.theme.background,
    });
  }

  render() {
    this.setNavSettings();
    // return <View style={{ flex: 1, backgroundColor: 'red'}}/>
    return (
      <EquipArmorInfo
        navigator={this.props.navigator}
        item_id={this.props.item_id}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    theme: state.settings.theme,
  };
};

export default connect(mapStateToProps, { addArmor, removeArmor })(EquipInfoScreen);
