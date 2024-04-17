import React from 'react';
import Link from 'frontend/js/components/Link';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function VehicleTitle({ title, href }) {
  const classes = useStyles();

  return <div className={classes.root}>{href ? <Link href={href}>{title}</Link> : title}</div>;
}

VehicleTitle.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
};

VehicleTitle.defaultProps = {
  href: null,
};

export default VehicleTitle;
