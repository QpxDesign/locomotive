import {Text, View, StyleSheet, Platform, TouchableOpacity, Settings} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import TrainPopup from '../components/TrainPopup';
import Geojson from 'react-native-typescript-geojson';
const AmtrakLinesGEOJSON = require('../assets/amtrak-track');
const AmtrakStopsGEOJSON = require('../assets/amtrak-stations');
const AmtrakStopsAPI = require('../assets/amtrak-stations-api');

import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import StationPopup from '../components/StationPopup';
import {GetTrainsResponse} from '../structs/GetTrainsResponse';

export default function Map() {
  function celsiusToFahrenheit(celsius: any) {
    return Math.round((celsius * 9) / 5 + 32);
  }
  function getCurrentWeather(lat: any, long: any) {
    console.log('fetched weather data');
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`,
    )
      .then(r => r.json())
      .then(r2 => {
        console.log('fetched weather data');
        if (r2 !== undefined && r2.current_weather !== undefined) {
          setLatestWeatherData(
            celsiusToFahrenheit(r2.current_weather.temperature),
          );
        }
      });
  }
  const navigation = useNavigation();

  const map = useRef();
  const [latestWeatherData, setLatestWeatherData]: any = useState('--');
  const [position, setPosition] = useState({
    latitude: 38.9072,
    longitude: -77.0369,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [trainData, setTrainData] = useState<GetTrainsResponse | undefined>(
    undefined,
  );
  useEffect(() => {
    fetch(`https://amtrak-api.marcmap.app/get-trains?${Settings.get("dev_id")}`)
      .then(r => r.json())
      .then(r2 => setTrainData(r2));
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`https://amtrak-api.marcmap.app/get-trains?${Settings.get("dev_id")}`)
        .then(r => r.json())
        .then(r2 => setTrainData(r2));
    }, 20_000);

    return () => clearInterval(interval);
  }, []);
  function getUserLocation() {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      var region = {
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
      map?.current?.animateToRegion(region, 500);
    });
  }
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <>
      {Platform.OS === 'ios' ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            margin: 10,
            borderRadius: 15,
            zIndex: 9999,
            backgroundColor: 'black',
            flex: 1,
          }}
          onPress={() => {
            getUserLocation();
          }}>
          <Icon
            name="location-arrow"
            size={30}
            color="white"
            style={{
              left: 0,
              padding: 15,
            }}
          />
        </TouchableOpacity>
      ) : (
        ''
      )}

      <MapView
        ref={map}
        style={{flex: 1}}
        initialRegion={position}
        showsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}>
        {AmtrakStopsAPI.map((stop: any, index: any) => {
          return (
            <Marker
              onPress={() => {
                console.log('getting weatherdata');
                getCurrentWeather(stop.lat, stop.lon);
              }}
              tappable={true}
              key={index}
              coordinate={{
                latitude: stop.lat,
                longitude: stop.lon,
              }}
              title={stop.name}
              image={{uri: 'MapPinIcon'}}>
              <Callout>
                <StationPopup
                  stationMetadata={stop}
                  weather={latestWeatherData}></StationPopup>
              </Callout>
            </Marker>
          );
        })}
        {trainData !== undefined && trainData.data !== undefined
          ? trainData.data.map((train: any, index: any) => {
              return Platform.OS === 'ios' ? (
                <Marker
                  tappable={true}
                  key={index}
                  coordinate={{latitude: train.lat, longitude: train.lon}}
                  title={train.routeName}
                  image={{uri: 'customtrainicon'}}>
                  <Callout>
                    <TrainPopup trainMetadata={train}></TrainPopup>
                  </Callout>
                </Marker>
              ) : (
                <Marker
                  tappable={true}
                  key={index}
                  coordinate={{latitude: train.lat, longitude: train.lon}}
                  title={train.routeName}
                  image={{uri: 'customtrainicon'}}>
                  <Callout
                    onPress={() => {
                      navigation.navigate('Stops', {
                        trainStuff: train,
                      });
                    }}>
                    <TrainPopup trainMetadata={train}></TrainPopup>
                  </Callout>
                </Marker>
              );
            })
          : ''}

        <Geojson
          geojson={AmtrakLinesGEOJSON}
          strokeColor="black"
          strokeWidth={3}
        />
      </MapView>
    </>
  );
}
