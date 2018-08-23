import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, Body, Right, Left, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import AdBanner from './AdBanner';
import DropDown from './DropDown';

// Styles
import colors from '../styles/colors';

class ItemInfoQuest extends PureComponent {
  constructor(props) {
    super(props);
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
      <ListItem
        style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          type: 'quests',
          quest_id: item.quest_id,
        },
        animationType: 'slide-horizontal',
        title: item.name,
        })}>
        <Left>
          <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 14.5, color: this.props.theme.secondary }}>{item.type.replace('Assignment', '')}</Text>
          <Text style={{ fontSize: 14.5, color: this.props.theme.secondary }}>{`${item.required_rank} \u2605`}</Text>
        </Right>
      </ListItem>
    );
  }

  renderListHeader() {
    return (
      <ListItem style={[styles.listHeader, { backgroundColor: this.props.theme.listItemHeader }]}>
        <Left>
          <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>Quests</Text>
        </Left>
        <Right />
      </ListItem>
    );
  }
  render() {
    if (this.props.items.length === 0) {
      return (
        null
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
        <DropDown
          headerName={'Quest Rewards'}
          hide={true}
          content={
            <FlatList
              // ListHeaderComponent={this.renderListHeader()}
              initialNumToRender={8}
              contextContainerStyle={{ paddingTop: 20 }}
              data={this.props.items}
              keyExtractor={(item) => item.quest_id.toString()}
              renderItem={this.renderListItems}
              getItemLayout={(data, index) => (
                { length: 65, offset: 65 * index, index }
              )}
            />}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listHeader: {
    height: 50,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 0,
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

export default connect(mapStateToProps, {})(ItemInfoQuest);
