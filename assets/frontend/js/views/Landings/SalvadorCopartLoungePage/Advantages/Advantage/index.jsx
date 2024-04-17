import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Advantage({ icon, title, desc, className }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classNames(classes.icon, className)}>
        <img src={icon} alt={title} />
      </div>
      <div className={classes.advantage}>
        <strong>{title}</strong> {desc}
      </div>
    </div>
  );
}

Advantage.defaultProps = {
  className: '',
};

Advantage.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Advantage;
