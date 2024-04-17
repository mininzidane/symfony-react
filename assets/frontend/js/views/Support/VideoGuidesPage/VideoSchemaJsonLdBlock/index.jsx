import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { formatISODuration } from 'date-fns';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function VideoSchemaJsonLdBlock({ videos }) {
  const videoStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [],
  };

  videos.forEach((video) => {
    const [seconds, minutes, hours] = (video.videoLength || '').split(':').reverse();

    videoStructuredData.itemListElement.push({
      '@type': 'ListItem',
      position: video.priority,
      item: {
        '@type': 'VideoObject',
        name: video.title,
        description: video.title,
        thumbnailUrl: video.thumbnailUrl || '',
        duration: formatISODuration({
          hours: hours || 0,
          minutes: minutes || 0,
          seconds: seconds || 0,
        }),
        contentUrl: video.url,
        uploadDate: DateTimeService.formatFromISOString(video.uploadDate, 'yyyy-MM-dd'),
        potentialAction: {
          '@type': 'SeekToAction',
          target: `${video.url}?t={seek_to_second_number}`,
          'startOffset-input': 'required name=seek_to_second_number',
        },
      },
    });
  });

  return <script type="application/ld+json">{JSON.stringify(videoStructuredData)}</script>;
}

VideoSchemaJsonLdBlock.propTypes = {
  videos: PropTypes.array.isRequired,
};

export default memo(VideoSchemaJsonLdBlock);
