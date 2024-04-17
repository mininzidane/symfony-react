import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function UserInitials({ firstName, lastName, isActive }) {
  const classes = useStyles({ isActive });

  return (
    <span className={classes.root}>
      {firstName && firstName[0].toUpperCase()}
      {lastName && lastName[0].toUpperCase()}
    </span>
  );
}

UserInitials.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default UserInitials;
