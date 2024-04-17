import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useQuery } from 'react-query';
import get from 'lodash/get';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import RouterService from 'frontend/js/api/RouterService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import BidService from 'frontend/js/api/BidService';
import ButtonCross from 'frontend/js/components/ButtonCross';
import VideoGuidesService from 'frontend/js/api/VideoGuidesService';
import { useNotifications } from 'frontend/js/providers/NotificationsProvider';
import { isOnPage } from 'frontend/js/router/utils';
import SPA_CONFIG from 'frontend/js/router/config';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';
import WatchButton from './WatchButton';
import RegisterPng from './img/register.png';
import SearchPng from './img/search.png';
import DepositPng from './img/deposit.png';
import UploadIdPng from './img/upload_id.png';
import BiddingPng from './img/bidding.png';
import WinningBidPng from './img/winning_bid.png';
import ShippingPng from './img/shipping.png';

const imagesMap = {
  register: RegisterPng,
  search: SearchPng,
  deposit: DepositPng,
  upload_id: UploadIdPng,
  bidding: BiddingPng,
  winning_bid: WinningBidPng,
  shipping: ShippingPng,
};

const staticKeys = {
  bidding: 'videoGuidesNotification.title.bidding',
  deposit: 'videoGuidesNotification.title.deposit',
  register: 'videoGuidesNotification.title.register',
  search: 'videoGuidesNotification.title.search',
  shipping: 'videoGuidesNotification.title.shipping',
  upload_id: 'videoGuidesNotification.title.upload_id',
  winning_bid: 'videoGuidesNotification.title.winning_bid',
};

