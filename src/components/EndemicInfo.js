import React, { PureComponent } from 'react';
import { Image, View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Text, Right, Left, Body } from 'native-base';
import { connect } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';
import AdBanner from './AdBanner';
import { EndemicImages } from '../assets';

// Styles
import colors from '../styles/colors';

class EndemicInfo extends PureComponent {
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
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: this.props.theme.background }}>
          <ActivityIndicator size="large" color={this.props.theme.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
        <ScrollView>
          <Image
            resizeMode="contain"
            resizeMethod="resize"
            style={{ width: 300, height: 300, alignSelf: 'center', justifyContent: 'center' }}
            source={EndemicImages[this.props.item]}
          />
          <ListItem
            style={[styles.listHeader, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItemHeader }]}
          >
            <Left style={{ flex: 1 }}>
              <Text style={{ fontSize: 15.5, color: this.props.theme.main, textAlign: 'left' }}>Type</Text>
            </Left>
          </ListItem>
          <ListItem
            style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
          >
            <Left style={{ flex: 1 }}>
              <Text style={{ fontSize: 15.5, color: this.props.theme.main, textAlign: 'left' }}>{this.state.locations[0].field_guide}</Text>
            </Left>
          </ListItem>
          <ListItem
            style={[styles.listHeader, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItemHeader }]}
          >
            <Left style={{ flex: 1 }}>
              <Text style={{ fontSize: 15.5, color: this.props.theme.main, textAlign: 'left' }}>Locations</Text>
            </Left>
          </ListItem>
          {this.state.locations.map((item, key) => {
            return (
              <ListItem
                key={key}
                style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
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
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main, textAlign: 'left' }}>{item.name}</Text>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main, textAlign: 'left' }}>{item.zone}</Text>
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

const styles = StyleSheet.create({
  listHeader: {
    height: 50,
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

export default connect(mapStateToProps, {})(EndemicInfo);
