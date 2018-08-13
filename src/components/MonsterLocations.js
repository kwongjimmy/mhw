import React, { PureComponent } from 'react'
import { ScrollView, Image, View, InteractionManager, ActivityIndicator } from 'react-native'
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
              <ListItem style={{ marginLeft: 0, marginRight: 0, paddingLeft: 18, paddingRight: 18 }}>
                <Left style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                    Areas
                  </Text>
                </Left>
                <Right style={{ flex: 2 }}>
                  <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                    {`${item.areas}`}
                  </Text>
                </Right>
              </ListItem>
              {item.spawn !== null
                ?
                <ListItem style={{ marginLeft: 0, marginRight: 0, paddingLeft: 18, paddingRight: 18 }}>
                  <Left style={{ flex: 1.5 }}>
                    <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                      Spawn
                    </Text>
                  </Left>
                  <Right style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                      {`${item.spawn}`}
                    </Text>
                  </Right>
                </ListItem>
                : null
              }
              <ListItem style={{ marginLeft: 0, marginRight: 0, paddingLeft: 18, paddingRight: 18 }}>
                <Left style={{ flex: 1.5 }}>
                  <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                    Rest
                  </Text>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                    {`${item.rest}`}
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
    console.log(this.props);
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
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: colors.background,
        }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {this.renderInfo()}
      </View>
    );
  }
}
