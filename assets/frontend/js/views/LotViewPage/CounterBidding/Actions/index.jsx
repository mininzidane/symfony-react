import React from 'react';
import PropTypes from 'prop-types';
import ApproveButton from './ApproveModal/ApproveButton';
import CounterBidButton from './CounterBidModal/CounterBidButton';
import RerunButton from './RerunModal/RerunButton';
import StayButton from './StayModal/StayButton';
import useStyles from './useStyles';

function Actions({ consignment, updateConsignment }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.btnWrap}>
        <ApproveButton className={classes.btn} consignment={consignment} updateConsignment={updateConsignment} />
      </div>
      <div className={classes.btnWrap}>
        <CounterBidButton className={classes.btn} consignment={consignment} updateConsignment={updateConsignment} />
      </div>
      <div className={classes.btnWrap}>
        <RerunButton className={classes.btn} consignment={consignment} updateConsignment={updateConsignment} />
      </div>
      <div className={classes.btnWrap}>
        <StayButton className={classes.btn} consignment={consignment} updateConsignment={updateConsignment} />
      </div>
    </div>
  );
}

Actions.propTypes = {
  consignment: PropTypes.object,
  updateConsignment: PropTypes.func.isRequired,
};

Actions.defaultProps = {
  consignment: null,
};

export default Actions;
