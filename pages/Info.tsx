import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Settings
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Linking} from 'react-native';
import {
  requestPurchase,
  getProducts,
  finishTransaction,
} from 'react-native-iap';

export default function Info() {
  const productIds = {skus: ['donation4', 'donation5', 'donation6']};
  purchase = async (sku: string) => {
    try {
      await requestPurchase({
        sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: true,
      });
    } catch (err) {
      //  alert(err.message);
    }
  };
  async function BuyProductFromId(id: string) {
    getProducts(productIds)
      .then(success => {
        let product = success.find(a => a.productId == id);
        if (product !== undefined) {
          purchase(product.productId);
        } else {
          alert('Unknown Error');
        }
      })
      .then(ok => {})
      .catch(error => {
        //alert(error);
      })
      .catch(error => {
        //alert(error);
      });
  }

  return (
    <LinearGradient
      colors={['#172C47', '#006CB8']}
      useAngle={true}
      angle={4.5}
      style={styles.container}>
      <SafeAreaView>
        <ScrollView style={{width: '90%'}}>
          <Text style={styles.medtext}>Info</Text>
          <Text style={styles.bodyText}>
            Locomotive was made by Quinn Patwardhan. Check out his other work at{' '}
            <Text
              style={styles.linkText}
              onPress={() => {
                Linking.openURL(`https://quinnpatwardhan.com?${Settings.get("dev_id")}`);
              }}>
              quinnpatwardhan.com
            </Text>
          </Text>
          <Text style={styles.bodyText}>
            Locomotive is not affiliated with Amtrak or the National Railroad
            Passenger Corporation in any way.
          </Text>
          <Text style={styles.bodyText}>
            <Text
              style={styles.linkText}
              onPress={() => {
                Linking.openURL(`https://marcmap.app/privacy?${Settings.get("dev_id")}`);
              }}>
              Privacy Policy
            </Text>{' '}
            •
            <Text
              style={styles.linkText}
              onPress={() => {
                Linking.openURL('mailto:locomotivesupport@quinnpatwardhan.com');
              }}>
              {' '}
              Contact Support
            </Text>
          </Text>
          <Text style={{color: 'white', fontWeight: 700, fontSize: 24}}>
            Donate
          </Text>
          <Text style={{color: 'white', fontSize: 17}}>
            Developing and Running AmTrack takes a significant amount of time,
            effort, and money. To keep AmTrack Free for all, please consider
            donating below. Any amount is greatly appreciated
          </Text>
          <View
            style={{flexDirection: 'row', justifyContent: 'center', gap: 40}}>
            <Text
              style={{color: '#fdba74', fontSize: 27, fontWeight: 'bold'}}
              onPress={() => BuyProductFromId('donation4')}>
              $0.99
            </Text>
            <Text
              style={{color: '#fdba74', fontSize: 27, fontWeight: 'bold'}}
              onPress={() => BuyProductFromId('donation5')}>
              $1.99
            </Text>
            <Text
              style={{color: '#fdba74', fontSize: 27, fontWeight: 'bold'}}
              onPress={() => BuyProductFromId('donation6')}>
              $4.99
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bigtext: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
  medtext: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
  bodyText: {
    marginBottom: 20,
    color: 'white',
    fontSize: 18,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
