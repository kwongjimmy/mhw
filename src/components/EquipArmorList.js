import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { ListItem, Left, Right, Body, Text } from 'native-base';
import EquipArmorContainer from './EquipArmorContainer';

// Styles
import colors from '../styles/colors';

export default class EquipArmorList extends PureComponent {
  renderArmorSet = ({ item }) => {
    return (
      // <EquipArmorContainer navigator={this.props.navigator} armor={item}/>
      <ListItem
        style={{ height: 52, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'EquipArmorSetScreen',
        passProps: {
          armor: item,
          type: 'set',
        },
        animationType: 'slide-horizontal',
        title: item.name,
        })}>
        <Left>
          <Text style={{ fontSize: 15.5, color: colors.main }}>
            {item.name}
          </Text>
        </Left>
      </ListItem>
    );
  }

  render() {
    return (
      <FlatList
        style={{ backgroundColor: colors.background }}
        initialNumToRender={12}
        data={this.props.armor}
        keyExtractor={item => item.armor_set_id.toString()}
        renderItem={this.renderArmorSet}
        getItemLayout={(data, index) => (
          { length: 52, offset: 52 * index, index }
        )}
      />
    );
  }
}
