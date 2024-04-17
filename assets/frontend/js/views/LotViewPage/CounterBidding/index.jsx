import React from 'react';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import ConsignmentService from 'frontend/js/api/ConsignmentService';
import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import LotPageBlock from '../LotPageBlock';
import StatusValues from './StatusValues';
import VehicleSold from './VehicleSold';
import Actions from './Actions';
import PayoutEstimator from './PayoutEstimator';
import useConsignment from './useConsignment';
import useStyles from './useStyles';

function CounterBidding({ lot }) {
  const intl = useIntl();
  const classes = useStyles();

  const { consignment, isLoading, updateConsignment } = useConsignment(lot?.id);
  const isLotSold = ConsignmentService.STATUSES_TO_MARK_SYC_AS_SOLD.includes(consignment?.lotStatus);

  return (
    <LotPageBlock>
      <Card id="lot-page-bid-info-card" title={intl.formatMessage({ id: 'lotPage.bidInformation.title' })}>
        {isLoading ? (
          <div className={classes.loading}>
            <SpinnerWheel size={28} thickness={3} isCentered />
          </div>
        ) : (
          <>
            <StatusValues consignment={consignment} isLotSold={isLotSold} />
            {isLotSold ? (
              <VehicleSold consignment={consignment} />
            ) : (
              <>
                {consignment?.awaitingApprovalStatus && (
                  <CardIndentedContent>
                    <Actions consignment={consignment} updateConsignment={updateConsignment} />
                  </CardIndentedContent>
                )}
              </>
            )}
            {consignment?.currentBid > 0 && (
              <div className={classnames(classes.payoutEstimator, isLotSold && 'is-sold')}>
                <PayoutEstimator consignment={consignment} />
              </div>
            )}
          </>
        )}
      </Card>
    </LotPageBlock>
  );
}

CounterBidding.propTypes = {
  lot: LotShape,
};

CounterBidding.defaultProps = {
  lot: null,
};

export default CounterBidding;
