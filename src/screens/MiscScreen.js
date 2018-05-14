import React, { PureComponent } from 'react';
import { View, FlatList, Platform, Image, ActivityIndicator, Alert, AsyncStorage, Linking } from 'react-native';
import { Container, ListItem, Text, Left, Body } from 'native-base';
import firebase from 'react-native-firebase';
import { MiscImages } from '../assets';
import AdBanner from '../components/AdBanner';
import * as RNIap from 'react-native-iap';
import _ from 'lodash';

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
    'com.chingoo.mhw.removeads',
    // 'non_consumable_product',
  ],
  android: [
    'remove_ads',
    // 'android.test.purchased',
    // 'android.test.canceled',
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
          route: 'SetSelectScreen',
          title: 'Set Builder',
        },
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
          route: 'ToolScreen',
          title: 'Hunter Tools',
        },
        {
          route: 'AboutScreen',
          title: 'About',
        },
        {
          route: 'Rate',
          title: 'Rate Our App!',
        },
        {
          route: 'Remove',
          title: 'Remove Ads',
        },
        {
          route: 'Restore',
          title: 'Restore Purchase',
        },
      ],
      loading: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    // if (event.id === 'willAppear' && this.state.loading) {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  }

  // async componentDidMount(){
  //   try {
  //     await RNIap.prepare();
  //   }
  //   catch (err) {
  //     console.warn(err.code, err.message);
  //   }
  // }

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
            <Text style={{ fontSize: 12, color: colors.secondary }}>{'Restart application after purchase.'}</Text>
          </Body>
        </ListItem>
      );
    } else if (item.route === 'Restore') {
      return (
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.restore()}>
          <Left>
            <Image
              resizeMode="contain"
              style={{ width: 35, height: 35 }}
              source={MiscImages['Remove Ads']}
            />
          </Left>
          <Body style={{ flex: 6 }}>
            <Text style={{ fontSize: 20, color: colors.main }}>{item.title}</Text>
            <Text style={{ fontSize: 12, color: colors.secondary }}>{'Restart application after restore.'}</Text>
            {/* <Text style={{ fontSize: 12, color: colors.secondary }}>{''}</Text> */}
          </Body>
        </ListItem>
      );
    } else if (item.route === 'Rate') {
      return (
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.rate()}>
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

  rate() {
    const url = Platform.OS === 'ios' ? 'itms-apps://itunes.apple.com/us/app/mhworld-database-guide/id1358053843?mt=8' : 'market://details?id=com.chingoo.mhw';
    Linking.openURL(url);
  }

  getItems = async() => {
    try {
      await RNIap.prepare();
    } catch (err) {
      console.warn(err.code, err.message);
    }

    // let item = await AsyncStorage.getItem('@receipt');
    // console.log(item);
    try {
      const products = await RNIap.getProducts(itemSkus);
      console.log('Products', products);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  buyItem = async() => {
    try {
      await RNIap.prepare();
    } catch (err) {
      console.warn(err.code, err.message);
    }
    let sku = itemSkus[0];
    const test = await RNIap.getProducts(itemSkus);
    // let sku = 'android.test.purchased';
    try {
      console.info('buyItem: ' + sku);
      const purchase = await RNIap.buyProduct(sku);
      console.info(purchase);
      AsyncStorage.setItem('@receipt', purchase.transactionReceipt);
      // this.setState({ receipt: purchase.transactionReceipt }, () => this.goToNext());
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  }

  getAvailablePurchases = async() => {
    try {
      await RNIap.prepare();
    } catch (err) {
      console.warn(err.code, err.message);
    }

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

  restore = async () => {
    try {
      await RNIap.prepare();
    } catch (err) {
      console.warn(err.code, err.message);
    }
    try {
      AsyncStorage.removeItem('@receipt');
      const purchases = await RNIap.getAvailablePurchases();
      console.log(purchases);
      if (purchases.length < 1) Alert.alert('Restore Error', 'You do not own any in app purchases.');
      purchases.forEach((purchase) => {
        if (purchase.productId === itemSkus[0]) {
          console.log(purchase);
          AsyncStorage.setItem('@receipt', purchase.transactionReceipt);
          Alert.alert('Restore Successful', 'Restart Application to fully remove ads');
        }
      })
    } catch(err) {
      console.warn(err);
      Alert.alert(err.message);
    }
  }

  renderTester() {
    return (
      <View>
        <ListItem onPress={() => this.restore()}>
          <Text>Restore</Text>
        </ListItem>
        <ListItem onPress={() => this.getItems()}>
          <Text>List</Text>
        </ListItem>
        <ListItem onPress={() => this.buyItem('android.test.purchased')}>
        {/* <ListItem onPress={() => this.buyItem('com.chingoo.mhw.removeads')}> */}
          <Text>Buy</Text>
        </ListItem>
        <ListItem onPress={() => this.getAvailablePurchases()}>
          <Text>Check</Text>
        </ListItem>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: colors.background }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          initialNumToRender={15}
          style={{ backgroundColor: colors.background }}
          data={this.state.screens}
          keyExtractor={item => item.route}
          renderItem={this.renderListItems}
        />
        {/* {this.renderTester()} */}
       <AdBanner />
     </View>
    );
  }
}
