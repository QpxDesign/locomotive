import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {formatTime} from '../utils/FormatDate';
import {useNavigation} from '@react-navigation/native';

export default function Station({route, navigation}) {
  const navigation2 = useNavigation();

  const {stationData} = route.params;
  const [position, setPosition] = useState({
    latitude: stationData?.lat ?? 0,
    longitude: stationData?.lon ?? 0,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004,
  });
  const [trainData, setTrainData]: any = useState([]);
  useEffect(() => {
    fetch('https://amtrak-api.marcmap.app/get-trains')
      .then(r => r.json())
      .then(r2 =>
        setTrainData(
          r2.data.filter((i: any) =>
            i.stations.find(
              (i2: any) =>
                i2.code === stationData.code && i2.status === 'Enroute',
            ),
          ),
        ),
      );
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://amtrak-api.marcmap.app/get-trains')
        .then(r => r.json())
        .then(r2 => setTrainData(r2.data));
    }, 20_000);

    return () => clearInterval(interval);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'flex-start'}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          padding: 10,
          paddingBottom: 5,
        }}>
        {stationData.name} ({stationData.code})
      </Text>
      <Text
        style={{
          fontSize: 19,
          fontWeight: '600',
          paddingLeft: 10,
          fontWeight: '400',
        }}>
        {stationData.city}, {stationData.state}
      </Text>
      <View style={{flex: 1, alignItems: 'center'}}>
        <MapView
          style={{width: '90%', height: 200, borderRadius: 20, marginTop: 10}}
          initialRegion={position}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}></MapView>

        <Text
          style={{
            width: '90%',
            fontSize: 22,
            marginTop: 10,
            fontWeight: '600',
          }}>
          Upcoming Arrivals
        </Text>
        <ScrollView>
          {trainData !== undefined ? (
            trainData.sort().map((item: any, index: any) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation2.navigate('Stops', {trainStuff: item});
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: index % 2 === 0 ? '#d4d4d8' : '#e5e7eb',
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 10,
                      marginBottom: 5,
                    }}>
                    <Text style={{fontSize: 20}}>
                      {item.routeName} #{item.trainNum} •{' '}
                      {formatTime(
                        item.stations.find(
                          (i: any) => i.code === stationData.code,
                        )?.schArr,
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
              Loading...
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
