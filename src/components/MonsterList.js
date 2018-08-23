import React, { PureComponent } from 'react';
import { Image, View, FlatList, InteractionManager, ActivityIndicator } from 'react-native';
import { Text, Left, Body, Right, ListItem } from 'native-base';
import { MonsterImages } from '../assets';
import { connect } from 'react-redux';

// Styles
import colors from '../styles/colors';

export default class MonsterList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this._onPress = this._onPress.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  _onPress = (item) => {
    this.props.navigator.push({
      screen: 'MonsterInfoScreen',
      passProps: {
        monster_id: item.monster_id,
        monster_info: item,
      },
      animationType: 'slide-horizontal',
      title: item.monster_name,
    });
  }

  renderMonster = ({ item }) => {
    let src = MonsterImages['Unknown'];
    let name = item.monster_name;
    name = name.replace(/["'-]/g, '');
    name = name.replace(' ', '');
    src = MonsterImages[name];
    return (
      <ListItem
        style={{ height: 80, marginLeft: 0, paddingLeft: 18, borderColor: this.props.theme.border }}
        onPress={() => this._onPress(item)}>
      <Left>
        <Image
          resizeMode="contain"
          style={{ width: 60, height: 60 }}
          source={src}
        />
      </Left>
      <Body style={{ flex: 4 }}>
        <Text style={{ fontSize: 18, color: this.props.theme.main }}>{item.monster_name}</Text>
        <Text style={{ fontSize: 15.5, color: this.props.theme.secondary }}>{item.type}</Text>
      </Body>
      </ListItem>
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
      <FlatList
        style={{ backgroundColor: this.props.theme.background }}
        initialNumToRender={7}
        data={this.props.monsters}
        keyExtractor={item => item.monster_id.toString()}
        renderItem={this.renderMonster}
        getItemLayout={(data, index) => (
          { length: 80, offset: 80 * index, index }
        )}
      />
    );
  }
}

// const mapStateToProps = (state) => {
//   return state.settings;
// };
//
// export default connect(mapStateToProps, {})(MonsterList);
