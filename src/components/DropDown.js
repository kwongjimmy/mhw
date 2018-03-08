import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Text, Icon, Left, Right, ListItem } from 'native-base';

export default class DropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      headerName: this.props.headerName,
      content: this.props.content,
      hide: this.props.hide,
    };
  }

  renderHeaderIcon() {
    if (!this.state.hide) {
      return (
        <Icon ios='ios-arrow-down' android="ios-arrow-down" style={{ fontSize: 20, color: 'red' }}/>
      );
    }
    return (
      <Icon ios='ios-arrow-up' android="ios-arrow-up" style={{ fontSize: 20, color: 'red' }}/>
    );
  }

  renderContent() {
    if (!this.state.hide) {
      return this.state.content;
    }
    return (
      null
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8, borderBottomWidth: 0.5, borderColor: '#d1d1d1' }}
          itemDivider
          onPress={() => {
            this.setState({ hide: !this.state.hide });
          }}>
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{this.state.headerName}</Text>
          </Left>
          <Right>
            {this.renderHeaderIcon()}
          </Right>
        </ListItem>
        {this.renderContent()}
      </View>
    );
  }
}
