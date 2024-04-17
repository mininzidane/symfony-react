import React from 'react';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import Amount from 'frontend/js/components/Amount';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import PropTypes from 'prop-types';
import CardPlane from 'frontend/js/components/CardPlane';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import CustomerService from 'frontend/js/api/CustomerService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import NumberService from 'frontend/js/lib/utils/NumberService';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import useStyles from './useStyles';

function InfoCard({ totalDeposit, availableDeposit }) {
  const classes = useStyles();
  const { currentBidsCount } = useCustomerHelper();
  const { data } = useQuery('due-invoice-token-data', () => CustomerService.getDueInvoiceToken());
  const { getRoute, getLocalizedHcRoute } = RouterService;

  const shippingOrderToken = get(data, 'lastUnpaidInvoice[0].shippingOrderToken', null);
  const lotPurchaseToken = get(data, 'lastUnpaidInvoice[0].lotPurchaseToken', null);
  const invoiceToken = get(data, 'lastUnpaidInvoice[0].invoiceToken', null);
  const due = data?.totalDue || 0;

  const paymentUrl =
    invoiceToken || lotPurchaseToken
      ? RouterService.getRoute('invoicePayment', null, false, { token: invoiceToken || lotPurchaseToken })
      : RouterService.getRoute('shippingPayment', null, false, { token: shippingOrderToken });

  return (
    <CardPlane contentClassName={classes.root}>
      <div className={classes.header}>
        <div className={classes.caption}>
          <FormattedMessage id="depositsPage.infoCard.title" />
        </div>
        <div className={classes.desc}>
          <FormattedMessage id="depositsPage.infoCard.feature1" />
          {'. '}

          <TooltipOnHover
            trigger={
              <span className={classes.featureListTrigger}>
                <FormattedMessage id="receiptPage.autoFinancingOptions.link" />
              </span>
            }
            offset={13}
            isFlipEnabled={false}
            content={
              <ul className={classes.featureList}>
                <li>
                  <FormattedMessage id="depositsPage.infoCard.feature2" />
                </li>
                <li>
                  <FormattedMessage id="depositsPage.infoCard.feature3" />
                </li>
                <li>
                  <FormattedMessage
                    id="depositsPage.infoCard.feature4"
                    values={{
                      a: (chunks) => (
                        <a href={getLocalizedHcRoute()} target="_blank" rel="noopener noreferrer">
                          {chunks}
                        </a>
                      ),
                    }}
                  />
                </li>
              </ul>
            }
          />
        </div>
      </div>

      <div className={classes.body}>
        <div className={classes.row}>
          <div className={classes.label}>
            <FormattedMessage id="depositsPage.infoCard.totalDeposit" />
          </div>
          <div>
            <Amount className={classes.value} value={parseFloat(totalDeposit)} hasCurrency />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.label}>
            <FormattedMessage id="depositsPage.infoCard.availableDeposit" />
          </div>
          <div className={classes.inlineGrid}>
            <Amount className={classes.value} value={availableDeposit} hasCurrency />
            {availableDeposit > 0 && (
              <ButtonOutlined
                className={classes.releaseCta}
                label={<FormattedMessage id="shared.cta.release" />}
                onClick={() => ScrollService.smoothScrollIntoViewById('buyer-power-page-deposits-table')}
                isInline
                isThinBorder
                isBackgroundWhite
              />
            )}
          </div>
        </div>

        <div className={classes.customRow}>
          <div className={classes.activeBids}>
            <div className={classes.label}>
              <FormattedMessage id="depositsPage.infoCard.activeBids" />
            </div>
            <div className={classes.value}>
              {currentBidsCount > 0 ? (
                <a href={getRoute('currentBids')} className={classes.depositsSummaryValue}>
                  {currentBidsCount}
                </a>
              ) : (
                currentBidsCount
              )}
            </div>
          </div>
          <div className={classes.balanceDue}>
            <div>
              <div className={classes.label}>
                <FormattedMessage id="depositsPage.infoCard.balanceDue" />
              </div>
              <div className={classes.value}>
                {due > 0 ? (
                  <a href={getRoute('purchases')} className={classes.balanceDueValue}>
                    {`${NumberService.formatCurrency(due, 'USD', false)} USD`}
                  </a>
                ) : (
                  `${NumberService.formatCurrency(due, 'USD', false)} USD`
                )}
              </div>
            </div>
            {due > 0 && data?.totalUnpaidInvoices ? (
              <>
                {data?.totalUnpaidInvoices > 1 ? (
                  <ButtonOutlined
                    className={classes.releaseCta}
                    label={<FormattedMessage id="shared.cta.view" />}
                    href={getRoute('purchases')}
                    isInline
                    isThinBorder
                    isBackgroundWhite
                  />
                ) : (
                  <ButtonOutlined
                    className={classes.releaseCta}
                    label={<FormattedMessage id="shared.cta.payNow" />}
                    href={paymentUrl}
                    isInline
                    isThinBorder
                    isBackgroundWhite
                  />
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </CardPlane>
  );
}

InfoCard.propTypes = {
  totalDeposit: PropTypes.string,
  availableDeposit: PropTypes.number,
};

InfoCard.defaultProps = {
  totalDeposit: null,
  availableDeposit: null,
};

export default InfoCard;
