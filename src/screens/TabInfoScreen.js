import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SkillInfo from '../components/SkillInfo';
import MapInfo from '../components/MapInfo';
import WeaponInfo from '../components/WeaponInfo';

// Styles
import colors from '../styles/colors';

class TabInfoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
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
    if (this.props.type === 'maps') {
      return (
        <MapInfo navigator={this.props.navigator} map_id={this.props.item_id}/>
      );
    } else if (this.props.type === 'weapons') {
      return (
        <WeaponInfo
          navigator={this.props.navigator}
          item_id={this.props.item_id}
          item={this.props.item}
        />
      );
    }
    return (
      <SkillInfo navigator={this.props.navigator} armor_skill_id={this.props.armor_skill_id}/>
    );
  }
}

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps, {})(TabInfoScreen);
