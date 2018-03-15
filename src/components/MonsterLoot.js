import React, { PureComponent } from 'react';
import { View, FlatList, InteractionManager, ActivityIndicator } from 'react-native';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import DropDown from './DropDown';
import AdBanner from './AdBanner';

export default class MonsterLoot extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lowrank: true,
      data: this.props.monster_loot,
    };
    this.currentCondition = '';
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

  renderListHeader(item) {
    if (this.currentCondition !== item.name) {
      this.currentCondition = item.name;
      return (
        <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
          <Left>
            <Text style={{ fontSize: 15.5, fontWeight: '300', color: '#191919' }}>{item.name}</Text>
          </Left>
          <Right />
        </ListItem>
      );
    }
    return (
      null
    );
  }

  renderListItems = ({ item }) => {
    return (
      <DropDown
        headerName={`${item[0].name}`}
        hide={false}
        content={item.map((item2, key2) => {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 8 }}
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
              <Text style={{ fontSize: 15.5, color: '#191919' }}>{item2.item_name}</Text>
            </Left>
            <Right>
              <Text style={{ fontSize: 15.5, color: '#191919' }}>{`${item2.chance}%`}</Text>
            </Right>
          </ListItem>
        );
        })}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white',
        }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    if (!this.state.loading && this.state.data.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: '#8e8e8e' }} />
          <Text style={{ textAlign: 'center', fontSize: 25, color: '#8e8e8e' }}>No Data</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          initialNumToRender={12}
          data={this.state.data}
          keyExtractor={item => `${item[0].name} ${item[0].item_name}`}
          renderItem={this.renderListItems}
          getItemLayout={(data, index) => (
            { length: 52, offset: 52 * index, index }
          )}
        />
        <AdBanner />
      </View>
    );
  }
}
