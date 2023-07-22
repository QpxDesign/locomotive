import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Linking} from 'react-native';
export default function Info() {
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
                Linking.openURL('https://quinnpatwardhan.com');
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
                Linking.openURL('https://marcmap.app/privacy');
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
