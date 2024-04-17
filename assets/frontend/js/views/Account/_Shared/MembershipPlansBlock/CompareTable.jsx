import React from 'react';
import PropTypes from 'prop-types';

import CompareAndUpgrade from './CompareAndUpgrade';
import useStyles from './useStyles';

function CompareTable({ membershipData, selectedLevel, customerMembershipType, selectPlan, selectedPlan, findPlan }) {
  const classes = useStyles();

  if (!membershipData) {
    return <div className={classes.gapMobile} />;
  }

  return (
    <CompareAndUpgrade
      membershipTypes={membershipData && membershipData.membershipTypes}
      selectedLevel={selectedLevel}
      customerMembershipType={customerMembershipType}
      selectPlan={selectPlan}
      selectedPlan={selectedPlan || findPlan(customerMembershipType.level + 1)}
    />
  );
}

CompareTable.propTypes = {
  membershipData: PropTypes.object,
  customerMembershipType: PropTypes.object.isRequired,
  selectPlan: PropTypes.func.isRequired,
  selectedLevel: PropTypes.number.isRequired,
  selectedPlan: PropTypes.object,
  findPlan: PropTypes.func.isRequired,
};

CompareTable.defaultProps = {
  membershipData: null,
  selectedPlan: null,
};

export default CompareTable;
