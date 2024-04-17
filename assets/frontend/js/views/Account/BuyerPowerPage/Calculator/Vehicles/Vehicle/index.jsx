import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function Vehicle({ index, availableNumber, onClick }) {
  const isActive = index <= availableNumber;
  const color = isActive ? '#099F22' : '#C5C5C5';
  const classes = useStyles();

  function handleClick() {
    onClick(index);
  }

  return (
    <button type="button" onClick={handleClick} className={classnames(classes.root, { 'is-active': isActive })}>
      <svg width="16" height="14" viewBox="0 0 17 14" fill="none">
        <path
          fill={color}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.8179 0.88375C14.6401 0.3675 14.1423 0 13.5556 0H3.77786C3.19119 0 2.7023 0.3675 2.51564 0.88375L0.666748 6.125V13.125C0.666748 13.6062 1.06675 14 1.55564 14H2.44453C2.93341 14 3.33341 13.6062 3.33341 13.125V12.25H14.0001V13.125C14.0001 13.6062 14.4001 14 14.889 14H15.7779C16.2667 14 16.6667 13.6062 16.6667 13.125V6.125L14.8179 0.88375ZM4.08892 1.75028H13.2356L14.1956 4.47153H3.12892L4.08892 1.75028ZM2.44452 10.4999H14.889V6.12488H2.44452V10.4999ZM4.6667 6.99965C3.93032 6.99965 3.33336 7.58728 3.33336 8.31215C3.33336 9.03702 3.93032 9.62465 4.6667 9.62465C5.40308 9.62465 6.00003 9.03702 6.00003 8.31215C6.00003 7.58728 5.40308 6.99965 4.6667 6.99965ZM11.3333 8.31215C11.3333 7.58728 11.9303 6.99965 12.6666 6.99965C13.403 6.99965 14 7.58728 14 8.31215C14 9.03702 13.403 9.62465 12.6666 9.62465C11.9303 9.62465 11.3333 9.03702 11.3333 8.31215Z"
        />
      </svg>
    </button>
  );
}
Vehicle.propTypes = {
  index: PropTypes.number.isRequired,
  availableNumber: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Vehicle;
