/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import Timer from 'frontend/js/components/Timer';
import HighlightMatch from 'frontend/js/components/HighlightMatch';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import AuctionService from 'frontend/js/api/AuctionService';
import RouterService from 'frontend/js/api/RouterService';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';

function Auction({ data, colors, query, auction, entryButton: EntryButton }) {
  const classes = useStyles();
  const intl = useIntl();
  const { isAboveSm, isBelowSm } = useBreakpoint();

  return (
    <div className={classes.root} style={{ backgroundColor: colors.background }}>
      <div className={classes.header}>
        <div className={classes.firstBlock}>
          <div className={classes.time}>{DateTimeService.toLocaleTime(new Date(data.time.stamp * 1000))}</div>
          <div className={classes.timer} style={{ color: colors.timer }}>
            <Timer
              date={new Date(data.time.stamp * 1000)}
              formatCountdown={(v) => intl.formatMessage({ id: 'todayAuctions.timer.startsIn' }, { value: v })}
              formatCountup={(v) => intl.formatMessage({ id: 'todayAuctions.timer.startedAgo' }, { value: v })}
            />
          </div>
          {isBelowSm && (
            <div className="wide">
              <HighlightMatch className={classes.location} value={data.location.name} match={query} />
            </div>
          )}
        </div>
        <div className={classes.description}>
          <HighlightMatch className={classes.location} value={data.location.name} match={query} component="div" />
        </div>
        <div className={classes.viewAllItems}>
          <a
            href={RouterService.getRoute('searchResultsAuctionDate', null, false, {
              slug: data.location.slug,
              date: DateTimeService.format(
                DateTimeService.parseDateInLocalTimezone(new Date(data.time.stamp * 1000)),
                'yyyyMMdd',
              ),
            })}
          >
            {isAboveSm ? (
              <FormattedMessage id="todayAuctions.viewAllItems" values={{ count: data.totalItems }} />
            ) : (
              <FormattedMessage id="todayAuctions.view" />
            )}
          </a>
          <div className="svg-icon ml-10" style={{ width: 7.4, height: 12 }}>
            <svg viewBox="0 0 7.4 12">
              <path
                d="M8.6,7.4,10,6l6,6-6,6L8.6,16.6,13.2,12Z"
                transform="translate(-8.6 -6)"
                fill="#055a98"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={classes.subheader} style={{ backgroundColor: colors.subheader }}>
        <div>
          <FormattedMessage id="todayAuctions.items" />
        </div>
        <div>
          <FormattedMessage id="todayAuctions.lane" />
        </div>
      </div>
      <div className={classes.entries}>
        {data.lanes.map((item) => (
          <div key={item.lane} className={classes.entry}>
            <div>
              <a
                href={RouterService.getRoute(
                  auction === AuctionService.AUCTION_DE ? 'joinAuctionsGermany' : 'joinAuctions',
                  { id: data.location.id, lane: item.lane },
                )}
              >
                {item.items}
              </a>
            </div>
            <div>{item.lane}</div>
            {item.saleHighlights && <div className={classes.saleHighlights}>{item.saleHighlights}</div>}
            <div className="ml-a">
              <EntryButton
                href={RouterService.getRoute(
                  auction === AuctionService.AUCTION_DE ? 'joinAuctionsGermany' : 'joinAuctions',
                  { id: data.location.id, lane: item.lane },
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Auction;
