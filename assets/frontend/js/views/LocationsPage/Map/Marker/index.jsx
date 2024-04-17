/* eslint-disable react/prop-types,unused-imports/no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function Marker({ data, isTitleUpperCase = true }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <a href={data.link} className={classnames(classes.link, isTitleUpperCase && 'is-uppercase')}>
        {data.name}
      </a>
      <div className="mt-15">
        <div className={classes.line}>
          <svg className={classes.icon} xmlns="http://www.w3.org/2000/svg" viewBox="-926.667 1484 13.333 11.333">
            <path
              fill="#7E7E7E"
              data-name="Path 9138"
              d="M7.333,14.333v-4H10v4h3.333V9h2L8.667,3,2,9H4v5.333Z"
              transform="translate(-928.667 1481)"
            />
          </svg>
          <div>
            {data.localizedAddress ? (
              data.localizedAddress
            ) : (
              <>
                {data.address}
                <br />
                {data.city}, {data.state}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Marker.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default Marker;
