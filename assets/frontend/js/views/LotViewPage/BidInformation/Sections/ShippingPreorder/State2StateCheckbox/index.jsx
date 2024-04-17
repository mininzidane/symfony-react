import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function State2StateCheckbox({ isChecked, onChange }) {
  function handleChange(_, value) {
    onChange(value);
  }

  return (
    <Tickbox
      onChange={handleChange}
      value={isChecked}
      className="bid-information__home-delivery-checkbox"
      name="home-delivery-only"
      id="home-delivery-only"
    >
      <>
        <FormattedMessage id="shipping.homeDeliveryOnly" />
        <TooltipOnHover
          content={
            <div>
              <FormattedMessage id="shipping.homeDeliveryOnly.tooltip" />
            </div>
          }
          maxWidth={380}
          placement="bottom-end"
          isFlipEnabled={false}
        />
      </>
    </Tickbox>
  );
}

State2StateCheckbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default State2StateCheckbox;
