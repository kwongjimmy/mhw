import React, { PureComponent } from 'react';
import { Platform, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Left, Right, ListItem, Text } from 'native-base';
import AdBanner from '../components/AdBanner';

// Styles
import colors from '../styles/colors';

export default class EndemicScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      pets: [],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      const pets = [];
      tx.executeSql(
        `SELECT DISTINCT pet_name, map_id, field_guide FROM pet_locations GROUP BY pet_name`,
        [], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            pets.push(row);
          }
          this.setState({ pets });
          // db.close();
        },
      );
    });
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

  renderListItems = ({ item }) => {
    return (
      <ListItem style={{ height: 50, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item: item.pet_name,
          type: 'endemic',
        },
        animationType: 'slide-horizontal',
        title: item.pet_name,
      })}>
      <Left style={{ flex: 1 }}>
        <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'left' }}>{item.pet_name}</Text>
      </Left>
      <Right style={{ flex: 1 }}>
        <Text style={{ fontSize: 15.5, color: colors.secondary, textAlign: 'left' }}>{item.field_guide}</Text>
      </Right>
      </ListItem>
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: colors.background }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          style={{ backgroundColor: colors.background }}
          initialNumToRender={24}
          data={this.state.pets}
          keyExtractor={item => `${item.pet_name.toString()} ${item.map_id}`}
          renderItem={this.renderListItems}
          getItemLayout={(data, index) => (
            { length: 50, offset: 50 * index, index }
          )}
        />
        <AdBanner />
      </View>
    );
  }

  render() {
    return this.renderContent();
  }
}
