import React, { PureComponent } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ListItem, Left, Right, Body, Text } from 'native-base';
import EquipArmorContainer from './EquipArmorContainer';

// Styles
import colors from '../styles/colors';

export default class EquipArmorList extends PureComponent {
  renderArmorSet = ({ item }) => {
    return (
      // <EquipArmorContainer navigator={this.props.navigator} armor={item}/>
      <ListItem
        style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.background }]}
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
          <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>
            {item.name}
          </Text>
        </Left>
      </ListItem>
    );
  }

  render() {
    return (
      <FlatList
        style={{ backgroundColor: this.props.theme.background }}
        initialNumToRender={12}
        data={this.props.armor}
        keyExtractor={item => item.armor_set_id.toString()}
        renderItem={this.renderArmorSet}
        getItemLayout={(data, index) => (
          { length: 50, offset: 50 * index, index }
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
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
