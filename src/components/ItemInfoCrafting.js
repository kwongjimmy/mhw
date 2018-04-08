import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Body, Right, Left, Text } from 'native-base';
import AdBanner from './AdBanner';
import DropDown from './DropDown';

// Styles
import colors from '../styles/colors';

export default class ItemInfoCrafting extends PureComponent {
  constructor(props) {
    super(props);
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

  renderMaterials(item) {
    if (item.length > 1) {
      return (
        <View>
          <ListItem
            style={{ height: 50, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.push({
            screen: 'TablessInfoScreen',
            passProps: {
              item_id: item[0].item_material_id,
              type: 'item'
            },
            animationType: 'slide-horizontal',
            title: item[0].material_name,
          })}>
            <Left>
              <Text style={{ fontSize: 15.5, color: colors.main }}>{`${item[0].material_name}`}</Text>
            </Left>
            <Right>
              <Text style={{ fontSize: 15.5, color: colors.main }}>{`x${item[0].quantity}`}</Text>
            </Right>
          </ListItem>
          <ListItem
            style={{ height: 50, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.push({
            screen: 'TablessInfoScreen',
            passProps: {
              item_id: item[1].item_material_id,
              type: 'item'
            },
            animationType: 'slide-horizontal',
            title: item[1].material_name,
          })}>
            <Left>
              <Text style={{ fontSize: 15.5, color: colors.main }}>{`${item[1].material_name}`}</Text>
            </Left>
            <Right>
              <Text style={{ fontSize: 15.5, color: colors.main }}>{`x${item[1].quantity}`}</Text>
            </Right>
          </ListItem>
        </View>
      );
    }
    return (
      <ListItem
        style={{ height: 50, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item_id: item[0].item_material_id,
          type: 'item'
        },
        animationType: 'slide-horizontal',
        title: item[0].material_name,
      })}>
        <Left>
          <Text style={{ fontSize: 15.5, color: colors.main }}>{`${item[0].material_name}`}</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 15.5, color: colors.main }}>{`x${item[0].quantity}`}</Text>
        </Right>
      </ListItem>
    );
  }

  renderListItems = (item, index) => {
    return (
      <View>
        <ListItem
          style={{ height: 50, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18, backgroundColor: colors.divider }}
          itemDivider
        >
          <Left>
            <Text style={{ fontSize: 15.5, color: colors.main }}>{`Recipe #${index + 1}`}</Text>
          </Left>
          <Right />
        </ListItem>
        {this.renderMaterials(item)}
      </View>
    );
  }

  render() {
    if (this.props.crafting.length === 0) {
      return (
        null
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <DropDown
          headerName={'Combination'}
          hide={true}
          content={
            <FlatList
              initialNumToRender={8}
              contextContainerStyle={{ paddingTop: 20 }}
              data={this.props.crafting}
              keyExtractor={item => item[0].craft_id.toString()}
              renderItem={({ item, index }) => this.renderListItems(item, index)}
              getItemLayout={(data, index) => (
                { length: 50, offset: 50 * index, index }
              )}
            />}
          />
      </View>
    );
  }
}
