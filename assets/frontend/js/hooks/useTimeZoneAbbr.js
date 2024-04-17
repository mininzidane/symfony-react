const timeZoneAbbrMap = {
  'Pacific Daylight Time': 'PDT',
  'Pacific Standard Time': 'PST',
  'Alaska Standard Time': 'AKST',
  'Alaska Daylight Time': 'AKDT',
  'Mountain Standard Time': 'MST',
  'Central Standard Time': 'CST',
  'Eastern Standard Time': 'EST',
  'Atlantic Standard Time': 'AST',
  'Central European Standard Time': 'CET',
  'Moscow Standard Time': 'MSK',
  'Georgian Standard Time': 'GET',
  'Greenwich Mean Time': 'GMT',
  'India Standard Time': 'IST',
  'Brasilia Standard Time': 'BRT',
  'Japan Standard Time': 'JST',
};

function useTimeZoneAbbr() {
  const date = new Date();
  const tzName = date.toLocaleDateString('en-US', { timeZoneName: 'long', year: '2-digit' }).slice(4);
  if (!timeZoneAbbrMap[tzName]) {
    return date.toLocaleDateString('en-US', { timeZoneName: 'short', year: '2-digit' }).slice(4);
  }
  return timeZoneAbbrMap[tzName];
}

export default useTimeZoneAbbr;
