import React from 'react';
import Link from 'frontend/js/components/Link';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function VehicleTitle({ title, href }) {
  const classes = useStyles();

  return href ? (
    <Link href={href} className={classes.root}>
      {title}
    </Link>
  ) : (
    <div className={classes.root}>{title}</div>
  );
}

VehicleTitle.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
};

VehicleTitle.defaultProps = {
  href: '',
};

export default VehicleTitle;
