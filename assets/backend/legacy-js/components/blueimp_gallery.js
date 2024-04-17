const blueimp = require('blueimp-gallery');
const $ = require('jquery');

$(function () {
  $('div[data-blueimp-gallery]').each(function () {
    var $gallery = $(this).attr('data-blueimp-gallery');
    var blueImpLoaderIterations = 0;
    var blueimpLoader = setInterval(function () {
      blueImpLoaderIterations++;
      if (blueimp || blueImpLoaderIterations > 10) {
        blueimp(
          document.getElementById($gallery + '-images').getElementsByTagName('a'), {
            container: '#' + $gallery,
            carousel: true,
          }
        );
        clearInterval(blueimpLoader);
      }
    }, 300);
  });
});
