/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import { ClickAwayListener } from '@material-ui/core';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import RouterService from 'frontend/js/api/RouterService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import ZendeskTrigger from 'frontend/js/views/Support/ZendeskTrigger';
import OrSeparator from './OrSeparator';
import QuestionLink from './QuestionLink';
import QuestionIsNotHere from './QuestionIsNotHere';
import HelpCenterLink from './HelpCenterLink';
import CallOrTextUs from './CallOrTextUs';
import ArrowSvg from './img/arrow.svg';
import useStyles from './useStyles';

function HelpForm() {
  const classes = useStyles();
  const [isMounted, setIsMounted] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [step, setStep] = useState(1);
  const { isAuthenticated, blAmount, currentBidsCount, wonBidsCount, due } = useCustomerHelper();
  const { isBelowSm } = useBreakpoint();
  const ga = new GoogleAnalyticsService();
  const triggerRef = useRef();

  function handleMouseOver() {
    if (!isMounted) {
      setIsMounted(true);
    }
  }

  function handleClick() {
    ga.sendEvent('header_question', 'click', 'nhb');

    if (!isBelowSm) {
      return;
    }

    setIsShown(!isShown);
  }

  function handleClickAway(e) {
    if (!isBelowSm) {
      return;
    }

    if (e.target !== triggerRef.current) {
      setIsShown(false);
    }
  }

  function handleNotHereClick() {
    setStep(step + 1);
  }

  function handleBackClick() {
    setStep(step - 1);
  }

  function getMembershipStatus() {
    if (!isAuthenticated) {
      return 'ms_1';
    }

    if (wonBidsCount) {
      return due > 0 ? 'ms_5' : 'ms_6';
    }

    if (currentBidsCount) {
      return 'ms_4';
    }

    if (blAmount) {
      return 'ms_3';
    }

    return 'ms_2';
  }

  function handleTrackClick(id) {
    ga.sendEvent('header_question', 'click', id);
  }

  const memberStatus = getMembershipStatus();

  const question1Map = {
    ms_1: {
      label: <FormattedMessage id="header.needHelp.link.howDoesAuctionWork" />,
      href: RouterService.getRoute('howToBuy'),
    },
    ms_2: {
      label: <FormattedMessage id="header.needHelp.link.howDoesAuctionWork" />,
      href: RouterService.getRoute('howToBuy'),
    },
    ms_3: {
      label: <FormattedMessage id="header.needHelp.link.iWantToRefundSecurityDeposit" />,
      href: RouterService.getLocalizedHcRoute('hcIsMySecurityDepositRefundable'),
    },
    ms_4: {
      label: <FormattedMessage id="header.needHelp.link.itDoesNotLetMePlaceBid" />,
      href: RouterService.getLocalizedHcRoute('hcCantPlaceBid'),
    },
    ms_5: {
      label: <FormattedMessage id="header.needHelp.link.whenWillIGetMyTitle" />,
      href: RouterService.getLocalizedHcRoute('hcWhenWillIReceiveMyOwnershipDocument'),
    },
    ms_6: {
      label: <FormattedMessage id="header.needHelp.link.whenWillYouShip" />,
      href: RouterService.getLocalizedHcRoute('hcWhenIsMyCarGettingDelivered'),
    },
  };

  const question2Map = {
    ms_1: {
      label: <FormattedMessage id="header.needHelp.link.feesMembershipsDeposit" />,
      href: RouterService.getLocalizedHcRoute('hcFeesMembershipsDeposit'),
    },
    ms_2: {
      label: <FormattedMessage id="header.needHelp.link.feesMembershipsDeposit" />,
      href: RouterService.getLocalizedHcRoute('hcFeesMembershipsDeposit'),
    },
    ms_3: {
      label: <FormattedMessage id="header.needHelp.link.iWantToIncreaseMySecurityDeposit" />,
      href: RouterService.getLocalizedHcRoute('hcHowToIncreaseSecurityDeposit'),
    },
    ms_4: {
      label: <FormattedMessage id="header.needHelp.link.iWantToIncreaseMySecurityDeposit" />,
      href: RouterService.getLocalizedHcRoute('hcHowToIncreaseSecurityDeposit'),
    },
    ms_5: {
      label: <FormattedMessage id="header.needHelp.link.didYouReceiveMyPayment" />,
      href: RouterService.getLocalizedHcRoute('hcHowLongWillItTakeToReceiveMyPayment'),
    },
    ms_6: {
      label: <FormattedMessage id="header.needHelp.link.iWantToRefundSecurityDeposit" />,
      href: RouterService.getLocalizedHcRoute('hcIsMySecurityDepositRefundable'),
    },
  };

  return (
    <div className={classes.root}>
      <button
        className={classnames(classes.toggle, isShown && 'is-shown')}
        type="button"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        id="need-help-toggle"
        ref={triggerRef}
      >
        <svg
          className={classes.questionMark}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.87111 11.9991C8.16367 12.0101 8.44939 11.908 8.66868 11.7141H8.67293C8.77279 11.614 8.85191 11.4953 8.90585 11.3646C8.9598 11.234 8.98758 11.0939 8.98739 10.9526C8.99433 10.8113 8.9707 10.6702 8.91834 10.5389C8.86597 10.4075 8.78603 10.2888 8.68382 10.1911C8.4648 9.99738 8.17976 9.89537 7.88758 9.9061C7.60149 9.8987 7.32324 10.0006 7.10967 10.1911C6.91339 10.396 6.80397 10.6688 6.80397 10.9526C6.80397 11.2363 6.91339 11.5092 7.10967 11.7141C7.21113 11.8101 7.33078 11.8847 7.46157 11.9337C7.59236 11.9826 7.73158 12.0049 7.87111 11.9991ZM10.0914 7.17557C10.2542 6.96675 10.3884 6.73697 10.4898 6.49241L10.4909 6.49673C10.6138 6.17163 10.6731 5.82601 10.6659 5.47852C10.6731 5.19503 10.6173 4.91345 10.5023 4.6542C10.3874 4.39495 10.216 4.16452 10.0011 3.97947C9.49935 3.58777 8.87233 3.39206 8.23683 3.42897C7.76804 3.4172 7.30021 3.48113 6.85178 3.61827C6.48659 3.72812 6.14095 3.8944 5.82713 4.11107L5.69434 4.20575L6.43427 5.60906L6.60504 5.5003C6.69605 5.42221 6.79818 5.35837 6.90835 5.311C7.02329 5.24925 7.14392 5.19858 7.26849 5.15975C7.39266 5.1193 7.51966 5.0877 7.64828 5.06513C7.76091 5.04311 7.87512 5.03041 7.98983 5.02709C8.10021 5.0128 8.21233 5.02048 8.3197 5.0498C8.42706 5.07911 8.5275 5.12947 8.6153 5.19786C8.67611 5.26385 8.72269 5.34168 8.75208 5.42647C8.78146 5.51126 8.79301 5.60119 8.78607 5.69066C8.79331 5.83775 8.7555 5.98349 8.67745 6.10837C8.57423 6.24411 8.45975 6.37109 8.33563 6.48803C8.23304 6.59321 8.11409 6.69841 7.98413 6.81334C7.9501 6.84343 7.91532 6.8742 7.87988 6.9058C7.69751 7.0669 7.53791 7.25206 7.40553 7.45623C7.26257 7.69402 7.15299 7.95023 7.07939 8.21775C7.02281 8.43424 6.9971 8.65764 7.00316 8.88132C7.00036 9.00815 7.00637 9.13502 7.02149 9.26098L7.04114 9.43175H8.63044V9.24252C8.61492 9.00716 8.66072 8.77173 8.76323 8.55929C8.85019 8.37792 8.96546 8.21157 9.10478 8.06649C9.25273 7.93377 9.40833 7.80109 9.57912 7.66837C9.76794 7.52394 9.93977 7.35862 10.0914 7.17557Z"
          />
          <circle cx="8" cy="8" r="7.33333" stroke="white" strokeWidth="1.33333" />
        </svg>

        <span className={classes.label}>
          <FormattedMessage id="checkoutIntlShippingPage.label.getHelp" />
        </span>

        <svg
          className={classes.triangle}
          width="8"
          height="4"
          viewBox="0 0 8 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L4.00083 4L8 1.39876e-06L0 0Z" fill="white" />
        </svg>
      </button>

      {isMounted && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={classnames(classes.dropdownContainer, isShown && 'is-shown')}>
            <div className={classes.containerInner}>
              <header className={classes.header}>
                <button
                  type="button"
                  className={classnames(classes.backButton, step === 1 && 'is-hidden')}
                  onClick={handleBackClick}
                >
                  <img src={ArrowSvg} alt="Arrow" />
                </button>
                <span className={classes.title}>
                  {step < 2 ? (
                    <FormattedMessage id="header.needHelp.pleaseSelectYourQuestion" />
                  ) : (
                    <FormattedMessage id="header.needHelp.viewTheAnswers" />
                  )}
                </span>
              </header>

              {step === 1 && (
                <section className={classes.section}>
                  <QuestionLink
                    label={question1Map[memberStatus].label}
                    href={question1Map[memberStatus].href}
                    onClick={() => handleTrackClick('hcb_1')}
                  />
                  <QuestionLink
                    label={question2Map[memberStatus].label}
                    href={question2Map[memberStatus].href}
                    onClick={() => handleTrackClick('hcb_2')}
                  />
                  <OrSeparator />
                  <ZendeskTrigger className={classes.zendeskTrigger} />
                  <QuestionIsNotHere onClick={handleNotHereClick} />
                </section>
              )}

              {step === 2 && (
                <section className={classes.section}>
                  <HelpCenterLink />
                  <CallOrTextUs />
                </section>
              )}
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default HelpForm;
