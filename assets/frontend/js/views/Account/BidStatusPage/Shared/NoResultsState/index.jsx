/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import Container from 'frontend/js/components/Container';
import RouterService from 'frontend/js/api/RouterService';
import GoogleAd from 'frontend/js/components/GoogleAd';
import LotsWonSvg from './img/ic_lots_won.svg';
import LotsLostSvg from './img/ic_lots_lost.svg';
import CurrenBidsSvg from './img/ic_current_bids.svg';
import ContainerSvg from './img/ic_container.svg';
import useStyles from './useStyles';

function NoResultsState({ type }) {
  const classes = useStyles();

  const iconsMap = {
    lotsWon: LotsWonSvg,
    lotsLost: LotsLostSvg,
    currentBids: CurrenBidsSvg,
    containers: ContainerSvg,
  };

  const titleTranslationMap = {
    lotsWon: 'bidStatusPage.youDontHaveLostWon',
    lotsLost: 'bidStatusPage.youDontHaveLostLots',
    currentBids: 'bidStatusPage.youDontHaveCurrentBids',
    containers: 'bidStatusPage.youDontHaveContainers',
  };

  return (
    <Container>
      <div className={classes.root}>
        <img src={iconsMap[type]} alt="Icon" />

        <h2 className={classes.title}>
          <FormattedMessage id={titleTranslationMap[type]} />
        </h2>

        <p className={classes.descriptions}>
          <FormattedMessage
            id="bidStatusPage.learnAboutBiddingOrFind"
            values={{
              linkFirst: (chunks) => <a href={RouterService.getLocalizedHcRoute()}>{chunks}</a>,
              linkSecond: (chunks) => <a href={RouterService.getRoute('searchResults')}>{chunks}</a>,
            }}
          />
        </p>

        <div>
          <Button
            href={RouterService.getRoute('searchResults')}
            label={<FormattedMessage id="shared.label.searchNow" />}
            className={classes.cta}
          />
        </div>
      </div>

      <GoogleAd
        id="div-gpt-ad-1665182489390-1"
        adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
        placement="current-bids-1"
        className="width-xl-728 spacer-xl-90 width-sm-300 mt-20 mb-20 sm-mb-10 sm-mt-10"
        withSlot
      />
    </Container>
  );
}

export default NoResultsState;
