import React from 'react';
import PropTypes from 'prop-types';
import Link from 'frontend/js/components/Link';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function InventoryEntry({ href, label, count }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href={href} className={classes.link}>
        {label}
      </Link>

      <span className={classes.count}>({NumberService.formatNumber(count)})</span>
    </div>
  );
}

InventoryEntry.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default InventoryEntry;
