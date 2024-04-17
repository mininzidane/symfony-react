import React from 'react';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import useIntl from 'frontend/js/hooks/useIntl';
import JoinAuctionButton from 'frontend/js/views/Shared/JoinAuctionButton';
import CardIndentedContent from '../../../LotPageCard/CardIndentedContent';
import useStyles from './useStyles';

function LiveState({ lot }) {
  const intl = useIntl();
  const classes = useStyles();

  const translationSets = {
    ctaAuction: intl.formatMessage({
      id: 'shared.cta.joinAuction',
      defaultMessage: 'Join Live Auction Now',
    }),
  };

  return (
    <div className={classes.root}>
      <CardIndentedContent>
        <JoinAuctionButton lot={lot} color="green" label={translationSets.ctaAuction} />
      </CardIndentedContent>
    </div>
  );
}

LiveState.propTypes = {
  lot: LotShape.isRequired,
};

export default LiveState;
