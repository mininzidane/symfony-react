/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ButtonLink from 'frontend/js/components/ButtonLink';
import Auction from '../Auction';

function Auctions({ auctions, label, classes, ...props }) {
  const [showMore, setShowMore] = useState(false);
  const displayLimit = 3;
  const auctionList = useMemo(
    () => (showMore || auctions.length === displayLimit + 1 ? auctions : auctions.slice(0, displayLimit)),
    [auctions, showMore, displayLimit],
  );

  const count = auctions.length - auctionList.length;

  return (
    <div className={classes.auctions}>
      <div className={classes.country}>{label}</div>
      {auctionList.map((auction, index) => (
        <Auction key={index} data={auction} classes={classes} {...props} />
      ))}
      {(showMore || count > 0) && (
        <div className={classes.more}>
          <ButtonLink
            isDashed
            onClick={() => setShowMore(!showMore)}
            label={
              <FormattedMessage
                id={showMore ? 'shared.cta.showLess' : 'auctionsCalendar.cta.showMore'}
                values={{ count }}
              />
            }
          />
        </div>
      )}
    </div>
  );
}

export default Auctions;
