import React, { PureComponent } from 'react';
import { Platform, View } from 'react-native';
import firebase from 'react-native-firebase';
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
      unitId: Platform.OS === 'ios' ? 'ca-app-pub-9661316023859369/8743467790' : 'ca-app-pub-9661316023859369/7600878725',
    };
    // console.log(this.state);
  }

  render() {
    return (
      <Banner
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
