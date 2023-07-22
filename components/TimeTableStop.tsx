import {Text, View} from 'react-native';
import React, {Component} from 'react';
import TimelineIcon from '../assets/TimelineIcon';

export default function TimeTableStop(props: any) {
  return (
    <View
      ref={
        props.index !== 0 &&
        props.station.status === 'Enroute' &&
        props.rainStuff.stations[props.index - 1].status === 'Departed'
          ? viewRef
          : null
      }
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0,
        maxHeight: 100,
        opacity: props.station.status === 'Departed' ? 0.3 : 1,
      }}
      key={props.index}>
      <TimelineIcon />
      <Text style={{fontSize: 20}}>
        {station.name} ({station.code})
      </Text>
    </View>
  );
}
