import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import CharmInfo from '../components/CharmInfo';
import EquipArmorInfo from '../components/EquipArmorInfo';
import MapInfo from '../components/MapInfo';
import WeaponInfo from '../components/WeaponInfo';
import QuestInfo from '../components/QuestInfo';
import DecorationInfo from '../components/DecorationInfo';
import ItemInfo from '../components/ItemInfo';
import MonsterLoot from '../components/MonsterLoot';
import ArmorSetPiecesList from '../components/ArmorSetPiecesList';
import ToolInfo from '../components/ToolInfo';
import EndemicInfo from '../components/EndemicInfo';

// Styles
import colors from '../styles/colors';

class TablessInfoScreen extends PureComponent {
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
    if (this.props.type === 'monsterLoot') {
      return (
        <MonsterLoot navigator={this.props.navigator} categoryName={this.props.categoryName} lowRank={this.props.lowRank} monster_id={this.props.monster_id}/>
      );
    } else if (this.props.type === 'item') {
      return (
        <ItemInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
      );
    } else if (this.props.type === 'charms') {
      return (
        <CharmInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
      );
    } else if (this.props.type === 'maps') {
      return (
        <MapInfo navigator={this.props.navigator} map_id={this.props.item_id}/>
      );
    } else if (this.props.type === 'weapons') {
      return (
        <WeaponInfo
          navigator={this.props.navigator}
          item_id={this.props.item_id}
          item={this.props.item}
          type={this.props.weaponType}
          // refetch={this.props.refetch}
        />
      );
    } else if (this.props.type === 'quests') {
      return (
        <QuestInfo navigator={this.props.navigator} quest_id={this.props.quest_id}/>
      );
    } else if (this.props.type === 'decorations') {
      return (
        <DecorationInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
      );
    } else if (this.props.type === 'set') {
      return (
        <ArmorSetPiecesList navigator={this.props.navigator} armor={this.props.armor}/>
      );
    } else if (this.props.type === 'tools') {
      return (
        <ToolInfo navigator={this.props.navigator} item={this.props.item}/>
      );
    } else if (this.props.type === 'endemic') {
      return (
        <EndemicInfo navigator={this.props.navigator} item={this.props.item}/>
      );
    }
    return (
      <EquipArmorInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
    );
  }
}

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps, {})(TablessInfoScreen);
