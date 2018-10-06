import React, { PureComponent } from 'react';
import { View, Linking, Platform, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, ListItem, Left, Right, Body } from 'native-base';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';

// Styles
import colors from '../styles/colors';

class PrivacyPolicyScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      // console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  setNavSettings() {
    this.props.navigator.setStyle({
      navBarButtonColor: this.props.theme.main,
      navBarTextColor: this.props.theme.main,
      navBarBackgroundColor: this.props.theme.background,
      statusBarTextColorScheme: this.props.theme.statusbar,
      statusBarColor: this.props.theme.background,
      tabBarBackgroundColor: this.props.theme.background,
      screenBackgroundColor: this.props.theme.background,
    });
  }

  render() {
    this.setNavSettings();
    return (
      <ScrollView>
        <View style={{ flex: 1, padding: 15 }}>
        <Text style={[styles.title, { color: this.props.theme.main }]}>Privacy Policy</Text>
        <Text style={[styles.description, { color: this.props.theme.main }]}>{`built the MHW DB app as an Ad Supported app. This SERVICE is provided by at no cost and is intended for use as is. \n\nThis page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service. \n\nIf you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. \n\nI will not use or share your information with anyone except as described in this Privacy Policy. \n\nThe terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at MHW DB unless otherwise defined in this Privacy Policy.\n\n`}
        </Text>

        <Text style={[styles.secondaryTitle, { color: this.props.theme.main }]}>Information Collection and Use</Text>
        <Text style={[styles.description, { color: this.props.theme.main }]}>{`For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information, including but not limited to Advertising ID. The information that I request will be retained on your device and is not collected by me in any way.

The app does use third party services that may collect information used to identify you.

Link to privacy policy of third party service providers used by the app: \n`}
        </Text>

        <TouchableOpacity onPress={() => this.props.navigator.push({
          screen: 'WebViewScreen',
          passProps: {
            link: 'https://support.google.com/admob/answer/6128543?hl=en',
          },
          animationType: 'slide-horizontal',
          title: 'Admob Policies',
        })}>
          <Text style={[styles.description, { color: 'blue' }]}>
            AdMob
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigator.push({
          screen: 'WebViewScreen',
          passProps: {
            link: 'https://firebase.google.com/policies/analytics/',
          },
          animationType: 'slide-horizontal',
          title: 'Firebase Use Policies',
        })}>
          <Text style={[styles.description, { color: 'blue' }]}>
            Firebase Analytics
          </Text>
        </TouchableOpacity>

        <Text style={[styles.secondaryTitle, { color: this.props.theme.main }]}>{`Log Data`}</Text>
        <Text style={[styles.description, { color: this.props.theme.main }]}>{`I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.: \n\n`}
        </Text>

        <Text style={[styles.secondaryTitle, { color: this.props.theme.main }]}>Cookies</Text>
        <Text style={[styles.description, { color: this.props.theme.main }]}>{`Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.

This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service. \n\n`}
        </Text>

        <Text style={[styles.secondaryTitle, { color: this.props.theme.main }]}>Service Providers</Text>
        <Text style={[styles.description, { color: this.props.theme.main }]}>{`I may employ third-party companies and individuals due to the following reasons:

To facilitate our Service;
To provide the Service on our behalf;
To perform Service-related services; or
To assist us in analyzing how our Service is used.
I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose. \n\n`}
        </Text>

        <Text style={[styles.secondaryTitle, { color: this.props.theme.main }]}>Security</Text>
        <Text style={[styles.description, { color: this.props.theme.main }]}>{`I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security. \n\n`}
        </Text>

        <Text style={[styles.secondaryTitle, { color: this.props.theme.main }]}>Links to Other Sites</Text>
        <Text style={[styles.description, { color: this.props.theme.main }]}>{`This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. \n\n`}
        </Text>

        <Text style={[styles.secondaryTitle, { color: this.props.theme.main }]}>Children’s Privacy</Text>
        <Text style={[styles.description, { color: this.props.theme.main }]}>{`These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions. \n\n`}
        </Text>

        <Text style={[styles.secondaryTitle, { color: this.props.theme.main }]}>Changes to This Privacy Policy</Text>
        <Text style={[styles.description, { color: this.props.theme.main }]}>{`I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page. \n\n`}
        </Text>

        <Text style={[styles.secondaryTitle, { color: this.props.theme.main }]}>Contact Us</Text>
        <Text style={[styles.description, { color: this.props.theme.main }]}>{`If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me.

This privacy policy page was created at privacypolicytemplate.net and modified/generated by App Privacy Policy Generator \n`}
        </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20.5,
    fontWeight: 'bold',
  },
  secondaryTitle: {
    fontSize: 18.5,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15.5,
  },
  link: {
    fontSize: 15.5,
  },
});

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps, {})(PrivacyPolicyScreen);
