import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

Highcharts.chart('bid-statistics-won', {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: 'Won Bids',
  },
  tooltip: {
    pointFormat: '<b>Count: {point.y} ({point.percentage:.1f}%)</b>',
  },
  accessibility: {
    point: {
      valueSuffix: '%',
    },
  },
  series: [
    {
      colorByPoint: true,
      data: JSON.parse(document.getElementById('bid-statistics-won').getAttribute('data-json')),
    },
  ],
});

Highcharts.chart('bid-statistics-placed', {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: 'Placed Bids',
  },
  tooltip: {
    pointFormat: '<b>Count: {point.y} ({point.percentage:.1f}%)</b>',
  },
  accessibility: {
    point: {
      valueSuffix: '%',
    },
  },
  series: [
    {
      colorByPoint: true,
      data: JSON.parse(document.getElementById('bid-statistics-placed').getAttribute('data-json')),
    },
  ],
});

Highcharts.chart('preliminary-bids-chart', {
  chart: {
    type: 'area',
    zoomType: 'x',
  },
  title: {
    text: 'Preliminary Bids',
  },
  xAxis: {
    categories: window.datesList,
  },
  yAxis: {
    title: {
      text: 'Count',
    },
  },
  series: JSON.parse(document.getElementById('preliminary-bids-chart').getAttribute('data-json')),
});

Highcharts.chart('live-sale-bids-chart', {
  chart: {
    type: 'area',
    zoomType: 'x',
  },
  title: {
    text: 'Live Sale Bids',
  },
  xAxis: {
    categories: window.datesList,
  },
  yAxis: {
    title: {
      text: 'Count',
    },
  },
  series: JSON.parse(document.getElementById('live-sale-bids-chart').getAttribute('data-json')),
});

Highcharts.chart('mao-bids-chart', {
  chart: {
    type: 'area',
    zoomType: 'x',
  },
  title: {
    text: 'MAO',
  },
  xAxis: {
    categories: window.datesList,
  },
  yAxis: {
    title: {
      text: 'Count',
    },
  },
  series: JSON.parse(document.getElementById('mao-bids-chart').getAttribute('data-json')),
});

Highcharts.chart('bin-bids-chart', {
  chart: {
    type: 'area',
    zoomType: 'x',
  },
  title: {
    text: 'BIN',
  },
  xAxis: {
    categories: window.datesList,
  },
  yAxis: {
    title: {
      text: 'Count',
    },
  },
  series: JSON.parse(document.getElementById('bin-bids-chart').getAttribute('data-json')),
});
