import React, { PureComponent } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Container } from 'native-base';

export default class ItemInfoEquip extends PureComponent {
  constructor(props) {
    super(props);
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  //
  // onNavigatorEvent(event) {
  //   if (event.id === 'bottomTabSelected') {
  //     console.log('Tab selected!');
  //   }
  //   if (event.id === 'bottomTabReselected') {
  //   }
  // }

  renderListItems = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <FlatList
          data={this.props.items}
          keyExtractor={(item) => item.item_id.toString()}
          renderItem={this.renderListItems}
        />
      </Container>
    );
  }
}
