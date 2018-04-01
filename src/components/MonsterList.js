import React, { PureComponent } from 'react';
import { Image, View, FlatList, InteractionManager, ActivityIndicator } from 'react-native';
import { Text, Left, Body, Right, ListItem } from 'native-base';
import { MonsterImages } from '../assets';

// Styles
import styles from '../screens/Styles/MonsterScreenStyles';

export default class MonsterList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  renderMonster = ({ item }) => {
    let src = MonsterImages['Unknown'];
    let name = item.monster_name;
    if (name !== 'Gajalaka' && name !== 'Grimalkyne') {
      name = name.replace(/["'-]/g, '');
      name = name.replace(' ', '');
      src = MonsterImages[name];
    }
    return (
      <ListItem
        style={{ height: 80, marginLeft: 0, paddingLeft: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'MonsterInfoScreen',
        passProps: {
          monster_id: item.monster_id,
          monster_info: item,
        },
        animationType: 'slide-horizontal',
        title: item.monster_name,
      })}>
      <Left>
        <Image
          resizeMode="contain"
          style={{ width: 60, height: 60 }}
          source={src}
        />
      </Left>
      <Body style={{ flex: 4 }}>
        <Text style={styles.monsterText}>{item.monster_name}</Text>
        <Text style={styles.monsterTypeText}>{item.type}</Text>
      </Body>
      </ListItem>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white',
        }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    return (
      <FlatList
        style={{ backgroundColor: 'white' }}
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
