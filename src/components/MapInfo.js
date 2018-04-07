import React, { PureComponent } from 'react';
import { ScrollView, FlatList, View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ListItem, Text, Left, Body, Right, Icon } from 'native-base';
import _ from 'lodash';
import DropDown from './DropDown';
import AdBanner from './AdBanner';

// Styles
import colors from '../styles/colors';

export default class MapInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      low: [],
      high: [],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      let low = [];
      let high = [];
      tx.executeSql(
        `SELECT DISTINCT A.map_id as map_id, A.name as name, B.chance as chance, B.area as area, C.name as item_name, C.item_id as item_id
          FROM maps AS A JOIN map_items as B ON A.map_id = B.map_id JOIN items as C ON B.item_id = C.item_id
          WHERE A.map_id = ? AND B.rank = "Low"`
        , [this.props.map_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          // let area = 0;
          // let first = true;
          // let areaArr = [];
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            low.push(row);
          }
          low = _.groupBy(low, area => area.area);
          low = _.values(low);
        },
      );
      tx.executeSql(
        `SELECT DISTINCT A.map_id as map_id, A.name as name, B.chance as chance, B.area as area, C.name as item_name, C.item_id as item_id
          FROM maps AS A JOIN map_items as B ON A.map_id = B.map_id JOIN items as C ON B.item_id = C.item_id
          WHERE A.map_id = ? AND B.rank = "High"`
        , [this.props.map_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          // let area = 0;
          // let first = true;
          // let areaArr = [];
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            high.push(row);
          }
          high = _.groupBy(high, area => area.area);
          high = _.values(high);
          this.setState({
            high,
            low,
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

  renderListItems = ({ item }) => {
    return (
        <DropDown
          headerName={`Area ${item[0].area}`}
          hide={true}
          content={item.map((item2, key2) => {
          return (
            <ListItem
              style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
              onPress={() => this.props.navigator.push({
                screen: 'TablessInfoScreen',
                passProps: {
                  item_id: item2.item_id,
                  type: 'item',
                },
                animationType: 'slide-horizontal',
                title: item2.item_name,
              })}
              key={key2}>
              <Left>
                <Text style={{ fontSize: 15.5, color: colors.main }}>{item2.item_name}</Text>
              </Left>
              <Right>
                <Text style={{ fontSize: 15.5, color: colors.main }}>{`${item2.chance}%`}</Text>
              </Right>
            </ListItem>
          );
        })}
      />
    );
  }

  renderContent(screen) {
    if (!this.state.loading && this.state.low.length === 0 && screen === 'tab1') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: colors.secondary }} />
          <Text style={{ textAlign: 'center', fontSize: 25, color: colors.secondary }}>No Data</Text>
        </View>
      );
    } else if (!this.state.loading && this.state.high.length === 0 && screen === 'tab2') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: colors.secondary }} />
          <Text style={{ textAlign: 'center', fontSize: 25, color: colors.secondary }}>No Data</Text>
        </View>
      );
    }
    if (screen === 'tab1') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            initialNumToRender={12}
            data={this.state.low}
            keyExtractor={item => `${item[0].area} ${item[0].item_name}`}
            renderItem={this.renderListItems}
            getItemLayout={(data, index) => (
              { length: 52, offset: 52 * index, index }
            )}
          />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          initialNumToRender={12}
          data={this.state.high}
          keyExtractor={item => `${item[0].area} ${item[0].item_name}`}
          renderItem={this.renderListItems}
          getItemLayout={(data, index) => (
            { length: 52, offset: 52 * index, index }
          )}
        />
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <Container>
        <Tabs
          prerenderingSiblingsNumber={2}
          tabBarUnderlineStyle={{ backgroundColor: colors.accent, height: 3 }}
          initialPage={0}
          >
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTextStyle={{ color: colors.main }}
            textStyle={{ color: colors.secondary }}
            heading="Low Rank"
            >
            {this.renderContent('tab1')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTextStyle={{ color: colors.main }}
            textStyle={{ color: colors.secondary }}
            heading="High Rank"
            >
            {this.renderContent('tab2')}
          </Tab>
        </Tabs>
        <AdBanner />
      </Container>
    );
  }
}
