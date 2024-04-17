import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import MembershipService from 'frontend/js/api/MembershipService';
import Container from 'frontend/js/components/Container';
import Button from 'frontend/js/components/Button';
import Link from 'frontend/js/components/Link';
import CongratulationsCard from 'frontend/js/views/Payment/_Shared/Congratulations/Card';
import Products from 'frontend/js/views/Payment/_Shared/Congratulations/Products';
import AccountBiddingStatus from 'frontend/js/views/Payment/_Shared/Congratulations/AccountBiddingStatus';
import useStyles from './useStyles';

function GuestMembershipReceiptPage() {
  const classes = useStyles();
  const intl = useIntl();

  const { membershipType } = useCustomerHelper();
  const { name, transFeePerc, transFeeMin, biddingLimitCount, biddingLimitAmount } = membershipType;

  if (name !== MembershipService.TYPE.GUEST) {
    RouterService.redirect('membershipPlans');
    return null;
  }

  const prevLocationUrl = LocalStorageService.get('previous_location');
  let returnTo = RouterService.getQueryParam('return_to');
  if (returnTo) {
    returnTo = decodeURIComponent(returnTo);
  }

  const continueURL = returnTo || prevLocationUrl || RouterService.getRoute('searchResults');

  const translationSets = {
    subtitle: intl.formatMessage({ id: 'receiptPage.youAreAlmostReady' }),
    membership: intl.formatMessage({ id: 'receiptPage.membership' }),
    guest: intl.formatMessage({ id: 'membershipPlans.types.Guest' }),
    addDepositToStartBidding: intl.formatMessage({ id: 'receiptPage.addDepositToStartBidding' }),
  };

  return (
    <div className={classes.root}>
      <Container>
        <CongratulationsCard title={translationSets.title} subtitle={translationSets.subtitle}>
          <Products items={[{ product: translationSets.membership, value: translationSets.guest }]} />

          <AccountBiddingStatus
            className="mt-20"
            buyerPower={0}
            deposit={0}
            membership={{
              transFeeMin,
              transFeePerc,
              biddingCountLimit: biddingLimitCount || 'Unlimited',
              biddingAmountLimit: biddingLimitAmount || 'Unlimited',
            }}
          />

          <Button
            href={RouterService.getRoute('buyerPower')}
            label={translationSets.addDepositToStartBidding}
            className="mt-15"
          />

          <div className="mt-15 ta-c tt-c">
            <Link href={continueURL}>
              <FormattedMessage id="receiptPage.finishThisLater" />
            </Link>
          </div>
        </CongratulationsCard>
      </Container>
    </div>
  );
}

export default GuestMembershipReceiptPage;
