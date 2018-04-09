import React, { PureComponent } from 'react'
import { ScrollView, Image, View, InteractionManager, ActivityIndicator } from 'react-native'
import { Text, ListItem, Left, Right, Body } from 'native-base';
import { ElementStatusImages } from '../assets';

// Styles
import colors from '../styles/colors';

const effectiveness = {
  true: `\u25ef`,
  false: `\u2573`,
  '△': `\u25b3`,
  'small': 'Small',
  'medium': 'Medium',
  'large': 'Large',
  'long': 'Long',
  'short': 'Short',
  null: '-',
};

const ailment = {
  'blast': 'Blast',
  'fatique': 'Fatique',
  'mount': 'Mount',
  'paralysis': 'Paralysis',
  'poison': 'Poison',
  'sleep': 'Sleep',
  'stun': 'Stun',
  'dragonseal': 'Dragon Seal'
}

export default class MonsterInfo extends PureComponent {
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

  renderTypeSize() {
    return (
      <View>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Type
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Size
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Health
          </Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            {this.props.info.type}
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            {this.props.info.size}
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            {this.props.info.hp}
          </Text>
        </ListItem>
      </View>
    );
  }

  renderCapture() {
    if (this.props.info.small_crown > 0) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
              Small Crown
            </Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
              Silver Crown
            </Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
              Gold Crown
            </Text>
          </ListItem>
          <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
              {this.props.info.small_crown}
            </Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
              {this.props.info.silver_crown}
            </Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
              {this.props.info.gold_crown}
            </Text>
          </ListItem>
        </View>
      );
    }
    return null;
  }

  renderTools() {
    return (
      <View>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Shock Trap
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Pitfall Trap
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Ivy Trap
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Capture
          </Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            {`${effectiveness[this.props.tool[6].works]}`}
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            {`${effectiveness[this.props.tool[4].works]}`}
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            {`${effectiveness[this.props.tool[3].works]}`}
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            {`${this.props.info.capture_hp_percentage}%`}
          </Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Flash
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Dung
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Screamer
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Meat
          </Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            {`${effectiveness[this.props.tool[2].works]}`}
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            {`${effectiveness[this.props.tool[1].works]}`}
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            {`${effectiveness[this.props.tool[5].works]}`}
          </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            {`${effectiveness[this.props.tool[0].works]}`}
          </Text>
        </ListItem>
      </View>
    );
  }

  renderAilment() {
    if (this.props.ailment.length > 0) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, marginRight: 0, paddingLeft: 18, paddingRight: 18 }} itemDivider>
            <Left style={{ flex: 1.5 }}>
              <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                Aliment
              </Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                Resistance
              </Text>
            </Right>
            <Right style={{ flex: 1 }}>
              <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                Duration
              </Text>
            </Right>
          </ListItem>
        {this.props.ailment.map((item, key) =>
          <ListItem key={key} style={{ marginLeft: 0, marginRight: 0, paddingLeft: 18, paddingRight: 18 }}>
            <Left style={{ flex: 1.5 }}>
              <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                {`${ailment[item.element]}`}
              </Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                {`${effectiveness[item.resistance]}`}
              </Text>
            </Right>
            <Right style={{ flex: 1 }}>
              <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
                {`${effectiveness[item.duration]}`}
              </Text>
            </Right>
          </ListItem>)}
      </View>
      );
    }
    return null;
  }

  renderElement() {
    const {
      fire, water, thunder, ice, dragon,
    } = this.props.info;
    return (
      <View>
        <ListItem style={{ marginLeft: 0, marginRight: 0, borderBottomWidth: 0.0, borderColor: colors.accent }} itemDivider>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Fire']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Water']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Thunder']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Ice']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Dragon']}
            />
          </View>
        </ListItem>
        <ListItem style={{ marginLeft: 0, marginRight: 0, backgroundColor: 'white' }} itemDivider>
          <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'center' }}>{fire}</Text>
          <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'center' }}>{water}</Text>
          <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'center' }}>{thunder}</Text>
          <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'center' }}>{ice}</Text>
          <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'center' }}>{dragon}</Text>
        </ListItem>
      </View>
    );
  }

  renderStatus() {
    const {
      poison, sleep, paralysis, blast, stun,
    } = this.props.info;
    return (
      <View>
        <ListItem style={{ marginLeft: 0, marginRight: 0, borderBottomWidth: 0.0, borderColor: colors.accent }} itemDivider>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Poison']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Sleep']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Paralysis']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Blast']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Stun']}
            />
          </View>
        </ListItem>
        <ListItem style={{ marginLeft: 0, marginRight: 0, backgroundColor: 'white'}} itemDivider>
          <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'center' }}>{poison}</Text>
          <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'center' }}>{sleep}</Text>
          <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'center' }}>{paralysis}</Text>
          <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'center' }}>{blast}</Text>
          <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'center' }}>{stun}</Text>
        </ListItem>
      </View>
    );
  }

  renderInflictType(type) {
    if (type !== null) {
      return (
        <Image
          resizeMode="contain"
          style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
          source={ElementStatusImages[type]}
        />
      );
    }
    return null;
  }

  renderInflictsHeader() {
    if (this.props.inflicts[0].element === null) {
      return (
        <ListItem style={{ marginLeft: 0, marginRight: 0, paddingLeft: 18, paddingRight: 18 }} itemDivider>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
              Ailment Inflict
            </Text>
          </View>
        </ListItem>
      );
    } else if (this.props.inflicts[0].ailment1 === null) {
      return (
        <ListItem style={{ marginLeft: 0, marginRight: 0, paddingLeft: 18, paddingRight: 18 }} itemDivider>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
              Element Damage
            </Text>
          </View>
        </ListItem>
      );
    }
    return (
      <ListItem style={{ marginLeft: 0, marginRight: 0, paddingLeft: 18, paddingRight: 18 }} itemDivider>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Elemental Damage
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>
            Ailment Inflict
          </Text>
        </View>
      </ListItem>
    );
  }

  renderInflictsBody() {
    if (this.props.inflicts[0].element === null) {
      return (
        <ListItem style={{ marginLeft: 0, marginRight: 0, paddingLeft: 18, paddingRight: 18 }} >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {this.renderInflictType(this.props.inflicts[0].ailment1)}
            {this.renderInflictType(this.props.inflicts[0].ailment2)}
            {this.renderInflictType(this.props.inflicts[0].ailment3)}
          </View>
        </ListItem>
      );
    } else if (this.props.inflicts[0].ailment1 === null) {
      return (
        <ListItem style={{ marginLeft: 0, marginRight: 0, paddingLeft: 18, paddingRight: 18 }} >
          <View style={{ flex: 1 }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages[this.props.inflicts[0].element]}
            />
          </View>
        </ListItem>
      );
    }
    return (
      <ListItem style={{ marginLeft: 0, marginRight: 0, paddingLeft: 18, paddingRight: 18 }} >
        <View style={{ flex: 1 }}>
          <Image
            resizeMode="contain"
            style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
            source={ElementStatusImages[this.props.inflicts[0].element]}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {this.renderInflictType(this.props.inflicts[0].ailment1)}
          {this.renderInflictType(this.props.inflicts[0].ailment2)}
          {this.renderInflictType(this.props.inflicts[0].ailment3)}
        </View>
      </ListItem>
    );
  }

  renderInflicts() {
    if (this.props.inflicts[0].element !== null || this.props.inflicts[0].ailment1 !== null) {
      return (
        <View>
          {this.renderInflictsHeader()}
          {this.renderInflictsBody()}
        </View>
      );
    }
    return null;
  }

  renderInfo() {
    if (this.props.info.size === 'Large') {
      return (
        <ScrollView>
          {this.renderTypeSize()}
          {this.renderCapture()}
          {this.renderInflicts()}
          {this.renderElement()}
          {this.renderStatus()}
          {this.renderTools()}
          {this.renderAilment()}
        </ScrollView>
      );
    }
    return (
      <ScrollView>
        {this.renderTypeSize()}
      </ScrollView>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white',
        }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.renderInfo()}
      </View>
    );
  }
}
