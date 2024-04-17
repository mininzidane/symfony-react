import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function ButtonLink({ label, onClick, isDashed, isNowrap, style, className, ...props }) {
  const classes = useStyles();

  return (
    <button
      type="button"
      className={classnames(classes.root, { 'is-dashed': isDashed, 'is-nowrap': isNowrap }, className)}
      onClick={onClick}
      style={style}
      {...props}
    >
      {isDashed ? <span style={{ userSelect: 'text' }}>{label}</span> : label}
    </button>
  );
}

ButtonLink.propTypes = {
  label: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  isDashed: PropTypes.bool,
  isNowrap: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ButtonLink.defaultProps = {
  className: '',
  style: {},
  isDashed: false,
  isNowrap: false,
  onClick: () => {},
};

export default ButtonLink;
