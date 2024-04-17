import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SpinnerWheel from '../SpinnerWheel';
import useStyles from './useStyles';

function ButtonLink({ label, href, onClick, isDashed, isNowrap, isLoading, style, className, ...props }) {
  const classes = useStyles();

  const ButtonComponent = href ? 'a' : 'button';

  return (
    <ButtonComponent
      type={href ? null : 'button'}
      href={href}
      className={classnames(classes.root, { 'is-dashed': isDashed, 'is-nowrap': isNowrap }, className)}
      onClick={onClick}
      style={style}
      {...props}
    >
      {isLoading && <SpinnerWheel style={{ marginRight: 4, marginBottom: -2 }} size={15} color="blue" />}
      {isDashed ? <span style={{ userSelect: 'text' }}>{label}</span> : label}
    </ButtonComponent>
  );
}

ButtonLink.propTypes = {
  label: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  isDashed: PropTypes.bool,
  isNowrap: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ButtonLink.defaultProps = {
  className: '',
  href: '',
  style: {},
  isDashed: false,
  isNowrap: false,
  isLoading: false,
  onClick: () => {},
};

export default ButtonLink;
