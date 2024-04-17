import React from 'react';
import Link from 'frontend/js/components/Link';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function VehicleTitle({ title, href }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href={href}>{title}</Link>
    </div>
  );
}

VehicleTitle.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default VehicleTitle;
