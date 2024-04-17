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
  const { currentBid, bidStatus } = lot || {};
  const similarVehiclesHref = getRoute('searchResults', {
    q: `${lot.year} ${lot.make} ${lot.modelGroup}`,
  });

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.info}>
          <div>
            {currentBid && (
              <>
                <FormattedMessage id="shared.label.currentBid" />: <Amount value={currentBid} />
              </>
            )}
          </div>

          <BidStatusLabel bidStatus={bidStatus} />
        </div>

        <Button
          href={similarVehiclesHref}
          size="sm"
          color="blue"
          label={<FormattedMessage id="shared.cta.showSimilarVehicles" />}
          isCapitalize
        />
      </div>
    </Container>
  );
}

export default Footer;
