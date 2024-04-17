import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function Watchlist({ className }) {
  return (
    <div className={classnames(className, 'svg-icon d-i')} style={{ width: 13, height: 12 }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19">
        <path
          className="heart-circuit"
          d="M16.5,3A5.907,5.907,0,0,0,12,5.164,5.907,5.907,0,0,0,7.5,3,5.546,5.546,0,0,0,2,8.695c0,3.914,3.4,7.1,8.55,11.949L12,22l1.45-1.367C18.6,15.8,22,12.609,22,8.695A5.546,5.546,0,0,0,16.5,3ZM12.1,19.1l-.1.1-.1-.1C7.14,14.638,4,11.687,4,8.695A3.48,3.48,0,0,1,7.5,5.071a3.91,3.91,0,0,1,3.57,2.444h1.87A3.885,3.885,0,0,1,16.5,5.071,3.48,3.48,0,0,1,20,8.695C20,11.687,16.86,14.638,12.1,19.1Z"
          transform="translate(-2 -3)"
          fill="currentColor"
        />
        <path
          className="heart-bg"
          d="M12,22l-1.45-1.367C5.4,15.8,2,12.609,2,8.695A5.546,5.546,0,0,1,7.5,3,5.907,5.907,0,0,1,12,5.164,5.907,5.907,0,0,1,16.5,3,5.546,5.546,0,0,1,22,8.695c0,3.914-3.4,7.1-8.55,11.949Z"
          transform="translate(-2 -3)"
          fill="none"
        />
      </svg>
    </div>
  );
}

Watchlist.propTypes = {
  className: PropTypes.string,
};

Watchlist.defaultProps = {
  className: '',
};

export default Watchlist;
