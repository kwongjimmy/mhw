import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Text, Platform } from 'react-native';
import _ from 'lodash';
import WeaponInfo from '../components/WeaponInfo';
import { MiscImages } from '../assets/';
import { addWeapon, removeWeapon } from '../actions/favoritesActions';

// Styles
import colors from '../styles/colors';

class WeaponInfoScreen extends PureComponent {
  // static navigatorStyle = {
  //   topBarElevationShadowEnabled: Platform.OS !== 'ios',
  //   topBarBorderColor: colors.accent,
  //   topBarBorderWidth: 17,
  // };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    if (this.props.type !== 'light_bowgun' && this.props.type !== 'heavy_bowgun') {
      this.props.navigator.setStyle({
        topBarElevationShadowEnabled: Platform.OS !== 'ios',
        topBarBorderColor: colors.accent,
        topBarBorderWidth: 17,
      });
    }
    // if (_.findIndex(this.props.favorites.weapons, obj => obj.weaponID === this.props.item_id) === -1) {
    // // if (this.props.favorites.weapons[this.props.item_id] === undefined) {
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
    //     this.props.addWeapon({
    //       weaponID: this.props.item_id,
    //       info: this.props.item,
    //       type: this.props.type,
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
    //     this.props.removeWeapon({
    //       weaponID: this.props.item_id,
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

  render() {
    return (
      <WeaponInfo
        navigator={this.props.navigator}
        item_id={this.props.item_id}
        item={this.props.item}
        type={this.props.type}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps, { addWeapon, removeWeapon })(WeaponInfoScreen);
