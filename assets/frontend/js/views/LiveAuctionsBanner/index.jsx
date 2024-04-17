import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import TranslationProvider from 'frontend/js/providers/TranslationProvider';
import { FormattedMessage } from 'react-intl-phraseapp';
import BootstrapService from 'frontend/js/api/BootstrapService';
import Container from 'frontend/js/components/Container';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function LiveAuctionsBanner() {
  const classes = useStyles();
  const liveAuctionCount = BootstrapService.getAppValue('liveAuctionCount', '');

  if (!liveAuctionCount) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.message}>
          <Link routeParams={['joinAuctions']} className={classes.link}>
            <span>
              <FormattedMessage id="homePage.liveAuctionsBanner.title" values={{ count: liveAuctionCount }} /> –{' '}
              <FormattedMessage id="shared.cta.joinNowExclamation" />
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}

const $el = document.getElementById('live-auctions-banner');

if ($el) {
  ReactDOM.render(
    <ThemeProvider>
      <TranslationProvider>
        <LiveAuctionsBanner />
      </TranslationProvider>
    </ThemeProvider>,
    $el,
  );
}

export default LiveAuctionsBanner;
