import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Text, ScrollView, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import SortableListView from 'react-native-sortable-listview';
import AdBanner from '../components/AdBanner';
import WeaponListItem from '../components/WeaponListItem';
import KinsectListItem from '../components/KinsectListItem';
import ArmorListItem from '../components/ArmorListItem';

// Styles
import colors from '../styles/colors';

class FavoritesScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      weapons: [],
      armors: [],
      loading: false,
      orderWeapons: Object.keys(this.props.favorites.weapons),
      orderArmor: Object.keys(this.props.favorites.armor),
    };
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

  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: colors.background }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    if (screen === 'Weapons') {
      return (
        <SortableListView
          style={{ flex: 1 }}
          data={this.props.favorites.weapons}
          order={this.state.orderWeapons}
          onRowMoved={e => {
            this.setState({ orderWeapon: order.splice(e.to, 0, order.splice(e.from, 1)[0]) })
            // this.forceUpdate()
          }}
          renderRow={data => <Text>{data.weaponID}</Text>}
        />
       //  <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
       //    {this.props.favorites.weapons.map((item, key) => {
       //      if (item.type === 'kinsect') {
       //        return (
       //          <KinsectListItem key={key} navigator={this.props.navigator} item={item.info}/>
       //        );
       //      }
       //      return (
       //        <WeaponListItem key={key} navigator={this.props.navigator} item={item.info}/>
       //      );
       //    })}
       // </ScrollView>
      );
    }
    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        {this.props.favorites.armor.map((item, key) => <ArmorListItem key={key} item={item.info} navigator={this.props.navigator}/>)}
       </ScrollView>
    );
  }

  render() {
    return (
      <Container>
        <SortableListView
          style={{ flex: 1, backgroundColor: 'white' }}
          data={this.props.favorites.weapons}
          order={this.state.orderWeapons}
          onRowMoved={e => {
            this.setState({ orderWeapon: order.splice(e.to, 0, order.splice(e.from, 1)[0]) })
            // this.forceUpdate()
          }}
          renderRow={(item) => {
             return (
               // <TouchableOpacity>
               //   <View style={{ height: 100, borderWidth: 1 }}>
               //     <Text>{item.weaponID}</Text>
               //   </View>
               // </TouchableOpacity>
              <WeaponListItem navigator={this.props.navigator} item={item.info}/>
             );
          }}
        />
        {/* <Tabs prerenderingSiblingsNumber={2} scrollWithoutAnimation={false} tabBarUnderlineStyle={{ backgroundColor: colors.accent, height: 3 }} initialPage={0}>
          <Tab
            activeTabStyle={{ backgroundColor: colors.background }}
            tabStyle={{ backgroundColor: colors.background }}
            activeTextStyle={{ color: colors.main }}
            textStyle={{ color: colors.secondary }}
            heading="Weapons"
            >
            {this.renderContent('Weapons')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: colors.background }}
            tabStyle={{ backgroundColor: colors.background }}
            activeTextStyle={{ color: colors.main }}
            textStyle={{ color: colors.secondary }}
            heading="Armor"
            >
            {this.renderContent('Armor')}
          </Tab>
        </Tabs> */}
        <AdBanner />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps, {})(FavoritesScreen);
