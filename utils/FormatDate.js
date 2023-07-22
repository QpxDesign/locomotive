export function formatTime(s) {
  // var timestamp = Date.parse(s) / 1000;
  const dtFormat = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeZone: 'America/New_York',
  });
  /* s = Date.parse(s) / 1000;


  d.replace('PM', '\n PM');
  d.replace('AM', '\n AM');
    var d = dtFormat.format(new Date((Date.parse(s) / 1000) * 1e3));

  return d + 'a'; */
  // return dtFormat.format(timestamp);
  var da = new Date(Date.parse(s));
  var time = da.toLocaleTimeString();
  var ans =
    time.split(':')[0] +
    ':' +
    time.split(':')[1] +
    ' ' +
    time.split(' ')[1] +
    ' ' +
    da.toLocaleDateString();
  if (ans.length > 20) {
    return 'n/a';
  } else {
    return ans;
  }
}
