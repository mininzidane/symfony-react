import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ButtonLink from 'frontend/js/components/ButtonLink';
import CheckmarkSvg from 'frontend/images/shared/various/checkmark-circle-24x24.svg';
import useStyles from './useStyles';

function Step({ title, value, isCompleted, onClick, isDisabled, isEditable }) {
  const classes = useStyles();

  function handleClick() {
    if (isDisabled || !isEditable) {
      return;
    }
    onClick();
  }

  return (
    <div>
      <ButtonLink
        className={classnames(classes.link, { 'is-editable': isEditable, 'is-disabled': isDisabled })}
        onClick={handleClick}
        label={
          <>
            {isCompleted ? (
              <img src={CheckmarkSvg} alt="✔" width="24" height="24" />
            ) : (
              <i className={classnames(classes.radioIcon, isDisabled && 'is-disabled')} />
            )}
            <span>{isCompleted ? value || title : title}</span>
          </>
        }
      />
    </div>
  );
}

Step.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  value: PropTypes.string,
  isCompleted: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isEditable: PropTypes.bool,
};

Step.defaultProps = {
  title: null,
  value: null,
  isCompleted: false,
  isDisabled: false,
  isEditable: true,
};

export default Step;
