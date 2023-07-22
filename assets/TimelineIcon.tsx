import * as React from 'react';
import {SvgUri} from 'react-native-svg';

const SvgExternal = (props: any) => (
  <SvgUri
    width={50}
    height={100}
    fill="white"
    stroke="black"
    strokeWidth={24}
    uri="https://marcmap.app/assets/TimelineIcon.svg"
    {...props}
  />
);
export default SvgExternal;
