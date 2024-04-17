import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonLink from 'frontend/js/components/ButtonLink';
import Select from 'frontend/js/components/Select';
import CheckMarkSvg from 'frontend/images/shared/various/checkmark-blue.svg';
import ArrowSvg from 'frontend/images/shared/various/triangle-down-blue.svg';
import useStyles from './useStyles';

function SortBy({
  value,
  onChange,
  options,
  trigger,
  triggerClassName,
  triggerDescClassName,
  triggerLabelClassName,
  isFlipEnabled,
  placement,
  renderLabel,
}) {
  const classes = useStyles();
  const selectedValue = [value.field, value.order].join('-');
  const triggerLabel = options.find((v) => [v.field, v.order].join('-') === selectedValue).label;

  function handleChange(data) {
    const [field, order] = data.split('-');

    if ([value.field, value.order].join('-') !== data) {
      onChange({ field, order });
    }
  }

  return (
    <Select
      placement={placement}
      isFlipEnabled={isFlipEnabled}
      classes={{
        listItem: classes.listItem,
      }}
      trigger={
        trigger ? (
          trigger({ label: triggerLabel })
        ) : (
          <div className={classnames(classes.triggerWrap, triggerClassName)}>
            <span className={classnames(classes.triggerDesc, triggerDescClassName)}>
              <FormattedMessage id="shared.cta.sortBy" />
            </span>

            <ButtonLink
              className={classes.triggerBtn}
              label={
                <span className={classes.trigger}>
                  <span className={classnames(classes.triggerLabel, triggerLabelClassName)}>
                    {renderLabel(triggerLabel)}
                  </span>
                  <img src={ArrowSvg} alt="Triangle" width="7" />
                </span>
              }
            />
          </div>
        )
      }
      onChange={handleChange}
      selected={selectedValue}
      options={options.map(({ label, field, order }) => {
        const val = [field, order].join('-');

        return {
          label: (
            <div className={classes.option}>
              {renderLabel(label)}
              <img
                src={CheckMarkSvg}
                alt="Selected"
                style={{ visibility: val === selectedValue ? 'visible' : 'hidden' }}
              />
            </div>
          ),
          value: val,
        };
      })}
    />
  );
}

SortBy.defaultProps = {
  trigger: null,
  triggerClassName: '',
  triggerDescClassName: '',
  triggerLabelClassName: '',
  placement: 'bottom-end',
  isFlipEnabled: true,
  renderLabel: (v) => v,
};

SortBy.propTypes = {
  value: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
      field: PropTypes.string,
      order: PropTypes.string,
    }),
  ).isRequired,
  trigger: PropTypes.func,
  isFlipEnabled: PropTypes.bool,
  triggerClassName: PropTypes.string,
  triggerDescClassName: PropTypes.string,
  triggerLabelClassName: PropTypes.string,
  placement: PropTypes.string,
  renderLabel: PropTypes.func,
};

export default SortBy;
