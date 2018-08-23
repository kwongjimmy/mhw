import React, { PureComponent } from 'react';
import { Platform, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { ListItem, Text, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import AdBanner from '../components/AdBanner';


// Styles
import colors from '../styles/colors';

class CombinationScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      crafting: [],
      loading: true,
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      let crafting = [];
      tx.executeSql(
        `SELECT A.*, B.name as name, C.name as material_name
          FROM crafting as A
          JOIN items as B ON A.item_id = B.item_id
          JOIN items as C on A.item_material_id = C.item_id
          WHERE craft_id NOT NULL`
        , [], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            crafting.push(row);
          }
          crafting = _.groupBy(crafting, item => item.craft_id);
          crafting = _.values(crafting);
          this.setState({ crafting, loading: false });
        },
      );
    });
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

  renderMaterials(item) {
    if (item.length > 1) {
      return (
        <Right style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={{ fontSize: 12, color: this.props.theme.secondary, textAlign: 'right' }}>{`${item[0].material_name} x${item[0].quantity}`}</Text>
          <Text style={{ fontSize: 12, color: this.props.theme.secondary, textAlign: 'right' }}>{`${item[1].material_name} x${item[1].quantity}`}</Text>
        </Right>
      );
    }
    return (
      <Right style={{ flex: 2, justifyContent: 'center' }}>
        <Text style={{ fontSize: 12, color: this.props.theme.secondary, textAlign: 'right' }}>{`${item[0].material_name} x${item[0].quantity}`}</Text>
      </Right>
    );
  }

  renderListItems = ({ item }) => {
    return (
      <ListItem
        style={[styles.listHeader, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.background === 'black' ? this.props.theme.listItemHeader : this.props.theme.listItem }]}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item_id: item[0].item_id,
          type: 'item'
        },
        animationType: 'slide-horizontal',
        title: item[0].name,
      })}>
      <Left style={{ flex: 2 }}>
        <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item[0].name}</Text>
      </Left>
      {this.renderMaterials(item)}
      </ListItem>
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: this.props.theme.background }}>
          <ActivityIndicator size="large" color={this.props.theme.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
        <FlatList
          style={{ backgroundColor: this.props.theme.background }}
          initialNumToRender={24}
          data={this.state.crafting}
          keyExtractor={item => item[0].craft_id.toString()}
          renderItem={this.renderListItems}
        />
        <AdBanner />
      </View>
    );
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
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  listHeader: {
    height: 55,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listItem: {
    height: 50,
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

export default connect(mapStateToProps, {})(CombinationScreen);
