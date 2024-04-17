/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Card from 'frontend/js/views/LotViewPage/LotPageCard';
import CardIndentedContent from 'frontend/js/views/LotViewPage/LotPageCard/CardIndentedContent';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import MembershipService from 'frontend/js/api/MembershipService';
import StatusValues from 'frontend/js/views/LotViewPage/BidInformation/StatusValues';
import useStyles from './useStyles';

function BidInformation({ lot }) {
  const classes = useStyles();

  const { isAuthenticated, membershipType } = useCustomerHelper();
  const { currentBid, currentCustomerBid, bidStatus } = lot;
  const isGuestMembership = membershipType.level === MembershipService.LEVEL.GUEST;

  return (
    <Card title={<FormattedMessage id="shared.label.bidInformation" />}>
      <CardIndentedContent className={classes.root}>
        <StatusValues
          isAuthenticated={isAuthenticated}
          currentBid={currentBid}
          customerBid={currentCustomerBid}
          bidStatus={bidStatus}
          lot={lot}
          isGuestMembership={isGuestMembership}
        />
      </CardIndentedContent>
    </Card>
  );
}

export default BidInformation;
