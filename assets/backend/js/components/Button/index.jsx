import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SpinnerWheel from '../SpinnerWheel';

function Button({ className, style, label, disabled, onClick, isLoading, title }) {
  const btnClass = classNames('btn', className, { 'is-loading': isLoading, 'is-disabled': disabled });

  return (
    <button type="button" className={btnClass} onClick={onClick} disabled={disabled} style={style} title={title}>
      {isLoading && (
        <SpinnerWheel color="white" className="is-in-button" size={14} style={{ marginRight: 8, marginBottom: -2 }} />
      )}
      {label}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  style: {},
  disabled: false,
  isLoading: false,
  onClick: () => {},
  title: '',
};

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default React.memo(Button);
