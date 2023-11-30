export interface GetStationsResponse {
  status: string;
  data: Array<Station>;
}
interface Station {
  name: string;
  code: string;
  tz: string;
  lat: Number;
  lon: Number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  trains: Array<string>;
}
