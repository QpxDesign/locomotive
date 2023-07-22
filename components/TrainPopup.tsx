import {Text, TouchableOpacity, View} from 'react-native';
import React, {Component, useState} from 'react';
import {formatTime} from '../utils/FormatDate';
import {useNavigation} from '@react-navigation/native';

export default function TrainPopup(props: any) {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, padding: 5, paddingTop: 0, overflow: 'scroll'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 19, fontWeight: '600', paddingRight: 10}}>
          {props.trainMetadata.routeName} #{props.trainMetadata.trainNum}{' '}
        </Text>
        <Text style={{fontSize: 18}}>
          {' '}
          {Math.round(props.trainMetadata.velocity)}mph
        </Text>
      </View>
      <Text style={{fontSize: 16, fontWeight: '400'}}>
        Left {props.trainMetadata.stations.at(0).code} @{' '}
        {formatTime(props.trainMetadata.stations.at(0).dep)}
      </Text>
      <Text style={{fontSize: 16, fontWeight: '400'}}>
        Arriving in {props.trainMetadata.stations.at(-1).code} @{' '}
        {formatTime(props.trainMetadata.stations.at(-1).schArr)}
      </Text>
      <Text style={{fontSize: 16, fontWeight: '400'}}>
        {props.trainMetadata.trainTimely}
      </Text>
      <Text> </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            textDecorationLine: 'underline',
          }}>
          Last Updated:{' '}
          {new Date(
            Date.parse(props.trainMetadata?.updatedAt),
          ).toLocaleTimeString()}
        </Text>

        <TouchableOpacity
          style={{zIndex: 9999}}
          onPress={() => {
            navigation.navigate('Stops', {trainStuff: props.trainMetadata});
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              textDecorationLine: 'underline',
              marginLeft: 50,
            }}>
            See Stops
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
