import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Header({ title, subtitle }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div className={classes.subtitle}>{subtitle}</div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
};

export default Header;
