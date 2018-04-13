import React, { PureComponent } from 'react';
import { Platform, View, FlatList, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { ListItem, Text, Left, Right, Body } from 'native-base';
import AdBanner from '../components/AdBanner';

// Styles
import colors from '../styles/colors';

export default class ToolScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      tools: [],
      loading: true,
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      const tools = [];
      tx.executeSql(
        `SELECT * FROM tools as A join items as B where A.item_id = B.item_id ORDER BY B.name`
        , [], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            tools.push(row);
          }
          this.setState({ tools, loading: false });
          // db.closetools
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
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item,
          type: 'tools'
        },
        animationType: 'slide-horizontal',
        title: item.name,
      })}
      >
      <Left style={{ flex: 1 }}>
        <Text style={{ fontSize: 15.5, color: colors.main }}>{item.name}</Text>
      </Left>
      <Right style={{ flex: 1 }}>
        <Text style={{ fontSize: 14.5, color: colors.main }}>{item.effects}</Text>
      </Right>
      </ListItem>
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          style={{ backgroundColor: 'white' }}
          initialNumToRender={11}
          data={this.state.tools}
          keyExtractor={(item) => item.item_id.toString()}
          renderItem={this.renderListItems}
        />
        <AdBanner />
      </View>
    );
  }

  render() {
    return this.renderContent();
  }
}
