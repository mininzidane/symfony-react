/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import QuestionLink from '../QuestionLink';
import QuestionMarkSvg from './img/question-mark.svg';

function HelpCenterLink() {
  function handleTrackClick() {
    const ga = new GoogleAnalyticsService();
    ga.sendEvent('header_question', 'click', 'shcb');
  }

  return (
    <QuestionLink
      href={RouterService.getRoute('helpCenter', null, true)}
      onClick={handleTrackClick}
      label={
        <>
          <img src={QuestionMarkSvg} alt="help center" />
          <span style={{ textTransform: 'uppercase' }}>
            <FormattedMessage id="header.needHelp.searchOurHelpCenter" />
          </span>
        </>
      }
    />
  );
}

export default HelpCenterLink;
