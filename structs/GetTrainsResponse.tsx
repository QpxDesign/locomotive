export interface GetTrainsResponse {
  status: string;
  data: Array<Train>;
}
interface Train {
  routeName: string;
  trainNum: Number;
  trainID: string;
  lat: Number;
  lon: Number;
  trainTimely: string;
  stations: Array<TrainStation>;
}
interface TrainStation {
  name: string;
  code: string;
  tz: string;
  bus: boolean;
  schArr: string;
  schDep: string;
  arr: string;
  dep: string;
  arrCmnt: string;
  depCmnt: string;
  status: string;
}
