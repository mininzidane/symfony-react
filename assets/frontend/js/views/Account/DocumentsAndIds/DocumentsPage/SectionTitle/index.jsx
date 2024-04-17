import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function SectionTitle({ text, count }) {
  const classes = useStyles();

  return (
    <h2 className={classes.root}>
      {text} {`(${count})`}
    </h2>
  );
}

SectionTitle.propTypes = {
  text: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
};

export default SectionTitle;
