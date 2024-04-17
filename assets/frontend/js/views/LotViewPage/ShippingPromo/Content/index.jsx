/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import useLoadPreorder from 'frontend/js/hooks/useLoadPreorder';
import ShippingTo from 'frontend/js/views/Shared/Shipping//ShippingTo';
import useLoadShippingQuote from 'frontend/js/views/Shared/Shipping/useLoadShippingQuote';
import SyncDefaultShippingInfo from 'frontend/js/views/Shared/Shipping/SyncDefaultShippingInfo';
import { SHIPPING_WIDGET_ID } from 'frontend/js/views/LotViewPage/ShippingPromo/Content/constants';
import Card from '../../LotPageCard';
import CardIndentedContent from '../../LotPageCard/CardIndentedContent';
import QuoteDetails from './QuoteDetails';
import ExplanationBlock from './Explanation/Block';
import ExplanationTooltip from './Explanation/Tooltip';
import useStyles from './useStyles';

function Content({ lot }) {
  const classes = useStyles();
  const {
    shippingQuote,
    updateShippingInformation,
    updateShippingQuote,
    updateFromShippingOrder,
    isDomestic,
    isBorderCrossing,
  } = useContext(ShippingQuoteContext);

  const { preorder, loading: preorderLoading, hasPreorder } = useLoadPreorder(lot.id, lot.inventoryAuction);
  const isLoading = useLoadShippingQuote(lot);
  const domesticSettings = isDomestic() || isBorderCrossing();

  function handleFormSubmit(values) {
    updateShippingQuote(null);
    updateShippingInformation(values);
  }

  useEffect(() => {
    if (preorder) {
      updateFromShippingOrder(preorder);
    }
  }, [preorder]);

  return (
    <>
      {!hasPreorder && !preorderLoading && <SyncDefaultShippingInfo lot={lot} />}

      <Card
        title={
          <div className={classes.title}>
            {domesticSettings ? (
              <FormattedMessage id="shipping.domesticShipping" />
            ) : (
              <FormattedMessage id="shipping.internationalShipping" />
            )}
            <ExplanationTooltip />
          </div>
        }
        className={classes.root}
        id={SHIPPING_WIDGET_ID}
      >
        <ExplanationBlock />
        <CardIndentedContent
          className={classnames(classes.content, domesticSettings && classes.domestic, {
            'is-custom-quote': !shippingQuote,
          })}
        >
          <div className={classes.wrap}>
            <div className={classes.shippingTo}>
              <FormattedMessage id="shared.label.shippingTo" />:{' '}
              <ShippingTo onChange={handleFormSubmit} triggerClassName={classes.trigger} />
            </div>

            {isLoading ? (
              <SpinnerWheel className="d-b mt-10" color="gray" thickness={2} size={30} />
            ) : (
              <QuoteDetails lot={lot} />
            )}
          </div>
        </CardIndentedContent>
      </Card>
    </>
  );
}

export default Content;
