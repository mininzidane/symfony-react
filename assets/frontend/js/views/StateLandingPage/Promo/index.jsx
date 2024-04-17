import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import useStyles from './useStyles';
import RouterService from '../../../api/RouterService';
import Button from '../../../components/Button';
import PromoBgPng from './img/promo-bg.png';

function Promo() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${PromoBgPng})` }}>
      <div className={classes.content}>
        <div className={classes.title}>
          <FormattedMessage id="stateLandingPage.promo.bid_on_all_copart_auction_across_the_u_s_and_canada" />
        </div>
        <Button
          label={intl.formatMessage({ id: 'stateLandingPage.promo.sign_up_now' })}
          href={RouterService.getRoute('register')}
          color="yellow"
          size="lg"
          isInline
        />
      </div>
    </div>
  );
}

export default Promo;
