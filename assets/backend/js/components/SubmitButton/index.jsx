import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SpinnerWheel from '../SpinnerWheel';

function SubmitButton({ className, style, label, disabled, onClick, isLoading }) {
  const btnClass = classNames('btn', className, { 'is-loading': isLoading, 'is-disabled': disabled });

  return (
    <button type="submit" className={btnClass} onClick={onClick} disabled={disabled} style={style}>
      {isLoading && <SpinnerWheel color="white" className="is-in-button" size={14} />}
      {label}
    </button>
  );
}

SubmitButton.defaultProps = {
  className: '',
  style: {},
  disabled: false,
  isLoading: false,
  onClick: () => {},
};

SubmitButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default React.memo(SubmitButton);
