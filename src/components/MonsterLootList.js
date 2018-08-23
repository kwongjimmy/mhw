import React, { Component } from 'react';
import { View, FlatList, InteractionManager, ActivityIndicator, StyleSheet } from 'react-native';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import { connect } from 'react-redux';
import AdBanner from './AdBanner';
import DropDown from './DropDown';
import Item from './Item';

// Styles
import colors from '../styles/colors';

class MonsterLootList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.monster_loot,
      lowRank: this.props.lowRank,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
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

  renderListItems = (data) => {
    return (
      <DropDown
        headerName={data[0].name}
        hide={true}
        content={
          <FlatList
            data={data}
            keyExtractor={item => item.loot_name}
            renderItem={({ item }) =>
              <Item item={item} navigator={this.props.navigator}>
                <Left>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.loot_name}</Text>
                </Left>
                <Right>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`x${item.quantity}`}</Text>
                </Right>
                <Right>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`${item.chance}%`}</Text>
                </Right>
              </Item>
            }
          />
        //   item.map((data, key) => {
        //     return (
        //       <Item key={key} item={data} navigator={this.props.navigator}>
        //         <Left>
        //           <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{data.loot_name}</Text>
        //         </Left>
        //         <Right>
        //           <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`x${data.quantity}`}</Text>
        //         </Right>
        //         <Right>
        //           <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`${data.chance}%`}</Text>
        //         </Right>
        //       </Item>
        //     );
        //   })
        }
      />
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: this.props.theme.background,
        }}>
          <ActivityIndicator size="large" color={this.props.theme.main}/>
        </View>
      );
    }
    if (!this.state.loading && this.state.data.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: this.props.theme.background }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: this.props.theme.secondary }} />
          <Text style={{ textAlign: 'center', fontSize: 25, color: this.props.theme.secondary }}>No Data</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
        <FlatList
          initialNumToRender={12}
          data={this.state.data}
          keyExtractor={item => item[0].name}
          renderItem={({ item }) => this.renderListItems(item)}
          // getItemLayout={(data, index) => (
          //   { length: 52, offset: 52 * index, index }
          // )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 45,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const mapStateToProps = (state) => {
  return state.settings
};

export default connect(mapStateToProps, {})(MonsterLootList);
