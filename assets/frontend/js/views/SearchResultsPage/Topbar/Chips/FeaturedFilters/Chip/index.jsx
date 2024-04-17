import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import NumberService from 'frontend/js/lib/utils/NumberService';
import ButtonCross from 'frontend/js/components/ButtonCross';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function Chip({ count, onClick, onDelete, isActive, label, index }) {
  const { isAuthenticated } = useCustomerHelper();
  const classes = useStyles();
  const text = `${label} (${NumberService.formatNumber(count)})`;

  function openRegisterModal() {
    window.dispatchEvent(new CustomEvent('openAuthModal'));
  }

  function handleClick() {
    if (!isAuthenticated && index > 0) {
      openRegisterModal();
      return;
    }

    onClick();
  }

  function handleDelete() {
    if (!isAuthenticated && index > 0) {
      openRegisterModal();
      return;
    }

    onDelete();
  }

  if (isActive) {
    return (
      <div className={classnames(classes.root, classes.active)}>
        {text}
        <ButtonCross size={8} onClick={handleDelete} className={classes.cross} />
      </div>
    );
  }

  return (
    <button type="button" className={classnames(classes.root, classes.rest)} onClick={handleClick}>
      {text}
    </button>
  );
}

Chip.propTypes = {
  isActive: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number,
  onDelete: PropTypes.func,
};

Chip.defaultProps = {
  onDelete: () => {},
  index: null,
};

export default Chip;
