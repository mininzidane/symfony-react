import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Group({ title, entries }) {
  const classes = useStyles();

  function formatLabel(label) {
    return label.replace(/[A-Z][a-z]+/g, (v) => ` ${v.toLowerCase()}`);
  }

  return (
    <div>
      <div className={classes.caption}>{title}</div>
      <div className={classes.entries}>
        {Object.entries(entries).map(([key, value]) => {
          if (!key || !value) {
            return null;
          }

          return (
            <div className={classes.entry} key={key}>
              <div className="tt-c">{formatLabel(key)}</div>
              <div className="fw-7">{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Group.propTypes = {
  entries: PropTypes.shape({}).isRequired,
  title: PropTypes.node.isRequired,
};

export default Group;
