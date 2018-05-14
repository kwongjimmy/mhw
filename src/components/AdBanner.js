import React, { PureComponent } from 'react';
import { Platform, View, InteractionManager, AsyncStorage, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import * as RNIap from 'react-native-iap';

// Styles
import colors from '../styles/colors';

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
      remove: true,
      receipt: null,
    };
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      try {
        await RNIap.prepare();
      } catch (err) {
        console.warn(err.code, err.message);
      }
      try {
        let remove = false;
        AsyncStorage.removeItem('@receipt');
        const purchases = await RNIap.getAvailablePurchases();
        // const purchases = [{ productId: 'remove_ads' }]; // TEST
        purchases.forEach((purchase) => {
          if (purchase.productId === 'remove_ads') {
            remove = true;
            AsyncStorage.setItem('@receipt', purchase.transactionReceipt);
          }
        });
        this.setState({
          loading: false,
          remove,
        });
      } catch (err) {
        this.setState({
          loading: false,
          remove: false,
        });
        console.warn(err.code, err.message);
        Alert.alert(err.message);
      }
    } else {
      try {
        const value = await AsyncStorage.getItem('@receipt');
        // console.log(value);
        if (value !== null) {
          // We have data!!
          this.setState({
            loading: false, remove: true,
          });
        } else {
          this.setState({
            loading: false, remove: false,
          });
        }
      } catch (error) {
        console.log(error);
        this.setState({
          loading: false, remove: false,
        });
      }
    }
  }

  render() {
    if (this.state.loading || this.state.remove) {
      return null;
    }
    return (
      <Banner
        style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: colors.background }}
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
