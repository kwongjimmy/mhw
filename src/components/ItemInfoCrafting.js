import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, Body, Right, Left, Text } from 'native-base';
import { connect } from 'react-redux';
import AdBanner from './AdBanner';
import DropDown from './DropDown';

// Styles
import colors from '../styles/colors';

class ItemInfoCrafting extends PureComponent {
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
            style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
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
              <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`${item[0].material_name}`}</Text>
            </Left>
            <Right>
              <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`x${item[0].quantity}`}</Text>
            </Right>
          </ListItem>
          <ListItem
            style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
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
              <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`${item[1].material_name}`}</Text>
            </Left>
            <Right>
              <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`x${item[1].quantity}`}</Text>
            </Right>
          </ListItem>
        </View>
      );
    }
    return (
      <ListItem
        style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
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
          <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`${item[0].material_name}`}</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`x${item[0].quantity}`}</Text>
        </Right>
      </ListItem>
    );
  }

  renderListItems = (item, index) => {
    return (
      <View>
        <ListItem
          style={[styles.listHeader, { backgroundColor: this.props.theme.listItemHeader }]}
        >
          <Left>
            <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`Recipe #${index + 1}`}</Text>
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
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
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

export default connect(mapStateToProps, {})(ItemInfoCrafting);
