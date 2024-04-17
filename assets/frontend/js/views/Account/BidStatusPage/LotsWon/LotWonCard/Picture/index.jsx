import React from 'react';
import PropTypes from 'prop-types';
import Image from 'frontend/js/components/Image';
import useStyles from './useStyles';

function Picture({ src, alt }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Image ratio={75} src={src || ''} fallback alt={alt} />
    </div>
  );
}

Picture.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

Picture.defaultProps = {
  src: '',
  alt: '',
};

export default Picture;
