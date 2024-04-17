import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import Checkmark from '../Checkmark';
import useStyles from './useStyles';

const DescriptionRow = ({ label, value, tooltip, qaId }) => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.descriptionRow, qaId)}>
      <span className={classes.descriptionLabel}>
        {tooltip ? (
          <TooltipOnHover
            placement="top"
            maxWidth={300}
            isInteractive={false}
            hasArrow
            content={tooltip}
            trigger={label}
            triggerClassName={classes.tooltipTrigger}
            color="black"
            padding="6px 12px"
          />
        ) : (
          label
        )}
      </span>
      <div className={classes.descriptionValue}>
        {typeof value === 'boolean' ? <Checkmark isTrue={value} /> : value}
      </div>
    </div>
  );
};

DescriptionRow.propTypes = {
  label: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string, PropTypes.bool]),
  tooltip: PropTypes.object,
  qaId: PropTypes.string,
};

DescriptionRow.defaultProps = {
  label: null,
  value: null,
  tooltip: null,
  qaId: '',
};

export default DescriptionRow;
