import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import PhoneLink from 'frontend/js/components/PhoneLink';
import useOfficeData from 'frontend/js/hooks/useOfficeData';
import useEventListener from 'frontend/js/hooks/useEventListener';
import useStyles from './useStyles';

function MobileHeader({ ymm }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const classes = useStyles({ isRevealed });
  const { phoneNumber } = useOfficeData();

  const REVEAL_OFFSET = 100;

  useEventListener('scroll', () => {
    setIsRevealed(window.pageYOffset > REVEAL_OFFSET);
  });

  return (
    <Container className={classnames(classes.root, { 'is-revealed': isRevealed })}>
      <div>
        <div className={classes.title}>
          <FormattedMessage id="lotsWonPage.shippingOrder" />
        </div>
        <div className={classes.ymm}>{ymm}</div>
      </div>

      <div>
        <div className={classes.help}>
          <FormattedMessage id="checkoutIntlShippingPage.label.needHelp" />
        </div>
        <div className={classes.phone}>
          <PhoneLink phone={phoneNumber} />
        </div>
      </div>
    </Container>
  );
}

MobileHeader.propTypes = {
  ymm: PropTypes.string,
};

MobileHeader.defaultProps = {
  ymm: '',
};

export default MobileHeader;
