import {Text, View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import TrainPopup from '../components/TrainPopup';
import Geojson from 'react-native-typescript-geojson';
//const AmtrakLinesGEOJSON = require('../assets/amtrak-track.json');
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

export default function Map() {
  const navigation = useNavigation();

  const map = useRef();
  const [position, setPosition] = useState({
    latitude: 38.9072,
    longitude: -77.0369,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [trainData, setTrainData]: any = useState({});
  useEffect(() => {
    fetch('https://amtrak-api.marcmap.app/get-trains')
      .then(r => r.json())
      .then(r2 => setTrainData(r2));
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://amtrak-api.marcmap.app/get-trains')
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
      </MapView>
    </>
  );
}

//<Geojson geojson={AmtrakLinesGEOJSON} />
