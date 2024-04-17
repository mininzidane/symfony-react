import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function CommaWrapText({ value, className }) {
  const classes = useStyles();

  return (
    <div
      className={classNames(classes.root, className)}
      dangerouslySetInnerHTML={{
        __html: value
          .split(/(.*?, )/g)
          .filter(Boolean)
          .map((v) => `<div>${v.trim()}</div>`)
          .join(' '),
      }}
    />
  );
}

CommaWrapText.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
};

CommaWrapText.defaultProps = {
  value: '',
  className: '',
};

export default CommaWrapText;
