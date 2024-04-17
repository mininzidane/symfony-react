import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Container from 'frontend/js/components/Container';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import Button from 'frontend/js/components/Button';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useEventListener from 'frontend/js/hooks/useEventListener';
import DecoratorService from 'frontend/js/lib/utils/DecoratorService';
import useStyles from './useStyles';

function MobileFooter({ currency, estDelivery, price }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const classes = useStyles({ isRevealed });
  const placeOrderCardId = 'place-order-card';
  const headerHeight = 52;
  const footerHeight = 52;

  const throttledUpdateState = useCallback(
    DecoratorService.throttle(() => {
      const $el = document.getElementById(placeOrderCardId);
      if ($el) {
        setIsRevealed(!ViewportService.isPartiallyInViewport($el, headerHeight, footerHeight));
      }
    }, 150),
    [],
  );

  function handleClick() {
    ScrollService.scrollIntoViewById(placeOrderCardId, headerHeight + 14, 'smooth');
  }

  useEventListener('scroll', throttledUpdateState);

  useEffect(throttledUpdateState, []);

  return (
    <Container className={classnames(classes.root, { 'is-revealed': isRevealed })}>
      <div>
        <div className={classes.title}>
          <FormattedMessage id="shared.label.quote" />
          &nbsp;
          <span>({currency})</span>
        </div>
        <div className={classes.delivery}>
          <FormattedMessage id="shared.label.estSailingTime" /> {estDelivery}
        </div>
      </div>

      <div className={classes.valueSection}>
        <div className={classes.price}>{NumberService.formatCurrency(price, currency)}</div>
        <Button label={<FormattedMessage id="shared.cta.orderNow" />} onClick={handleClick} size="sm" />
      </div>
    </Container>
  );
}

MobileFooter.propTypes = {
  currency: PropTypes.string,
  estDelivery: PropTypes.string,
  price: PropTypes.number,
};

MobileFooter.defaultProps = {
  currency: 'USD',
  estDelivery: '',
  price: null,
};

export default MobileFooter;
