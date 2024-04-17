import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'frontend/js/components/ListItem';
import useStyles from './useStyles';

function Step({ number, label }) {
  const classes = useStyles();

  return (
    <ListItem className={classes.root} gap={10} icon={<div className={classes.number}>{number}</div>} label={label} />
  );
}

Step.propTypes = {
  number: PropTypes.number.isRequired,
  label: PropTypes.node.isRequired,
};

export default Step;
