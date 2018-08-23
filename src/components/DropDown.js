import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon, Left, Right, ListItem } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Styles
import colors from '../styles/colors';

class DropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hide: this.props.hide,
    };
  }

  renderHeaderIcon() {
    if (!this.state.hide) {
      return (
        <Icon ios='ios-arrow-down' android="ios-arrow-up" style={{ fontSize: 20, color: colors.accent }}/>
      );
    }
    return (
      <Icon ios='ios-arrow-up' android="ios-arrow-down" style={{ fontSize: 20, color: colors.accent }}/>
    );
  }

  renderContent() {
    if (!this.state.hide) {
      return this.props.content;
    }
    return (
      null
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem
          style={[styles.listHeader, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItemHeader }]}
          itemDivider
          onPress={() => {
            this.setState({ hide: !this.state.hide });
          }}>
          <Left>
            <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{this.props.headerName}</Text>
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

DropDown.defaultProps = {
  headerName: '',
  content: <View />,
  hide: false,
};

DropDown.propTypes = {
  headerName: PropTypes.string,
  content: PropTypes.object.isRequired,
  hide: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  listHeader: {
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

export default connect(mapStateToProps, {})(DropDown);
