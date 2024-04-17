import React from 'react';
import PropTypes from 'prop-types';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import CheckmarkSvg from 'frontend/images/shared/various/checkmark-round-blue.svg';
import AlertSvg from 'frontend/images/shared/various/alert-round-red.svg';
import useStyles from './useStyles';

function StatusEntry({ label, value, isChecked, tooltipContent }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.label}>
        <div className={classes.iconWrap}>
          <img src={isChecked ? CheckmarkSvg : AlertSvg} alt={isChecked ? '✔' : '✖'} width="12" height="12" />
        </div>
        <TooltipOnHover
          trigger={label}
          content={tooltipContent}
          placement="top"
          color="black"
          offset={8}
          isInteractive={false}
          hasArrow
        />
      </div>

      <div>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

StatusEntry.defaultProps = {
  isChecked: true,
};

StatusEntry.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  tooltipContent: PropTypes.node.isRequired,
  isChecked: PropTypes.bool,
};

export default StatusEntry;
