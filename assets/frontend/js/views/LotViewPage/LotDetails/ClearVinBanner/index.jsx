/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import ButtonLink from 'frontend/js/components/ButtonLink';
import ClearVinButton from 'frontend/js/views/Shared/ClearVinButton';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CallToAction from './CallToAction';
import useStyles from './useStyles';

function ClearVinBanner({ className, lot }) {
  const CTA_ID = 'lot-details-clearvin-cta';
  const { isAuthenticated } = useCustomerHelper();
  const [isCopied, setIsCopied] = useState(false);
  const { vin, vinHash, id } = lot;
  const isMaskedVin = vin?.includes('*');

  const clearvinUrlParams = {
    utm_source: 'abm_site',
    utm_medium: 'abm_cross_sell',
    utm_campaign: 'lot_page_square',
  };

  if (vinHash) {
    clearvinUrlParams.lotNumber = id;
  } else {
    clearvinUrlParams.vin = vin;
  }

  const classes = useStyles();

  if (!lot.showClearVinBadge) {
    return (
      <div className={classnames(classes.placeholder, className)}>
        <span>
          <FormattedMessage id="shared.label.vin" />:
        </span>{' '}
        <strong>{vin}</strong>
      </div>
    );
  }

  function handleVinClick() {
    document.getElementById('lot-details-clearvin-cta').click();
  }

  function handleCopyClick() {
    navigator.clipboard.writeText(vin);
    setIsCopied(true);
  }

  function handleCopyTooltipClose() {
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  }

  function handleUnAuthClick() {
    window.dispatchEvent(new CustomEvent('openAuthModal'));
  }

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.vinWrap}>
        <div className={classes.vinLabel}>
          <FormattedMessage id="shared.label.vin" />:
        </div>

        <div className={classes.vinComponent}>
          {vin && !isMaskedVin && (
            <TooltipOnHover
              placement="top"
              className={classes.copiedTooltip}
              maxWidth={100}
              offset={10}
              isFlipEnabled={false}
              color="black"
              padding="6px 12px"
              classNa
              hasArrow
              isBounceAnimation
              onClose={handleCopyTooltipClose}
              disablePortal={false}
              triggerProps={{
                onClick: handleCopyClick,
              }}
              triggerClassName={classes.copyButton}
              trigger={
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.8421 0H1.26316C0.568421 0 0 0.552783 0 1.22841V9.82725H1.26316V1.22841H8.8421V0ZM8.21058 2.45734H3.78953C3.09479 2.45734 2.53268 3.01013 2.53268 3.68575L2.52637 12.2846C2.52637 12.9602 3.08847 13.513 3.78321 13.513H10.7369C11.4316 13.513 12.0001 12.9602 12.0001 12.2846V6.14256L8.21058 2.45734ZM3.78955 3.68504V12.2839H10.7369V6.75605H7.57902V3.68504H3.78955Z"
                  />
                </svg>
              }
              content={<FormattedMessage id={isCopied ? 'shared.label.copied' : 'shared.cta.copyToClipboard'} />}
            />
          )}

          {isAuthenticated ? (
            <>
              <ButtonLink isDashed label={vin} className={classes.vin} onClick={handleVinClick} />
            </>
          ) : (
            <ButtonLink label={vin} onClick={handleUnAuthClick} className={classes.vin} />
          )}
        </div>
      </div>

      <div className={classes.button}>
        {isAuthenticated ? (
          <ClearVinButton
            lot={lot}
            component={(props) => {
              if (props.creditsCount) {
                return (
                  <CallToAction
                    {...props}
                    id={CTA_ID}
                    className={classnames(lot.sold && 'js-track-event')}
                    data-step="abm_lotpage"
                    data-substep="cv_button_widget_sold_lot_page_clicked"
                  />
                );
              }

              return (
                <CallToAction
                  {...props}
                  id={CTA_ID}
                  className="js-track-event"
                  {...(lot.sold
                    ? {
                        'data-step': 'abm_lotpage',
                        'data-substep': 'cv_button_widget_sold_lot_page_clicked',
                      }
                    : {
                        'data-step': 'abm_lotpage',
                        'data-substep': 'get_history_report_button_click',
                      })}
                />
              );
            }}
          />
        ) : (
          <CallToAction onClick={handleUnAuthClick} />
        )}
      </div>
    </div>
  );
}

ClearVinBanner.propTypes = {
  className: PropTypes.string,
  lot: PropTypes.shape({}),
};

ClearVinBanner.defaultProps = {
  className: '',
  lot: {},
};

export default ClearVinBanner;
