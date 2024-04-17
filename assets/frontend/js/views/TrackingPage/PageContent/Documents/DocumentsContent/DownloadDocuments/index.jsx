/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Row from 'frontend/js/components/Card/Row';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import ButtonLink from 'frontend/js/components/ButtonLink';
import ShippingCoverageModalLazy from 'frontend/js/views/Shared/ShippingCoverageModal/lazy';
import TrackingService from 'frontend/js/api/TrackingService';
import useStyles from './useStyles';

function DownloadDocuments({ documents, shippingOrder }) {
  const classes = useStyles();
  const [isShippingCoverageModalOpen, setShippingCoverageModalOpen] = useState(false);

  const successCheckmark = (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="6" fill="#4A9029" />
      <path
        d="M8.36673 3.14887L4.81749 7.11042L3.85222 5.92219C3.76564 5.82981 3.65085 5.77467 3.52933 5.76709C3.40781 5.7595 3.2879 5.8 3.19204 5.881C3.09618 5.962 3.03095 6.07794 3.00855 6.20713C2.98615 6.33632 3.00812 6.46989 3.07035 6.58285L4.21308 8.69552C4.26755 8.78876 4.34299 8.86559 4.43239 8.91883C4.52179 8.97207 4.62222 9 4.72431 9C4.8264 9 4.92683 8.97207 5.01623 8.91883C5.10562 8.86559 5.18107 8.78876 5.23553 8.69552C5.41596 8.43174 8.84492 3.74378 8.84492 3.74378C9.2689 3.21461 8.7276 2.75279 8.36673 3.14887Z"
        fill="white"
      />
    </svg>
  );

  const { STATUS_AWAITING_PAYMENT, STATUS_AWAITING_PICKUP } = TrackingService;

  const isAvailableInsuranceEdit = [STATUS_AWAITING_PAYMENT, STATUS_AWAITING_PICKUP].includes(
    shippingOrder.shippingStatus,
  );

  return (
    <div>
      {shippingOrder.oceanInsurance && (
        <Row
          label={
            <>
              <FormattedMessage id="trackingPage.label.shippingCoverage" />
              {isAvailableInsuranceEdit && (
                <>
                  {' '}
                  (
                  <ButtonLink
                    label={<FormattedMessage id="shared.cta.edit" />}
                    onClick={() => setShippingCoverageModalOpen(true)}
                  />
                  )
                </>
              )}
            </>
          }
          value={
            <div className={classes.yes}>
              <strong>
                <FormattedMessage id="sellYourCarPage.keysOptions.yes" />
              </strong>

              {successCheckmark}
            </div>
          }
          condition
          className={classes.row}
        />
      )}

      {shippingOrder.wireConfirmation && (
        <Row
          label={<FormattedMessage id="shared.label.wireConfirmation" />}
          value={
            <div className={classes.yes}>
              <strong>
                <FormattedMessage id="sellYourCarPage.keysOptions.yes" />
              </strong>

              {successCheckmark}
            </div>
          }
          condition
          className={classes.row}
        />
      )}

      {shippingOrder.bosCount > 0 && (
        <Row
          label={<FormattedMessage id="shared.label.billOfSale" />}
          value={
            <div className={classes.yes}>
              <strong>
                <FormattedMessage id="sellYourCarPage.keysOptions.yes" />
              </strong>

              {successCheckmark}
            </div>
          }
          condition
          className={classes.row}
        />
      )}

      {shippingOrder.billOfLading && (
        <Row
          label={<FormattedMessage id="trackingPage.label.billOfLading" />}
          value={
            <div className={classes.additionalDocuments}>
              <div style={{ paddingRight: 3 }}>
                <ButtonLink
                  className={classes.cta}
                  label={<FormattedMessage id="shared.cta.download" />}
                  onClick={() => {
                    Object.assign(document.createElement('a'), {
                      target: '_blank',
                      href: shippingOrder.billOfLading.s3_url,
                    }).click();
                  }}
                />
              </div>
              <TooltipOnHover
                content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.additionalDocuments" />}
                badgeTop={-3}
              />
            </div>
          }
          condition
          className={classes.row}
        />
      )}

      {documents.length > 0 && (
        <Row
          label={<FormattedMessage id="shared.label.additionalDocuments" />}
          value={
            <div className={classes.additionalDocuments}>
              <div style={{ paddingRight: 3 }}>
                {documents.map((item) => (
                  <ButtonLink
                    key={item.url}
                    className={classes.cta}
                    label={item.name}
                    onClick={() => {
                      Object.assign(document.createElement('a'), {
                        target: '_blank',
                        href: item.url,
                      }).click();
                    }}
                  />
                ))}
              </div>
              <TooltipOnHover
                content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.additionalDocuments" />}
                badgeTop={-3}
              />
            </div>
          }
          condition
          className={classes.row}
        />
      )}
      <ShippingCoverageModalLazy
        title={<FormattedMessage id="trackingPage.label.shippingCoverage" />}
        isOpen={isShippingCoverageModalOpen}
        onClose={() => setShippingCoverageModalOpen(false)}
        shippingOrder={shippingOrder}
      />
    </div>
  );
}

DownloadDocuments.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
};

export default DownloadDocuments;
