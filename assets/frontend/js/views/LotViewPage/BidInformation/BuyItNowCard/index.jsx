import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import NumberService from 'frontend/js/lib/utils/NumberService';
import Card from '../../LotPageCard';
import CardIndentedContent from '../../LotPageCard/CardIndentedContent';
import useStyles from './useStyles';

function BuyItNowCard({ lot, isContactUs, onMakeAnOffer, onBuyItNow }) {
  const classes = useStyles();
  const { buyItNow, makeAnOffer, currency, currencySymbol } = lot;
  const { getLocalizedHcRoute } = RouterService;
  const intl = useIntl();
  if (!buyItNow) {
    return null;
  }

  const translationSets = {
    ctaMakeAnOffer: intl.formatMessage({
      id: 'shared.cta.makeAnOffer',
      defaultMessage: 'Make offer',
    }),
    ctaBuyItNow: intl.formatMessage({
      id: 'shared.cta.buyItNow',
      defaultMessage: 'Buy It Now',
    }),
    ctaContactUs: intl.formatMessage({
      id: 'shared.cta.contactUsToBid',
      defaultMessage: 'Contact Us to Place a Bid',
    }),
    buyItNowTooltipContent: intl.formatMessage(
      {
        id: 'lotPage.buyItNow.tooltipContent',
        defaultMessage:
          'Buy It Now allows you to purchase the vehicle immediately at a set price before the lot goes to live auction. Upon clicking the button, you will be taken to a confirmation page to confirm your Buy It Now bid. Once confirmed, you will be directed to pay for the vehicle.',
      },
      {
        b: (chunks) => <b>{chunks}</b>,
        br: <br />,
      },
    ),
    wantItNow: intl.formatMessage({ id: 'lotPage.label.wantItNow' }),
    BINPrice: intl.formatMessage({ id: 'lotPage.label.BINPrice' }),
  };

  return (
    <Card
      title={
        <div className={classes.title}>
          <div>{translationSets.wantItNow}</div>
          <TooltipOnHover badgeTop={-1} content={translationSets.buyItNowTooltipContent} placement="bottom-end" />
        </div>
      }
    >
      <CardIndentedContent className={classes.root}>
        <div className={classes.description}>
          <div>{translationSets.BINPrice}:</div>
          <div className={classes.price}>
            <strong>
              {currencySymbol}
              {NumberService.formatNumber(parseFloat(buyItNow, 10))}
            </strong>{' '}
            {currency}
          </div>
        </div>
        <div className={classes.actions}>
          {makeAnOffer > 0 && (
            <>
              {isContactUs ? (
                <ButtonOutlined
                  className={classes.btn}
                  href={getLocalizedHcRoute('hcSubmitRequest')}
                  label={translationSets.ctaContactUs}
                  isBackgroundWhite
                />
              ) : (
                <ButtonOutlined
                  className={classes.btn}
                  label={translationSets.ctaMakeAnOffer}
                  onClick={onMakeAnOffer}
                  isBackgroundWhite
                />
              )}
            </>
          )}
          {isContactUs ? (
            <Button
              className={classes.btn}
              href={getLocalizedHcRoute('hcSubmitRequest')}
              label={translationSets.ctaContactUs}
              color="blue-dark"
              isNowrap
            />
          ) : (
            <Button
              className={classes.btn}
              label={translationSets.ctaBuyItNow}
              color="green"
              onClick={onBuyItNow}
              isNowrap
            />
          )}
        </div>
      </CardIndentedContent>
    </Card>
  );
}

BuyItNowCard.propTypes = {
  lot: LotShape.isRequired,
  isContactUs: PropTypes.bool,
  onMakeAnOffer: PropTypes.func,
  onBuyItNow: PropTypes.func,
};

BuyItNowCard.defaultProps = {
  isContactUs: false,
  onMakeAnOffer: () => null,
  onBuyItNow: () => null,
};

export default BuyItNowCard;
