import moment from 'moment';

export function formatTime(s: any) {
  moment.locale();
  const ans = moment(s).format('h:mm a');
  return ans;
}
export function formatDate(s: any) {
  moment.locale();
  const ans = moment(s).format('MM/DD/YY');
  return ans;
}
