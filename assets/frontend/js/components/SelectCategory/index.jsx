/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ButtonLink from 'frontend/js/components/ButtonLink';
import Select from 'frontend/js/components/Select';
import CheckMarkSvg from 'frontend/images/shared/various/checkmark-blue.svg';
import useStyles from './useStyles';

function SelectCategory({
  selectedOption,
  options,
  onChange,
  triggerDesc,
  triggerClassName,
  triggerDescClassName,
  triggerLabelClassName,
  isFlipEnabled,
  placement,
  ...props
}) {
  const classes = useStyles(props);

  function handleChange(option) {
    if (option.value === selectedOption.value) {
      return;
    }

    onChange(option);
  }

  return (
    <Select
      placement={placement}
      isFlipEnabled={isFlipEnabled}
      classes={{
        listItem: classes.listItem,
      }}
      trigger={
        <div className={classnames(classes.triggerWrap, triggerClassName)}>
          {triggerDesc && <span className={classnames(classes.triggerDesc, triggerDescClassName)}>{triggerDesc}</span>}

          <ButtonLink
            className={classes.triggerBtn}
            label={
              <span className={classes.trigger}>
                <span className={classnames(classes.triggerLabel, triggerLabelClassName)}>{selectedOption.label}</span>
                <svg className={classes.arrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 7 3">
                  <path d="M0 0h7L3.5 3 0 0z" />
                </svg>
              </span>
            }
          />
        </div>
      }
      onChange={handleChange}
      selected={selectedOption?.value}
      options={options.map(({ value, label }) => ({
        value,
        label: (
          <div className={classes.option}>
            {label}
            <img
              alt="Option checkmark"
              src={CheckMarkSvg}
              style={{ visibility: value === selectedOption.value ? 'visible' : 'hidden' }}
            />
          </div>
        ),
      }))}
    />
  );
}

SelectCategory.defaultProps = {
  placement: 'bottom',
  triggerClassName: '',
  triggerDescClassName: '',
  triggerLabelClassName: '',
  isFlipEnabled: true,
  triggerDesc: null,
};

SelectCategory.propTypes = {
  selectedOption: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      field: PropTypes.string,
      order: PropTypes.string,
    }),
  ).isRequired,
  triggerDesc: PropTypes.node,
  isFlipEnabled: PropTypes.bool,
  triggerClassName: PropTypes.string,
  triggerDescClassName: PropTypes.string,
  triggerLabelClassName: PropTypes.string,
  placement: PropTypes.string,
};

export default SelectCategory;
