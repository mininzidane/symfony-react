import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './useStyles';

function Green({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-18858 -19314 18 18">
          <path
            fill="#4A9029"
            d="M19,3H5A2.006,2.006,0,0,0,3,5V19a2.006,2.006,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5a2.006,2.006,0,0,0-2-2ZM10,17,5,12.192l1.4-1.346L10,14.308,17.6,7,19,8.346,10,17Z"
            transform="translate(-18861 -19317)"
            className="cls-1"
          />
        </svg>
      </div>
      {children}
    </div>
  );
}

Green.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Green;
