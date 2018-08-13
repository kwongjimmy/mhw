import React, { PureComponent } from 'react';
import { Image, View, ActivityIndicator, ScrollView } from 'react-native';
import { ListItem, Text, Right, Left, Body } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import AdBanner from './AdBanner';
import { EndemicImages } from '../assets';

// Styles
import colors from '../styles/colors';

export default class EndemicInfo extends PureComponent {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      loading: true,
      locations: [],
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      const locations = [];
      tx.executeSql(
        `SELECT * FROM pet_locations as A JOIN maps as B ON A.map_id = B.map_id where pet_name = ?`
        , [this.props.item], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            locations.push(row);
          }
          this.setState({
            loading: false, locations,
          });
          console.log(this.state);
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
        <ScrollView>
          <Image
            resizeMode="contain"
            resizeMethod="resize"
            style={{ width: 300, height: 300, alignSelf: 'center', justifyContent: 'center' }}
            source={EndemicImages[this.props.item]}
          />
          <ListItem itemDivider style={{ height: 50, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
            <Left style={{ flex: 1 }}>
              <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'left' }}>Type</Text>
            </Left>
          </ListItem>
          <ListItem style={{ height: 50, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
            <Left style={{ flex: 1 }}>
              <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'left' }}>{this.state.locations[0].field_guide}</Text>
            </Left>
          </ListItem>
          <ListItem itemDivider style={{ height: 50, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
            <Left style={{ flex: 1 }}>
              <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'left' }}>Locations</Text>
            </Left>
          </ListItem>
          {this.state.locations.map((item, key) => {
            return (
              <ListItem
                key={key}
                style={{ height: 50, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
                onPress={() => this.props.navigator.push({
                  screen: 'TabInfoScreen',
                  passProps: {
                    item_id: item.map_id,
                    type: 'maps',
                  },
                  animationType: 'slide-horizontal',
                  title: item.name,
              })}>
                <Left style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'left' }}>{item.name}</Text>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'left' }}>{item.zone}</Text>
                </Right>
              </ListItem>
            )
          })}
        </ScrollView>
        <AdBanner />
      </View>
    );
  }

  render() {
    return this.renderContent();
  }
}
