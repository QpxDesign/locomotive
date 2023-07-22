import {Text, View, ScrollView, Platform} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TimelineIcon from '../assets/TimelineIcon';
import {formatTime} from '../utils/FormatDate';

export default function Stops({route, navigation}) {
  var {trainStuff} = route.params;
  const [trainStuffState, setTrainStuffState]: any = useState(trainStuff);
  const viewRef = useRef();
  function countDepartedStations() {
    var count = 0;
    trainStuffState.stations.forEach((item: any) => {
      if (item.status === 'Departed') {
        count += 1;
      }
    });
    return count;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://amtrak-api.marcmap.app/get-trains')
        .then(r => r.json())
        .then(r2 => {
          if (
            r2.data.find((i: any) => i.trainID === trainStuffState.trainID) !==
            undefined
          ) {
            setTrainStuffState(
              r2.data.find((i: any) => i.trainID === trainStuffState.trainID),
            );
          }
        });
    }, 20_000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    viewRef?.current?.scrollTo({
      y: 100 * countDepartedStations(),
      animated: true,
    });
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'flex-start'}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          padding: 10,
          paddingBottom: 0,
        }}>
        {trainStuffState.routeName} #{trainStuffState.trainNum}
      </Text>
      <Text style={{fontSize: 18, padding: 10}}>
        Last Updated: {formatTime(trainStuffState.updatedAt).split('M ')[0]}M
      </Text>
      <ScrollView
        ref={viewRef}
        onLayout={() => {
          viewRef?.current?.scrollTo({
            y: 100 * countDepartedStations(),
            animated: true,
          });
        }}>
        {trainStuffState.stations.map((station: any, index: any) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 0,
                  maxHeight: 100,
                  maxWidth: '80%',
                  opacity: station.status === 'Departed' ? 0.3 : 1,
                }}>
                <TimelineIcon />
                <View>
                  <Text style={{fontSize: 20, maxWidth: '90%'}}>
                    {station.name} ({station.code})
                  </Text>
                  <Text style={{fontSize: 16}}>
                    {station.status} • {station.arrCmnt.replaceAll('NaN', '0')}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  marginRight: 15,
                  fontFamily:
                    Platform.OS === 'android' ? 'monospace' : 'Courier',
                }}>
                {formatTime(station.arr).split(' ')[0]}
                {''}
                {formatTime(station.arr).split(' ')[1]}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
