import React, { PureComponent } from 'react'
import { ScrollView, Image, View, InteractionManager, ActivityIndicator, StyleSheet } from 'react-native'
import { Text, ListItem, Left, Right, Body } from 'native-base';
import DropDown from './DropDown';

// Styles
import colors from '../styles/colors';

export default class MonsterLocations extends PureComponent {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  renderLocations() {
    if (this.props.locations.length > 0) {
      return (
        this.props.locations.map((item, key) =>
        <DropDown
          key={key}
          headerName={`${item.name}`}
          hide={false}
          content={
            <View>
              <ListItem style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}>
                <Left style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>
                    Areas
                  </Text>
                </Left>
                <Right style={{ flex: 2 }}>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>
                    {/* {`${item.areas}`} */}
                    {item.areas !== null ? item.areas : 'N/A'}
                  </Text>
                </Right>
              </ListItem>
              {item.spawn !== null
                ?
                <ListItem style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}>
                  <Left style={{ flex: 1.5 }}>
                    <Text style={{ fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>
                      Spawn
                    </Text>
                  </Left>
                  <Right style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>
                      {`${item.spawn}`}
                    </Text>
                  </Right>
                </ListItem>
                : null
              }
              <ListItem style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}>
                <Left style={{ flex: 1.5 }}>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>
                    Rest
                  </Text>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>
                    {/* {`${item.rest}`} */}
                    {item.rest !== null ? item.rest : 'N/A'}
                  </Text>
                </Right>
              </ListItem>
            </View>
          }
        />)
      );
    }
    return null;
  }

  renderInfo() {
    return (
      <ScrollView>
        {this.renderLocations()}
      </ScrollView>
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
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
        {this.renderInfo()}
      </View>
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
  listHeader: {
    height: 45,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listItem: {
    height: 45,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
