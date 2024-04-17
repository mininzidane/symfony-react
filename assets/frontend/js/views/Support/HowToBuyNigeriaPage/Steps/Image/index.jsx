import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function Image({ className, image, alt, width }) {
  const classes = useStyles();
  return (
    <div className={classnames(className, classes.withSlideUpAnimation)} data-is-reveal-on-scroll>
      <img width={width} src={image} alt={alt} />
    </div>
  );
}

Image.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string,
};

Image.defaultProps = {
  className: '',
  width: '374px',
};

export default Image;
