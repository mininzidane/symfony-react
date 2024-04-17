import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function SpinnerWheel({ className, style, size, color }) {
  const topSize = Math.floor(size / 2);

  return (
    <span
      className={classNames('spinner-wheel', `is-${color}`, className)}
      style={{
        ...style,
        width: size,
        height: size,
        top: `calc(50% - ${topSize}px)`,
      }}
    />
  );
}

SpinnerWheel.defaultProps = {
  color: 'blue',
  className: '',
  size: 20,
  style: {},
};

SpinnerWheel.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
};

export default memo(SpinnerWheel);
