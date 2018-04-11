import React, { PureComponent } from 'react';
import { Platform, View, InteractionManager } from 'react-native';
import firebase from 'react-native-firebase';
import * as RNIap from 'react-native-iap';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('games');
request.addKeyword('monster hunter');
request.addKeyword('video games');

export default class AdBanner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      unitId: Platform.OS === 'ios' ? 'ca-app-pub-9661316023859369/8743467790' : 'ca-app-pub-9661316023859369/7600878725',
      purchases: [],
    };
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loading: false
      });
    });
    // console.log(this.state);
  }

  async componentDidMount() {
    try {
      await RNIap.prepare();
    }
    catch (err) {
      console.warn(err.code, err.message);
    }
    try {
      console.info('Get available purchases (non-consumable or unconsumed consumable)');
      const purchases = await RNIap.getAvailablePurchases();
      console.info('Available purchases :: ', purchases);
      this.setState({
        // availableItemsMessage: `Got ${purchases.length} items.`,
        // receipt: purchases[0].transactionReceipt
        purchases
      });
    } catch(err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  }

  render() {
    if (this.state.loading || this.state.purchases.length > 0) {
      return null;
    }
    return (
      <Banner
        style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: 'white' }}
        // unitId={'ca-app-pub-3940256099942544/6300978111'}
        // unitId={'ca-app-pub-9661316023859369/8743467790'}
        unitId={this.state.unitId}
        size={'SMART_BANNER'}
        request={request.build()}
         // onAdFailedToLoad={error => console.log(error)}
         // onAdLoaded={() => {
         //   // this.setState({ hide: false, flex: 1 })
         //   console.log('Advert loaded');
         // }}
       />
    );
  }
}
