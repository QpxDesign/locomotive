import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Settings,
  Alert
} from 'react-native';
import React, {Component, useEffect, useState, useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FooterNav from '../components/FooterNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import getDistanceFromLatLonInKm from '../utils/getDistanceFromLatLonInKm';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import InAppReview from 'react-native-in-app-review';
import StationsLocal from "../assets/stationdata.json"
import uuid from 'react-native-uuid';
import { getPurchaseHistory } from "react-native-iap"

export default function NearbyStations() {
  const [userLat, setUserLat]: any = useState(0); //77.0365
  const [userLon, setUserLon]: any = useState(0); //77.0365

  const [stations, setStations]: any = useState();
  const navigation = useNavigation();

  const [search, setSearch]: any = useState('');
  async function userHasDonated(): Promise<Boolean> {
    return new Promise((resolve) => {
    getPurchaseHistory([
       'donation4',
       'donation5',
       'donation6'
     ]).then((a) => {
       if (a.length === 0) {
         return resolve(false);
       } else {
         return resolve(true)
       }
       }).catch((e) =>
       {
         return resolve(false)
         }
       )
    })
  }
  useEffect(() => {
    var prevValue = Settings.get('times_opened');
    if (Settings.get('dev_id') === undefined || Settings.get('dev_id') === null) {
      Settings.set({"dev_id":uuid.v4()})
    }
    if (prevValue === undefined || prevValue === null) {
      prevValue = 0;
    }
    Settings.set({times_opened: prevValue + 1});
    console.log(prevValue);
    if (prevValue === 5 && InAppReview.isAvailable()) {
      InAppReview.RequestInAppReview();
    }

    if (prevValue % 10 === 0) {
      userHasDonated().then((r) => {
        if (r === false) {
        Alert.alert(
        "Please Consider Donating",
        "Love AmTrack & Want to keep it free and ad-less for all? Please Donate! Any bit helps.",
        [
        {text:"No Thanks."},
        {text: "Donate", onPress: () => {navigation.navigate('Info')}}
        ])
        }
        })

    }

    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setUserLat(crd.latitude);
      setUserLon(crd.longitude);
    }),
      [];
    fetch(`https://amtrak-api.marcmap.app/get-stations?${Settings.get("dev_id")}`)
      .then(r => r.json())
      .then(r =>
        setStations(
          StationsLocal.sort(function (a: any, b: any) {
            return (
              getDistanceFromLatLonInKm(a.lat, a.lon, userLat, userLon) -
              getDistanceFromLatLonInKm(b.lat, b.lon, userLat, userLon)
            );
          }),
        ),
      );
  }, []);
  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;

      fetch(`https://amtrak-api.marcmap.app/get-stations?${Settings.get("dev_id")}`)
        .then(r => r.json())
        .then(r =>
          setStations(
            StationsLocal.sort(function (a: any, b: any) {
              return (
                getDistanceFromLatLonInKm(
                  a.lat,
                  a.lon,
                  pos.coords.latitude,
                  pos.coords.longitude,
                ) -
                getDistanceFromLatLonInKm(
                  b.lat,
                  b.lon,
                  pos.coords.latitude,
                  pos.coords.longitude,
                )
              );
            }),
          ),
        );
      setUserLat(crd.latitude);
      setUserLon(crd.longitude);
    }),
      [];
  }, [userLat, userLon]);

  return (
    <LinearGradient
      colors={['#172C47', '#006CB8']}
      useAngle={true}
      angle={4.5}
      style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'space-between',
              alignContent: 'center',
              paddingBottom: 10,
            }}>
            <Text style={styles.medtext}>Stations</Text>
          </View>
          <View
            style={{
              display: 'flex',
              position: 'relative',
            }}>
            <TextInput
              value={search}
              onChangeText={s => {
                setSearch(s);
              }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.3)',
                fontSize: 20,
                height: 50,
                marginBottom: 10,
                paddingHorizontal: 10,
                color: 'white',
              }}></TextInput>
            <Icon
              name="search"
              size={35}
              color="white"
              style={{
                position: 'absolute',
                right: 10,
                top: 7.5,
              }}
            />
          </View>
          {stations !== undefined ? (
            stations.map((station: any, index: any) => {
              var a = (station.name + ' ' + station.code).toLowerCase();
              if (a.includes(search?.toLowerCase())) {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('Station', {
                        stationData: station,
                      });
                    }}>
                    <View
                      style={{
                        marginBottom: 2,
                        paddingHorizontal: 15,
                        paddingVertical: 20,
                        flexDirection: 'row',
                        backgroundColor: 'rgba(255,255,255,0.3)',
                      }}>
                      <View>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 22,
                            fontWeight: 600,
                            maxWidth: '95%',
                          }}>
                          {station.name} ({station.code})
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 600,
                          }}>
                          {station.city}, {station.state}
                        </Text>
                      </View>
                      <Icon
                        name="arrow-forward-circle"
                        size={40}
                        color="white"
                        style={{marginLeft: 'auto'}}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }
            })
          ) : (
            <Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
              Loading...
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginHorizontal: 20,
  },
});
