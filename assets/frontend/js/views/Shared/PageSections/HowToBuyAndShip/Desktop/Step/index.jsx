import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DotSvg from './img/dot.svg';
import useStyles from './useStyles';

function Step({ imageSrc, title, desc, isOpposite, isShort }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.root, { 'is-short': isShort, 'is-opposite': isOpposite })}>
      <img src={DotSvg} alt="dot" className={classnames(classes.dot, { 'is-opposite': isOpposite })} />

      <div className={classnames(classes.content, { 'is-opposite': isOpposite })}>
        <img src={imageSrc} alt="Icon" />
        <div className={classes.title}>{title}</div>
        <div className={classes.desc}>{desc}</div>
      </div>
    </div>
  );
}

Step.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.node.isRequired,
  isOpposite: PropTypes.bool,
  isShort: PropTypes.bool,
};

Step.defaultProps = {
  isOpposite: false,
  isShort: false,
};

export default Step;
