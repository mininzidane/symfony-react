/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import Amount from 'frontend/js/components/Amount';
import Container from 'frontend/js/components/Container';
import BidStatusLabel from 'frontend/js/components/BidStatusLabel';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function Footer({ lot }) {
  const classes = useStyles();
  const { getRoute } = RouterService;
  const { currentBid, currentCustomerBid, bidStatus, id, slug, searchHash } = lot || {};
  const href = getRoute(
    'lot',
    {
      searchHash,
    },
    false,
    { id, slug },
  );

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.info}>
          <div>
            {typeof currentBid === 'number' && (
              <>
                <FormattedMessage id="shared.label.currentBid" />: <Amount value={currentBid} />
              </>
            )}
          </div>

          <BidStatusLabel bidStatus={bidStatus} />
        </div>

        <div>
          {typeof currentCustomerBid?.maxBid === 'number' && (
            <>
              <FormattedMessage id="shared.label.maxBid" />: <Amount value={currentCustomerBid?.maxBid} />
            </>
          )}
        </div>

        <Button
          href={href}
          size="sm"
          color="blue"
          label={<FormattedMessage id={currentCustomerBid ? 'shared.cta.increaseBid' : 'shared.cta.bidNow'} />}
        />
      </div>
    </Container>
  );
}

export default Footer;
