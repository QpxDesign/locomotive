import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
const stationdata = require('../assets/stationdata.json');

export default function StationPopup(props: any) {
  const navigation = useNavigation();

  useEffect(() => {}, []);
  return (
    <View style={{flex: 1, padding: 5, paddingTop: 0, overflow: 'scroll'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, fontWeight: '600', paddingRight: 10}}>
          {props.stationMetadata.code}
        </Text>

        <Text style={{fontSize: 18}}>{props.weather + '° F'}</Text>
      </View>
      <View>
        <Text style={{fontSize: 18}}>
          {props.stationMetadata.city}, {props.stationMetadata.state}
        </Text>
        <TouchableOpacity
          style={{zIndex: 9999, justifyContent: 'center'}}
          onPress={() => {
            navigation.navigate('Station', {
              stationData: stationdata.find(
                x => x.code === props.stationMetadata.code,
              ),
            });
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              textDecorationLine: 'underline',
            }}>
            Arrivals
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