function VideoGuideNotification() {
  if (window.isSimpleLayout) {
    return null;
  }

  const { isAuthenticated } = useCustomerHelper(window.customer);
  const { isAboveXs, isBelowXs } = useBreakpoint();
  const [isRevealed, setIsRevealed] = useState(false);
  const classes = useStyles();
  const closedNotificationsKey = 'Abm::VideoNotificationsClosed';
  const disabledNotificationsKey = 'Abm::VideoNotificationsDisabled';
  const closedNotifications = LocalStorageService.get(closedNotificationsKey) || [];
  const disabledNotifications = LocalStorageService.get(disabledNotificationsKey) || [];
  let suitableTopic;

  function disableNotification(keyToDisable) {
    LocalStorageService.set(disabledNotificationsKey, [...disabledNotifications, keyToDisable]);
  }

  // All pages
  let topic = 'register';
  if (!disabledNotifications.includes(topic)) {
    if (isAuthenticated) {
      disableNotification(topic);
    } else {
      suitableTopic = topic;
    }
  }

  // Search page
  if (!suitableTopic && isOnPage(SPA_CONFIG.SEARCH)) {
    topic = 'search';

    if (!disabledNotifications.includes(topic)) {
      suitableTopic = topic;
    }
  }

  let bidStatus = null;
  if (window.isSPAEnv) {
    const [{ notificationsData }] = useNotifications();
    const { bidStatus: bidStatusFromContext } = notificationsData;
    bidStatus = bidStatusFromContext;
  }

  // Lot page
  if (!suitableTopic && isAuthenticated && RouterService.test('lot')) {
    const { customer } = window;
    const { userDocUploadDisabled, identityDocumentCount } = customer;
    const isIDUploaded = userDocUploadDisabled || identityDocumentCount > 0;
    const isWon = bidStatus === BidService.STATUS_YOU_WON;
    const isHighBidder = bidStatus === BidService.STATUS_HIGH_BIDDER;
    const isZeroDeposit = parseInt(customer.balance, 10) === 0;

    topic = 'deposit';
    if (!disabledNotifications.includes(topic) && isZeroDeposit) {
      suitableTopic = topic;
    }

    topic = 'upload_id';
    if (!suitableTopic && !disabledNotifications.includes(topic) && !isIDUploaded) {
      suitableTopic = topic;
    }

    topic = 'bidding';
    if (!suitableTopic && !disabledNotifications.includes(topic) && !isWon && !isHighBidder) {
      suitableTopic = topic;
    }

    topic = 'winning_bid';
    if (!suitableTopic && !disabledNotifications.includes(topic) && !isWon && isHighBidder) {
      suitableTopic = topic;
    }

    topic = 'shipping';
    if (!suitableTopic && !disabledNotifications.includes(topic) && isWon) {
      suitableTopic = topic;
    }
  }

  const { data } = useQuery(
    ['video-guide-by-key', suitableTopic],
    () => VideoGuidesService.getVideoGuideByKey(suitableTopic),
    { enabled: !!suitableTopic },
  );
  const isVideoGuideAvailable = Boolean(get(data, 'guideVideo', null));
  const href = RouterService.getRoute('videoGuides', { topic: suitableTopic });
  const isCloseButtonVisible = closedNotifications.includes(suitableTopic);

  function handleDisable() {
    setIsRevealed(false);

    setTimeout(() => {
      LocalStorageService.set(disabledNotificationsKey, Object.keys(imagesMap));
    }, 500);
  }

  function handleClose() {
    setIsRevealed(false);

    setTimeout(() => {
      if (!isCloseButtonVisible) {
        LocalStorageService.set(closedNotificationsKey, [...closedNotifications, suitableTopic]);
      }
    }, 500);
  }

  const DontShowAgainButton = () =>
    isCloseButtonVisible ? (
      <button type="button" className={classes.dontShowCta} onClick={handleDisable}>
        <FormattedMessage id="videoGuidesNotification.dontShowAgain" />
      </button>
    ) : null;

  function reveal() {
    const NOTIFICATION_REVEAL_TIMEOUT = 5000;

    setTimeout(() => {
      setIsRevealed(true);
    }, NOTIFICATION_REVEAL_TIMEOUT);
  }

  function revealDelayed() {
    const key = 'Abm::VisitDurationSeconds';
    const visitDurationSeconds = parseInt(LocalStorageService.get(key) || 0, 10);

    function checkVisitDuration(duration) {
      setTimeout(() => {
        if (duration < 55) {
          const nextVisitDurationSeconds = duration + 1;
          LocalStorageService.set(key, nextVisitDurationSeconds);
          checkVisitDuration(nextVisitDurationSeconds);
        } else {
          reveal();
        }
      }, 1000);
    }

    checkVisitDuration(visitDurationSeconds);
  }

  useEffect(() => {
    if (suitableTopic) {
      if (suitableTopic === 'register') {
        revealDelayed();
      } else {
        reveal();
      }
    }
  }, [suitableTopic]);

  if (!isVideoGuideAvailable) {
    return null;
  }

  return (
    <div className={classnames(classes.root, 'NOTIFICATION', 'customer-notification', { 'is-revealed': isRevealed })}>
      <ButtonCross size={10} isThin color="white" className={classes.closeButton} onClick={handleClose} />

      <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleDisable} className="d-b">
        <img src={imagesMap[suitableTopic]} alt="Video Preview" className="d-b" />
      </a>

      <div>
        <a href={href} target="_blank" className={classes.title} rel="noopener noreferrer" onClick={handleDisable}>
          <FormattedMessage id={staticKeys[suitableTopic] || suitableTopic} />
        </a>

        {isAboveXs && (
          <div className={classnames(classes.ctaContainer, { 'has-single-cta': !isCloseButtonVisible })}>
            <WatchButton onClick={handleDisable} href={href} />
            <DontShowAgainButton />
          </div>
        )}
      </div>

      {isBelowXs && (
        <div className={classes.mobileCtaContainer}>
          <WatchButton onClick={handleDisable} href={href} />
          <DontShowAgainButton />
        </div>
      )}
    </div>
  );
}

export default VideoGuideNotification;
