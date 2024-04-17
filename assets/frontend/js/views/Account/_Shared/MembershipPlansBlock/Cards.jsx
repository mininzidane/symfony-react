import React from 'react';
import PropTypes from 'prop-types';
import PlanCard from './PlanCard';
import useStyles from './useStyles';

function Cards({
  membershipData,
  customerMembershipType,
  setOpenedCardName,
  selectedLevel,
  openedCardName,
  selectPlan,
  coupon,
  isBasicDisabledPurchaseLimit,
}) {
  const classes = useStyles();

  const openDescriptionHandler = (cardName) => {
    if (cardName === openedCardName) {
      setOpenedCardName(null);
      return;
    }

    setOpenedCardName(cardName);
  };

  if (!membershipData) {
    return (
      <div className={classes.cards}>
        <div className={classes.gap} />
      </div>
    );
  }

  return (
    <div className={classes.cards}>
      {membershipData.membershipTypes.map((membership) => (
        <PlanCard
          key={membership.name}
          planData={membership}
          isDisabledPlan={customerMembershipType.level > membership.level}
          isBasicDisabledPurchaseLimit={isBasicDisabledPurchaseLimit}
          isCurrentPlan={membership.level === customerMembershipType.level}
          selectedLevel={selectedLevel}
          selectPlan={selectPlan}
          isDescriptionOpen={openedCardName === membership.name}
          openDescriptionHandler={openDescriptionHandler}
          customerMembershipType={customerMembershipType}
          coupon={coupon}
        />
      ))}
    </div>
  );
}

Cards.propTypes = {
  membershipData: PropTypes.object,
  customerMembershipType: PropTypes.object.isRequired,
  setOpenedCardName: PropTypes.func.isRequired,
  selectPlan: PropTypes.func.isRequired,
  selectedLevel: PropTypes.number.isRequired,
  openedCardName: PropTypes.string,
  coupon: PropTypes.object,
  isBasicDisabledPurchaseLimit: PropTypes.bool,
};

Cards.defaultProps = {
  membershipData: null,
  openedCardName: null,
  coupon: null,
  isBasicDisabledPurchaseLimit: false,
};

export default Cards;
