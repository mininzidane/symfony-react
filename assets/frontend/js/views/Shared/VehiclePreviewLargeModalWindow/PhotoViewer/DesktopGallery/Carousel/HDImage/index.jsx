/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import Image from 'frontend/js/components/Image';

function HDImage({ src, className, ...rest }) {
  return (
    <div className={classnames(className, 'pos-r')}>
      <Image src={src} {...rest} />
    </div>
  );
}

export default HDImage;
