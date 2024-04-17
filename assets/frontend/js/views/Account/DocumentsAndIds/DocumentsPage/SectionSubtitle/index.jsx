import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function SectionSubtitle({ text }) {
  const classes = useStyles();

  return <h3 className={classes.root}>{text}</h3>;
}

SectionSubtitle.propTypes = {
  text: PropTypes.node.isRequired,
};

export default SectionSubtitle;
