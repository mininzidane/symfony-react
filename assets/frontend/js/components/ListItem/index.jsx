import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function ListItem({ icon, label, gap, className }) {
  const classes = useStyles({ gap });

  return (
    <div className={classNames('d-f ai-fs', className)}>
      <div className={classes.icon}>{icon}</div>
      <div>{label}</div>
    </div>
  );
}

ListItem.defaultProps = {
  gap: 10,
  className: '',
};

ListItem.propTypes = {
  label: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  gap: PropTypes.number,
  className: PropTypes.string,
};

export default ListItem;
