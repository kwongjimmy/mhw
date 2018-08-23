import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Text, ScrollView, TouchableOpacity,Dimensions, StyleSheet, Platform } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import SortableListView from 'react-native-sortable-listview';
import AdBanner from '../components/AdBanner';
import WeaponListItem from '../components/WeaponListItem';
import KinsectListItem from '../components/KinsectListItem';
import ArmorListItem from '../components/ArmorListItem';
import SortableList from 'react-native-sortable-list';
import { saveWeaponOrder } from '../actions/favoritesActions';

// Styles
import colors from '../styles/colors';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.background,
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  contentContainer: {
    width: window.width,
    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },
      android: {
        paddingHorizontal: 0,
      }
    })
  }
});

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
          style={{ flex: 1, backgroundColor: 'white' }}
          data={this.props.favorites.weapons}
          order={this.state.orderWeapons}
          onRowMoved={e => {
            this.setState({ orderWeapon: this.state.orderWeapons.splice(e.to, 0, this.state.orderWeapons.splice(e.from, 1)[0]) })
            // this.forceUpdate()
          }}
          activeOpacity={0.8}
          disableAnimatedScrolling
          renderRow={(item) => {
             return (
               <TouchableOpacity style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                  <Text>HI</Text>
                  <Text>HI</Text>
                  <Text>HI</Text>
                  {/* <WeaponListItem navigator={this.props.navigator} item={item.info} favorites /> */}
                </View>
               </TouchableOpacity>
             );
          }}
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

  renderRow = ({data, active}) => {
  // renderRow = (item) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', padding: 15, borderBottomWidth: StyleSheet.hairlineWidth, borderTopWidth: StyleSheet.hairlineWidth }}>
          <TouchableOpacity style={{ flex: 7 }} onPressIn={() => console.log('test')}>
            <WeaponListItem navigator={this.props.navigator} item={data.info} favorites />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text>AAAAA</Text>
          </View>
        </View>
    )
    // return <Row data={data} active={active} />
  }

  render() {
    console.log(this.props.favorites.weapons);
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* <SortableList
          style={{ flex: 1, backgroundColor: colors.background }}
          contentContainerStyle={{ flex: 1 }}
          data={this.props.favorites.weapons}
          renderRow={this.renderRow}
          onReleaseRow={(key) => console.log(key)}
          onChangeOrder={(nextOrder) => {
              // this.props.saveWeaponOrder(nextOrder)
              // console.log(nextOrder);
            }
          }
        /> */}
        <SortableListView
          style={{ flex: 1, backgroundColor: 'white' }}
          data={this.props.favorites.weapons}
          order={this.state.orderWeapons}
          onRowMoved={e => {
            this.setState({ orderWeapon: this.state.orderWeapons.splice(e.to, 0, this.state.orderWeapons.splice(e.from, 1)[0]) })
          }}
          activeOpacity={0.8}
          disableAnimatedScrolling
          renderRow={(item) => {
             return (
               <TouchableOpacity
                 onPress={() => console.log('test')}
                 style={{ flex: 1, flexDirection: 'row', padding: 15, borderBottomWidth: StyleSheet.hairlineWidth, borderTopWidth: StyleSheet.hairlineWidth }}
               >
                 <View style={{ flex: 1 }}>
                   <WeaponListItem navigator={this.props.navigator} item={item.info} favorites />
                 </View>
               </TouchableOpacity>
             );
          }}
          // renderRow={(item) => this.renderRow(item)}
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
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps, { saveWeaponOrder })(FavoritesScreen);
