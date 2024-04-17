/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import DividedLine from 'frontend/js/components/DividedLine';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';
import Offsite from './Offsite';
import Sublot from './Sublot';
import SaleLocation from './SaleLocation';
import SaleDate from './SaleDate';
import CopartSelectWhiteSvg from './img/copart-select-white.svg';
import CopartSelectBlackSvg from './img/copart-select-black.svg';
import AbmInventoryVehicleSvg from './img/abm-inventory-vehicle.svg';

function Headline({ lot, seo, isAuthenticated, locale, isSelect, isAbmInventory, isNpaInventory }) {
  const { description, lane, item, saleDate, saleStartAt, subLotInfo } = lot;
  const classes = useStyles({ isSelect, isAbmInventory, isNpaInventory });
  const intl = useIntl();
  const { isBelowXs, isAboveXs } = useBreakpoint();

  const hasLaneAndItem = Boolean(lane) && Boolean(item);
  const hasGridRow = Boolean(lot.gridRow);
  const hasLaneOrGrid = hasLaneAndItem || hasGridRow;

  const translationSets = {
    lotId: intl.formatMessage({ id: 'shared.label.lotId' }),
    saleLocation: intl.formatMessage({ id: 'shared.label.saleLocation' }),
    headTextEnding: intl.formatMessage({ id: 'shared.label.headTextEnding' }),
    headTextEndingUS: 'for Sale',
  };

  let headline = get(seo, 'pageTitle', '');
  if (!headline) {
    headline = isAuthenticated
      ? description
      : `${description} ${locale === 'en-us' ? translationSets.headTextEndingUS : translationSets.headTextEnding}`;
  }

  return (
    <div className={classes.root}>
      <div className={classes.headline}>
        <div className={classes.headlineWrap}>
          <h1 className={classes.headlineText}>
            {headline}
            {lot.copartSelect && (
              <div className={classes.copartSelect}>
                <div />
                <img src={isSelect ? CopartSelectWhiteSvg : CopartSelectBlackSvg} alt="Select" />
              </div>
            )}
            {isAbmInventory && (
              <div className={classes.abmInventoryIcon}>
                <div />
                <img src={AbmInventoryVehicleSvg} alt="Select" />
                <strong>
                  <FormattedMessage id="shared.label.carsInStock" />
                </strong>
              </div>
            )}
          </h1>

          <DividedLine
            dividerClassName={classnames(
              classes.divider,
              isSelect && 'is-select',
              isAbmInventory && 'is-abm-inventory',
              isNpaInventory && 'is-npa-inventory',
            )}
            className={classnames(
              classes.info,
              isSelect && 'is-select',
              isAbmInventory && 'is-abm-inventory',
              isNpaInventory && 'is-npa-inventory',
            )}
          >
            <div className={classes.lotId}>
              <span>{translationSets.lotId}</span> <strong className={classes.value}>{lot.id}</strong>
            </div>

            {isBelowXs && !isEmpty(get(lot, 'offsite.pickup')) && (
              <div className={classes.offsite}>
                <Offsite offsite={get(lot, 'offsite.pickup')} />
              </div>
            )}

            {isBelowXs && !isEmpty(subLotInfo) && (
              <div className={classes.sublot}>
                <Sublot subLotInfo={subLotInfo} />
              </div>
            )}

            <div>
              {translationSets.saleLocation}
              &nbsp;
              <SaleLocation lot={lot} />
            </div>

            {hasLaneOrGrid && (
              <div>
                {hasLaneAndItem && `${lane}/${item}`}
                {hasLaneAndItem && hasGridRow && '/'}
                {hasGridRow && `${lot.gridRow}`}
              </div>
            )}

            {isAboveXs && !isEmpty(get(lot, 'offsite.pickup')) && (
              <div className={classes.offsite}>
                <Offsite offsite={get(lot, 'offsite.pickup')} />
              </div>
            )}

            {isAboveXs && !isEmpty(subLotInfo) && (
              <div className={classes.sublot}>
                <Sublot subLotInfo={subLotInfo} />
              </div>
            )}

            {!isAbmInventory && Boolean(saleStartAt || !saleDate) && <SaleDate lot={lot} />}
          </DividedLine>
        </div>
      </div>
    </div>
  );
}

Headline.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  lot: LotShape,
  seo: PropTypes.object,
  locale: PropTypes.string.isRequired,
};

Headline.defaultProps = {
  lot: null,
  seo: {},
};

export default Headline;
