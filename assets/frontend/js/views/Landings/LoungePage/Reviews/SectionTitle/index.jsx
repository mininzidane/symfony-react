/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function SectionTitle({ text, className, tagName }) {
  const classes = useStyles();
  const Component = tagName || 'h2';

  return <Component className={classnames(classes.root, className)}>{text}</Component>;
}

SectionTitle.defaultProps = {
  className: '',
};

SectionTitle.propTypes = {
  text: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SectionTitle;
