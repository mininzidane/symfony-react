/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import get from 'lodash/get';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import PaymentService from 'frontend/js/api/PaymentService';
import useInvoiceType from '../useInvoiceType';
import useStyles from './useStyles';

function InvoiceDescriptionCell({ invoice }) {
  const classes = useStyles();
  const { isShipping, isLotPurchase, isMembership } = useInvoiceType(invoice);

  if (isShipping || isLotPurchase) {
    const ymm = invoice.lotPurchase
      ? `${invoice.lotPurchase.vehicleYear} ${invoice.lotPurchase.vehicleMake} ${invoice.lotPurchase.vehicleModel}`
      : invoice.lot?.description;
    const vin = invoice.lotPurchase ? invoice.lotPurchase?.vehicleVin : invoice.lot?.vin;

    return (
      <div className={classes.root}>
        <>
          {invoice.customer.b2BBidder && (
            <div>
              Bidder:{' '}
              <strong>
                {invoice.customer.firstName} {invoice.customer.lastName}
              </strong>
            </div>
          )}
          {ymm && <div>{ymm}</div>}
          {vin && <div style={{ color: '#828282' }}>{vin}</div>}
          {invoice.lot && (
            <a
              href={RouterService.getRoute('lot', null, false, { id: invoice.lot.id, slug: invoice.lot.slug })}
              className={classes.link}
            >
              Lot #: {invoice.lot.id}
            </a>
          )}
          {!invoice.lot && isLotPurchase && (
            <div>
              Lot #: {invoice.lotPurchase.auction} {invoice.lotPurchase.lotNumber}
            </div>
          )}
        </>
      </div>
    );
  }

  if (isMembership) {
    const membershipProductServiceKey = get(invoice, 'items.0.productService.objectKey', null);
    const membershipTranslationKeyMap = {
      [PaymentService.PRODUCT_SERVICE.MEMBERSHIP_UPGRADE_BASIC]:
        'dashboardPage.paymentsDue.descriptions.upgradeToBasicMembership',
      [PaymentService.PRODUCT_SERVICE.MEMBERSHIP_UPGRADE_ADVANCED]:
        'dashboardPage.paymentsDue.descriptions.upgradeToAdvancedMembership',
      [PaymentService.PRODUCT_SERVICE.MEMBERSHIP_UPGRADE_PREMIUM]:
        'dashboardPage.paymentsDue.descriptions.upgradeToPremiumMembership',
      [PaymentService.PRODUCT_SERVICE.ADVANCED_TO_PREMIUM_UPGRADE]:
        'dashboardPage.paymentsDue.descriptions.upgradeFromAdvancedToPremium',
      [PaymentService.PRODUCT_SERVICE.MEMBERSHIP_AUTO_RENEWAL_BASIC]:
        'dashboardPage.paymentsDue.descriptions.basicMembershipAutorenewal',
      [PaymentService.PRODUCT_SERVICE.MEMBERSHIP_AUTO_RENEWAL_ADVANCED]:
        'dashboardPage.paymentsDue.descriptions.advancedMembershipAutorenewal',
      [PaymentService.PRODUCT_SERVICE.MEMBERSHIP_AUTO_RENEWAL_PREMIUM]:
        'dashboardPage.paymentsDue.descriptions.premiumMembershipAutorenewal',
    };
    const membershipTranslationKey = membershipTranslationKeyMap[membershipProductServiceKey];
    if (membershipTranslationKey) {
      return (
        <FormattedMessage
          id={membershipTranslationKey}
          values={{ span: (chunks) => <span style={{ color: '#828282' }}>{chunks}</span> }}
        />
      );
    }
  }

  return null;
}

export { InvoiceDescriptionCell };
