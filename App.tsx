/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import FooterNav from './components/FooterNav';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NearbyStations from './pages/NearbyStations';
import Map from './pages/Map';
import Stops from './pages/Stops';
import Station from './pages/Station';
import Info from './pages/Info';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={NearbyStations}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Station" component={Station} />

        <Stack.Screen name="Stops" component={Stops} />
        <Stack.Screen
          name="Info"
          component={Info}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <FooterNav />
    </NavigationContainer>
  );
}

export default App;
