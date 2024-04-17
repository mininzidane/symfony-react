/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import ButtonLink from 'frontend/js/components/ButtonLink';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import CustomerShape from 'frontend/js/lib/propshapes/CustomerShape';
import BidResponseShape from 'frontend/js/lib/propshapes/BidResponseShape';
import LotService from 'frontend/js/api/LotService';
import BidService from 'frontend/js/api/BidService';
import CardIndentedContent from '../../../LotPageCard/CardIndentedContent';
import NotificationCard from '../../NotificationCard';
import useStyles from './useStyles';

function ServerResponseState({ customer, serverResponse, onCancel, customQuoteSent, inventoryAuction }) {
  if (!serverResponse || !customer) {
    return null;
  }

  const { email } = customer;
  const {
    title,
    message,
    result,
    ctaBlock = false,
    buttonLabel,
    buttonUrl,
    reload = false,
    payNow,
    isRenderMessage = false,
  } = serverResponse;
  const isSuccess = result === LotStatusStates.SUBMIT_STATE_SUCCESS;
  const isError = result === LotStatusStates.SUBMIT_STATE_ERROR;
  const notificationState = isSuccess || isError ? result : LotStatusStates.SUBMIT_STATE_WARNING;
  const cancelColor = isError ? '#C5E7FF' : '#2158F5';
  const messageMarkup = {
    __html: message,
  };
  const intl = useIntl();
  const classes = useStyles();

  const translationSets = {
    ctaCancel: intl.formatMessage({
      id: 'shared.cta.cancel',
      defaultMessage: 'Cancel',
    }),
    ctaReload: intl.formatMessage({
      id: 'shared.cta.reload',
      defaultMessage: 'Reload',
    }),
    customQuoteSentMessage: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.customQuoteSentMessage',
      },
      {
        email,
      },
    ),
  };

  function handleReload() {
    window.location.reload();
  }

  const content = (
    <>
      {isRenderMessage ? <div>{message}</div> : <div dangerouslySetInnerHTML={messageMarkup} />}

      {customQuoteSent && <div className="mt-15">{translationSets.customQuoteSentMessage}</div>}

      {!ctaBlock && buttonLabel && buttonUrl && (
        <Button href={buttonUrl} label={buttonLabel} className="wide mt-15 mb-5" />
      )}

      {reload && (
        <ButtonLink
          onClick={handleReload}
          label={translationSets.ctaReload}
          style={{ color: cancelColor, marginTop: '24px' }}
          className="ta-c ttu"
        />
      )}
    </>
  );

  const isAbmInventory = inventoryAuction === LotService.AUCTION_ABM;
  let style = { paddingBottom: 0 };
  if (serverResponse && serverResponse.bidStatus === BidService.STATUS_YOU_WON && isAbmInventory) {
    style = { padding: 14 };
  }

  return (
    <>
      <NotificationCard title={title} content={content} state={notificationState} style={style} payNow={payNow} />
      {ctaBlock === true && (
        <CardIndentedContent>
          <CardIndentedContent className={classes.card}>
            <div className={classes.actions}>
              {result !== 'success' && (
                <ButtonOutlined
                  className={classes.btn}
                  onClick={onCancel}
                  label={translationSets.ctaCancel}
                  isBackgroundWhite
                />
              )}
              {buttonLabel && buttonUrl && <Button href={buttonUrl} label={buttonLabel} className={classes.btn} />}
            </div>
          </CardIndentedContent>
        </CardIndentedContent>
      )}
    </>
  );
}

ServerResponseState.propTypes = {
  customer: CustomerShape,
  serverResponse: BidResponseShape,
  onCancel: PropTypes.func,
  customQuoteSent: PropTypes.bool,
  inventoryAuction: PropTypes.string,
};

ServerResponseState.defaultProps = {
  customer: null,
  serverResponse: undefined,
  onCancel: () => null,
  customQuoteSent: false,
  inventoryAuction: '',
};

export default ServerResponseState;
