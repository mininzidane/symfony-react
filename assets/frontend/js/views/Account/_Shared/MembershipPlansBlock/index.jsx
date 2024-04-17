import React, { useState } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import Container from 'frontend/js/components/Container';
import Reviews from 'frontend/js/views/Shared/PageSections/Reviews';
import useMembershipTypes from 'frontend/js/hooks/useMembershipTypes';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

import Trusted from './Trusted';
import MobileButtons from './MobileButtons';
import Faq from './Faq';
import Cards from './Cards';
import CompareTable from './CompareTable';
import prepareMembershipData from './prepareMembershipData';
import useStyles from './useStyles';

function MembershipPlans({ coupon }) {
  const classes = useStyles();

  const customerMembershipType = window.customer.membershipType;
  const membershipData = prepareMembershipData(useMembershipTypes());
  const { lotsWonCount } = useCustomerHelper();

  const findPlan = (level) => {
    if (!membershipData) {
      return null;
    }

    const plan = membershipData.membershipTypes.find((item) => item.level === level);
    if (!plan && customerMembershipType) {
      return customerMembershipType;
    }

    return plan;
  };

  const isBasicDisabledPurchaseLimit = customerMembershipType.level === 1 && lotsWonCount > 0;
  const initialPlan = customerMembershipType.level + (isBasicDisabledPurchaseLimit ? 2 : 1);
  const [selectedLevel, setSelectedLevel] = useState(initialPlan);
  const [selectedPlan, setSelectedPlan] = useState(findPlan(initialPlan));
  const [openedCardName, setOpenedCardName] = useState();

  const selectPlan = (level) => {
    if (customerMembershipType.level >= level) {
      return;
    }

    setSelectedLevel(level);
    setSelectedPlan(findPlan(level));
  };

  return (
    <>
      <Container className={classes.root}>
        <div className={classes.header}>
          <h1 className={classnames(classes.title, 'qa_header')}>
            <FormattedMessage id="membershipPlans.page.title" />
          </h1>
          <p className={classnames(classes.subtitle, 'qa_subheader')}>
            <FormattedMessage id="membershipPlans.page.subtitle" />
          </p>
        </div>

        <Cards
          membershipData={membershipData}
          customerMembershipType={customerMembershipType}
          setOpenedCardName={setOpenedCardName}
          selectedLevel={selectedLevel}
          openedCardName={openedCardName}
          selectPlan={selectPlan}
          coupon={coupon}
          isBasicDisabledPurchaseLimit={isBasicDisabledPurchaseLimit}
        />

        {membershipData && (
          <MobileButtons
            selectedPlan={selectedPlan || findPlan(customerMembershipType.level + 1)}
            planName={customerMembershipType?.name}
          />
        )}
      </Container>

      <CompareTable
        membershipData={membershipData}
        selectedLevel={selectedLevel}
        customerMembershipType={customerMembershipType}
        selectPlan={selectPlan}
        selectedPlan={selectedPlan}
        findPlan={findPlan}
      />

      <Trusted />
      <Reviews bgColor="rgb(241, 241, 248)" />
      <Faq />
    </>
  );
}

MembershipPlans.propTypes = {
  coupon: PropTypes.object,
};

MembershipPlans.defaultProps = {
  coupon: null,
};

export default MembershipPlans;
