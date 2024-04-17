import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import ArrowForwardSvg from 'frontend/images/shared/various/arrow-forward.svg';
import Time from '../../Values/Time';
import Location from '../../Values/Location';
import Details from './Details';
import useStyles from './useStyles';

function AuctionCell({ auction }) {
  const classes = useStyles();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <Time auction={auction} />
        <Location auction={auction} />
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={classnames(classes.button, isActive && 'is-active')}
        >
          <img src={ArrowForwardSvg} alt="Arrow" />
        </button>
      </div>
      <Collapse in={isActive} mountOnEnter unmountOnExit>
        <Details auction={auction} />
      </Collapse>
    </div>
  );
}

AuctionCell.propTypes = {
  auction: PropTypes.object.isRequired,
};

export default AuctionCell;
