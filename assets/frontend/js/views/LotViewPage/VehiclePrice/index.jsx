import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import NumberService from 'frontend/js/lib/utils/NumberService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import LotPageBlock from '../LotPageBlock';
import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import InventoryTooltip from './InventoryTooltip';
import useStyles from './useStyles';

function VehiclePrice({ lot, onBuyItNowClick }) {
  const classes = useStyles();
  const intl = useIntl();

  const { buyItNow, currency, currencySymbol, saleLocation } = lot;

  return (
    <LotPageBlock>
      <Card title={intl.formatMessage({ id: 'lotPage.vehiclePrice.title' })}>
        <CardIndentedContent className={classes.root}>
          <div className={classes.card}>
            <div className={classes.price}>
              <span className={classes.priceWrap}>
                <strong>
                  {currencySymbol}
                  {NumberService.formatNumber(parseFloat(buyItNow || 0, 10))}
                </strong>{' '}
                {currency}
              </span>
              <InventoryTooltip saleLocation={saleLocation} />
            </div>
            <Button
              label={intl.formatMessage({ id: 'shared.cta.buyItNow' })}
              color="green"
              size="md"
              onClick={() => onBuyItNowClick()}
              isNowrap
            />
          </div>
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

VehiclePrice.propTypes = {
  lot: LotShape.isRequired,
  onBuyItNowClick: PropTypes.func.isRequired,
};

export default VehiclePrice;
