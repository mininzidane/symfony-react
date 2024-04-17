import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ButtonCross from 'frontend/js/components/ButtonCross';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function Chip({ onClick, onDelete, isActive, label }) {
  const { isAuthenticated } = useCustomerHelper();
  const classes = useStyles();

  function openRegisterModal() {
    window.dispatchEvent(new CustomEvent('openAuthModal'));
  }

  function handleClick() {
    if (!isAuthenticated) {
      openRegisterModal();
      return;
    }

    onClick();
  }

  function handleDelete() {
    if (!isAuthenticated) {
      openRegisterModal();
      return;
    }

    onDelete();
  }

  if (isActive) {
    return (
      <div className={classnames(classes.root, classes.active)}>
        {label}
        <ButtonCross size={8} onClick={handleDelete} className={classes.cross} />
      </div>
    );
  }

  return (
    <button type="button" className={classnames(classes.root, classes.rest)} onClick={handleClick}>
      {label}
    </button>
  );
}

Chip.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

Chip.defaultProps = {
  onDelete: () => {},
  isActive: false,
};

export default Chip;
