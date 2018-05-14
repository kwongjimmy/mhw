import React, { PureComponent } from 'react'
import { ScrollView, Image, View, FlatList, InteractionManager, ActivityIndicator } from 'react-native'
import { Text, ListItem, Left, Right, Body } from 'native-base';
import { ElementStatusImages } from '../assets';

// Styles
import colors from '../styles/colors';

export default class MonsterWeakness extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stickyHeaderIndices: [0],
      data: this.props.monster_hit,
      loading: true,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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

  renderHeader() {
    return (
      <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
        <Text style={[{ fontSize: 13, color: colors.main, flex: 2.5 }]}>{''}</Text>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Sever}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Blunt}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Shot}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Stun}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Fire}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Water}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Ice}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Thunder}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Dragon}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Extract}
          />
        </View>
      </ListItem>
    );
  }

  renderExtractColor(item) {
    if (item.extract_color === '') {
      return <Text></Text>;
    }
    return <View style={[{ borderRadius: 25, borderWidth: 1, borderColor: colors.main, height: 15, width: 15, backgroundColor: item.extract_color }]} />;
  }

  renderDamageHeader() {
    return (
      <ListItem style={{ height: 45, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
        <Left style={{ flex: 1 }}>
          <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'center' }}></Text>
        </Left>
        <Right style={{ flex: 1 }}>
          <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'center' }}>Flinch</Text>
        </Right>
        <Right style={{ flex: 1 }}>
          <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'center' }}>Wound</Text>
        </Right>
        <Right style={{ flex: 1 }}>
          <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'center' }}>Sever</Text>
        </Right>
      </ListItem>
    );
  }

  renderDamage() {
    return (
      <View>
        {this.renderDamageHeader()}
        {this.state.data.map((item, key) => {
          if (item.extract_color !== '') {
            return (
              <ListItem key={key} style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
                <Left style={{ flex: 1 }}>
                  <Text style={[{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'left' }]}>{item.part_name}</Text>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'center' }}>{item.flinch}</Text>
                </Right>
                <Right style={{ flex: 1 }}>
                  <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'center' }}>{item.wound}</Text>
                </Right>
                <Right style={{ flex: 1 }}>
                  <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'center' }}>{item.sever2}</Text>
                </Right>
              </ListItem>
            );
          }
          return null;
        })}
      </View>
    );
  }

  renderWeakness() {
    return (
      <View>
        {this.renderHeader()}
        {this.state.data.map((item, key) => {
          return (
            <ListItem key={key} style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
              <Text style={[{ color: colors.main, flex: 2.5, fontSize: 9.5, textAlign: 'left' }]}>{item.part_name}</Text>
              <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'center' }}>{item.sever}</Text>
              <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'center' }}>{item.blunt}</Text>
              <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'center' }}>{item.shot}</Text>
              <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'center' }}>{item.stun}</Text>
              <Text style={[{ flex: 1, fontSize: 13, textAlign: 'center', color: colors.accent }]}>{item.fire}</Text>
              <Text style={[{ flex: 1, fontSize: 13, textAlign: 'center', color: 'darkblue' }]}>{item.water}</Text>
              <Text style={[{ flex: 1, fontSize: 13, textAlign: 'center', color: 'teal' }]}>{item.ice}</Text>
              <Text style={[{ flex: 1, fontSize: 13, textAlign: 'center', color: '#e5c100' }]}>{item.thunder}</Text>
              <Text style={[{ flex: 1, fontSize: 13, textAlign: 'center', color: 'purple' }]}>{item.dragon}</Text>
              <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
                {this.renderExtractColor(item)}
              </View>
            </ListItem>
          );
        })}
      </View>
    );
  }

  renderInfo() {
    if (this.props.monster_size === 'Large') {
      return (
        <ScrollView>
          {this.renderWeakness()}
          {this.renderDamage()}
        </ScrollView>
      );
    }
    return (
      <ScrollView>
        {this.renderWeakness()}
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
