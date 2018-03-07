import React, { PureComponent } from 'react';
import { ScrollView, FlatList, View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ListItem, Text, Left, Body, Right } from 'native-base';
import DropDown from './DropDown';

export default class MapInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      areas: [],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      let areas = [];
      tx.executeSql(
        `SELECT DISTINCT A.map_id as map_id, A.name as name, B.area as area, C.name as item_name, C.item_id as item_id
          FROM maps AS A JOIN map_items as B ON A.map_id = B.map_id JOIN items as C ON B.item_id = C.item_id
          WHERE A.map_id = ?`
        , [this.props.map_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          let area = 0;
          let first = true;
          let areaArr = [];
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            if (area !== row.area && first) {
              area = row.area;
              areaArr.push(row);
              first = false;
            } else if ( area !== row.area && !first) {
              areas.push(areaArr);
              areaArr = [];
              area = row.area;
              areaArr.push(row);
            } else {
              areaArr.push(row);
            }
            if (i + 1 === len) {
              areas.push(areaArr);
            }
          }
          this.setState({
            areas,
            loading: false,
          });
        },
      );
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      //console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    return (
      <ScrollView>
        {this.state.areas.map((item, key) => {
          return (
            <DropDown
              key={key}
              headerName={`Area ${item[0].area}`}
              hide={true}
              content={item.map((item2, key2) => {
              return (
                <ListItem
                  style={{ marginLeft: 0, paddingLeft: 8 }}
                  onPress={() => this.props.navigator.push({
                    screen: 'TabInfoScreen',
                    passProps: {
                      item_id: item2.item_id,
                      type: 'item',
                    },
                    animationType: 'slide-horizontal',
                    title: item2.name,
                  })}
                  key={key2}>
                  <Left>
                    <Text style={{ fontSize: 15.5, color: '#191919' }}>{item2.item_name}</Text>
                  </Left>
                  <Right>
                  </Right>
                </ListItem>
              );
            })}
          />
          );
        })}
      </ScrollView>
    );
  }

  render() {
    return this.renderContent();
  }
}
