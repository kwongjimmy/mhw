import React, { PureComponent } from 'react';
import { View, FlatList, Platform, Image, ActivityIndicator } from 'react-native';
import { Container, ListItem, Text, Left, Body } from 'native-base';
import firebase from 'react-native-firebase';
import { MiscImages } from '../assets';
import AdBanner from '../components/AdBanner';
import * as RNIap from 'react-native-iap';

// Styles
import colors from '../styles/colors';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('games');
request.addKeyword('monster hunter');
request.addKeyword('video games');

const itemSkus = Platform.select({
  ios: [
    // 'prod.consume.santi.099', 'prod.consume.santi.199', 'prod.nonconsume.santi.only',
    // 'scrip.auto.santi', 'scrip.non.auto.santi', // com.kretone.santiago
    // 'com.cooni.point1000', 'com.cooni.point5000', 'non.consumable.product', // dooboolab
    'com.chingoo.mhw.removeads', 'remove_ads'
  ],
  android: [
    'android.test.purchased',
    'remove_ads',
    'android.test.canceled',
  ],
});

export default class MiscScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      screens: [
        {
          route: 'ItemScreen',
          title: 'Items',
        },
        {
          route: 'CombinationScreen',
          title: 'Combination List'
        },
        {
          route: 'QuestScreen',
          title: 'Quests',
        },
        {
          route: 'CharmScreen',
          title: 'Charms',
        },
        {
          route: 'DecorationScreen',
          title: 'Decorations',
        },
        {
          route: 'SkillScreen',
          title: 'Skills',
        },
        {
          route: 'MapScreen',
          title: 'Maps',
        },
        {
          route: 'AboutScreen',
          title: 'About',
        },
        {
          route: 'Remove',
          title: 'Remove Ads',
        }
      ],
      loading: true,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'willAppear' && this.state.loading) {
      this.setState({
        loading: false,
      });
    }
  }

  async componentDidMount(){
    try {
      await RNIap.prepare();
    }
    catch (err) {
      console.warn(err.code, err.message);
    }
  }

  renderListItems = ({ item }) => {
    if (item.route === 'Remove') {
      return (
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.buyItem()}>
          <Left>
            <Image
              resizeMode="contain"
              style={{ width: 35, height: 35 }}
              source={MiscImages[item.title]}
            />
          </Left>
          <Body style={{ flex: 6 }}>
            <Text style={{ fontSize: 20, color: colors.main }}>{item.title}</Text>
          </Body>
        </ListItem>
      );
    }
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => this.props.navigator.push({
        screen: item.route,
        passProps: {

        },
        animationType: 'slide-horizontal',
        title: item.title,
        })}>
        <Left>
          <Image
            resizeMode="contain"
            style={{ width: 35, height: 35 }}
            source={MiscImages[item.title]}
          />
        </Left>
        <Body style={{ flex: 6 }}>
          <Text style={{ fontSize: 20, color: colors.main }}>{item.title}</Text>
        </Body>
      </ListItem>
    );
  }

  getItems = async() => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      console.log('Products', products);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  buyItem = async(sku) => {
    try {
      console.info('buyItem: ' + sku);
      const purchase = await RNIap.buyProduct(sku);
      console.info(purchase);
      // this.setState({ receipt: purchase.transactionReceipt }, () => this.goToNext());
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  }

  getAvailablePurchases = async() => {
    try {
      console.info('Get available purchases (non-consumable or unconsumed consumable)');
      const purchases = await RNIap.getAvailablePurchases();
      console.info('Available purchases :: ', purchases);
      // this.setState({
      //   availableItemsMessage: `Got ${purchases.length} items.`,
      //   receipt: purchases[0].transactionReceipt
      // });
    } catch(err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          style={{ backgroundColor: 'white' }}
          data={this.state.screens}
          keyExtractor={item => item.route}
          renderItem={this.renderListItems}
        />
        <ListItem onPress={() => this.getItems()}>
          <Text>List</Text>
        </ListItem>
        {/* <ListItem onPress={() => this.buyItem('android.test.purchased')}> */}
        <ListItem onPress={() => this.buyItem('remove_ads')}>
          <Text>Buy</Text>
        </ListItem>
        <ListItem onPress={() => this.getAvailablePurchases()}>
          <Text>Check</Text>
        </ListItem>
       <AdBanner />
     </View>
    );
  }
}
