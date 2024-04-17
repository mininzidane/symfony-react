import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function SectionTitle({ text, className }) {
  const classes = useStyles();

  return <h2 className={classnames(classes.root, className)}>{text}</h2>;
}

SectionTitle.defaultProps = {
  className: '',
};

SectionTitle.propTypes = {
  text: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SectionTitle;
