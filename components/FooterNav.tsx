import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';

export default function FooterNav() {
  const navigation = useNavigation();

  const [activeChoice, setActiveChoice] = useState(0);
  function getColor(index: Number): string {
    if (index === activeChoice) {
      return 'rgba(17, 24, 39,0.4)';
    } else {
      return 'transparent';
    }
  }
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          marginTop: 'auto',
          backgroundColor: '#334155',
          flexDirection: 'row',
          justifyContent: 'space-between',
          display:
            isKeyboardVisible && Platform.OS === 'android' ? 'none' : 'flex',
        }}>
        <TouchableOpacity
          onPress={() => {
            setActiveChoice(0);
            navigation.navigate('Home');
          }}
          style={[
            styles.navitem,
            {
              backgroundColor: getColor(0),
            },
          ]}>
          <Icon name="list" size={30} color="white" />
          <Text style={styles.title}>Nearby Stations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveChoice(1);
            navigation.navigate('Map');
          }}
          style={[
            styles.navitem,
            {
              backgroundColor: getColor(1),
            },
          ]}>
          <Icon name="map" size={30} color="white" />
          <Text style={styles.title}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveChoice(2);
            navigation.navigate('Info');
          }}
          style={[
            styles.navitem,
            {
              backgroundColor: getColor(2),
            },
          ]}>
          <Icon name="info-with-circle" size={30} color="white" />
          <Text style={styles.title}>Info</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  navitem: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    color: 'white',
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    paddingTop: 5,
    fontSize: 15,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
});
