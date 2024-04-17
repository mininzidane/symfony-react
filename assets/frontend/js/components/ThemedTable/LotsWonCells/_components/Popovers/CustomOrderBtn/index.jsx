import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CustomQuoteForm from 'frontend/js/views/Shared/CustomQuoteForm';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ContentPopover from 'frontend/js/components/ContentPopover';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import useStyles from './useStyles';

function CustomOrderBtn({ className, lot, ...props }) {
  const classes = useStyles();

  const { updateShippingInformation, updateShippingQuote, getCustomQuoteParams } = useContext(ShippingQuoteContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const { shippingOrder } = useLotWonContext();

  function handleFormSubmit(values) {
    updateShippingQuote(null);
    updateShippingInformation(values, false);
    setIsSubmit(true);
  }

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(false);
      const payload = getCustomQuoteParams(lot);
      shippingOrder.submitCustomShippingQuote(payload);
    }
  }, [isSubmit]);

  return (
    <div className={className}>
      <ContentPopover
        trigger={
          <ButtonOutlined
            label={<FormattedMessage id="shared.cta.requestQuote" />}
            size="sm"
            isTargetBlank
            isThinBorder
            isNowrap
            {...props}
          />
        }
        popoverTitle={<FormattedMessage id="lotPage.shipping.customQuote.tooltip.title" />}
        popoverClass=""
        popoverOptions={{ placement: 'bottom' }}
      >
        {({ close }) => (
          <>
            <div className={classes.description}>
              <FormattedMessage id="lotPage.shipping.customQuote.tooltip.description" />
            </div>
            <CustomQuoteForm
              onSubmit={(values) => {
                handleFormSubmit(values);
                close();
              }}
            />
          </>
        )}
      </ContentPopover>
    </div>
  );
}

CustomOrderBtn.propTypes = {
  lot: PropTypes.object.isRequired,
  className: PropTypes.string,
};

CustomOrderBtn.defaultProps = {
  className: '',
};

export default CustomOrderBtn;
