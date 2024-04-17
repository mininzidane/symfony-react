/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import Image from 'frontend/js/components/Image';
import HDIcon from 'frontend/js/views/Shared/HDImage/img/hd.svg';
import useStyles from 'frontend/js/views/Shared/HDImage/useStyles';

function HDImage({ src, className, ...rest }) {
  const isHD = src.includes('HPX');
  const classes = useStyles();

  return (
    <div className={classnames(className, 'pos-r')}>
      {isHD && (
        <div className={classes.imageHD}>
          <img src={HDIcon} alt="HD" />
        </div>
      )}

      <Image className={classes.image} src={src} {...rest} />
    </div>
  );
}

export default HDImage;
