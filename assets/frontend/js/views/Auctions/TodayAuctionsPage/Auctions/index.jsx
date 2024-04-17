import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import escapeRegExp from 'lodash/escapeRegExp';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import AuctionService from 'frontend/js/api/AuctionService';
import LiveAuction from './AuctionCard/LiveAuction';
import UpcomingAuction from './AuctionCard/UpcomingAuction';
import Caption from './Caption';
import useStyles from './useStyles';

function Auctions({ auctions, sort, query, auction }) {
  const classes = useStyles();
  function sortAndFilter(data) {
    return [...data]
      .sort((a, b) => {
        const valueA = sort.field === 'date' ? a.time.stamp : a.location.name;
        const valueB = sort.field === 'date' ? b.time.stamp : b.location.name;

        let comparison = 0;
        if (valueA < valueB) {
          comparison = -1;
        }
        if (valueA > valueB) {
          comparison = 1;
        }

        return sort.order === 'asc' ? comparison : -comparison;
      })
      .filter((item) => RegExp(escapeRegExp(query), 'i').test(item.location.name));
  }

  const noAuctions = !auctions.live.length && !auctions.upcoming.length;
  const liveAuctions = sortAndFilter(auctions.live);
  const upcomingAuctions = sortAndFilter(auctions.upcoming);
  const emptyFilterResults = !liveAuctions.length && !upcomingAuctions.length;

  const titleTranslationKey =
    auction === AuctionService.AUCTION_DE ? 'todayAuctions.todayCarAuctionsInGermany' : 'todayAuctions.liveAuctions';

  if (noAuctions) {
    return (
      <>
        <Caption
          label={
            <h1 className={classes.title}>
              <FormattedMessage id={titleTranslationKey} />
            </h1>
          }
          color="dust"
        />
        <div className="text-md">
          <FormattedMessage
            id="todayAuctions.noAuctions"
            values={{
              a: (chunks) => <a href={RouterService.getRoute('searchResults')}>{chunks}</a>,
            }}
          />
        </div>
      </>
    );
  }

  if (!noAuctions && emptyFilterResults) {
    return (
      <>
        <Caption
          label={
            <h1 className={classes.title}>
              <FormattedMessage id={titleTranslationKey} />
            </h1>
          }
          color="dust"
        />
        <div className="text-md">
          <FormattedMessage id="todayAuctions.noResults" />
        </div>
      </>
    );
  }

  if (!noAuctions && !emptyFilterResults) {
    return (
      <>
        {Boolean(liveAuctions.length) && (
          <Caption
            label={
              <h1 className={classes.title}>
                <FormattedMessage id={titleTranslationKey} />
              </h1>
            }
            color="green"
          />
        )}
        {liveAuctions.map((item) => (
          <LiveAuction key={item.location.name} query={query} data={item} auction={auction} />
        ))}

        {Boolean(upcomingAuctions.length) && (
          <Caption label={<FormattedMessage id="todayAuctions.upcomingAuctions" />} color="blue" />
        )}
        {upcomingAuctions.map((item) => (
          <UpcomingAuction key={item.location.name} query={query} data={item} auction={auction} />
        ))}
      </>
    );
  }
}

Auctions.defaultProps = {
  query: '',
};

Auctions.propTypes = {
  auctions: PropTypes.shape({
    live: PropTypes.arrayOf(PropTypes.shape({})),
    upcoming: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  query: PropTypes.string,
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  auction: PropTypes.string.isRequired,
};

export default Auctions;
