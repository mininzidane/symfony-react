/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useIntl from 'frontend/js/hooks/useIntl';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import ClearVinButton from 'frontend/js/views/Shared/ClearVinButton';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import LotPageBlock from '../LotPageBlock';
import Properties from './Properties';
import Title from './Title';
import useClearVinDetails from './useClearVinDetails';
import useStyles from './useStyles';

const TWO_COL_BREAKPOINT = 1365;
const EXTRA_LG_BREAKPOINT = 1550;

const FAKE_DATA = { auctionSales: 1, recalls: 0, additionalPhotos: 10 };

function ClearVinDetails({ lotId, lot, auction, loader }) {
  if (!lot || !lot?.showClearVinBadge || lot.FAKE) {
    return null;
  }

  const CTA_ID = 'clear-vin-details-cta';
  const classes = useStyles();
  const intl = useIntl();
  const isNarrowThreeColLayout = useMediaQuery((theme) =>
    theme.breakpoints.between(TWO_COL_BREAKPOINT, EXTRA_LG_BREAKPOINT),
  );
  const { isAuthenticated } = useCustomerHelper();
  // eslint-disable-next-line prefer-const
  let { clearVinData, loading } = useClearVinDetails(
    (lot && lot.id) || lotId,
    (lot && lot.inventoryAuction) || auction,
    loader,
  );

  const placeholder = loading || loader;
  if (placeholder) {
    clearVinData = FAKE_DATA;
  }

  if (!clearVinData) {
    return null;
  }

  const translationSets = {
    getFullHistoryReport: intl.formatMessage({ id: 'lotPage.clearvinPromo.getFullHistoryReport' }),
    getFreeFullReports: intl.formatMessage({ id: 'lotPage.clearvinPromo.getFreeFullReports' }),
  };

  const { auctionSales = 1 } = clearVinData || {};
  const auctionSalesCount = auctionSales > 0 ? auctionSales - 1 : 0;
  const hasAuctionSales = auctionSalesCount > 0;

  function handleUnAuthClick() {
    window.dispatchEvent(new CustomEvent('openAuthModal'));
  }

  return (
    <LotPageBlock>
      <Card
        title={<Title />}
        className={classnames(classes.root, placeholder && classes.placeholder)}
        classes={{
          title: classes.title,
        }}
      >
        <CardIndentedContent>
          <Properties
            className={classes.properties}
            clearVinData={clearVinData}
            hasAuctionSales={hasAuctionSales}
            auctionSalesCount={auctionSalesCount}
          />
          <div className={classes.cta}>
            {!isAuthenticated ? (
              <ButtonOutlined
                label={translationSets.getFullHistoryReport}
                id={CTA_ID}
                className="js-track-event"
                isTargetBlank
                isNofollow
                data-step="abm_lotpage"
                data-substep="get_full_history_report_banner_button_click"
                isBackgroundWhite
                onClick={handleUnAuthClick}
              />
            ) : (
              <ClearVinButton
                lot={lot}
                component={({ creditsCount, ...props }) => (
                  <ButtonOutlined
                    {...props}
                    label={
                      creditsCount && !isNarrowThreeColLayout
                        ? `${translationSets.getFreeFullReports} (${creditsCount})`
                        : translationSets.getFullHistoryReport
                    }
                    id={CTA_ID}
                    className="js-track-event"
                    isTargetBlank
                    isNofollow
                    data-step="abm_lotpage"
                    data-substep="get_full_history_report_banner_button_click"
                    isBackgroundWhite
                  />
                )}
              />
            )}
          </div>
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

export default ClearVinDetails;
