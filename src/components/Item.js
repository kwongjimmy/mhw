import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'native-base';
import { connect } from 'react-redux';

class Item extends PureComponent {
  onClick = () => this.props.navigator.push({
    screen: 'TablessInfoScreen',
    passProps: {
      item_id: this.props.item.item_id,
      type: 'item',
    },
    animationType: 'slide-horizontal',
    title: this.props.item.name,
  });

  render() {
    return (
      <ListItem
        style={[
          styles.listItem,
          {
            borderColor: this.props.theme.border,
            backgroundColor: this.props.theme.listItem,
          },
        ]}
        onPress={this.onClick}
      >
        {this.props.children}
      </ListItem>
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

export default connect(mapStateToProps, {})(Item);
