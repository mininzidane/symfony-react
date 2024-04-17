import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import useStyles from './useStyles';

function Content({ close, token, vehicle }) {
  const intl = useIntl();
  const classes = useStyles();

  const { shippingOrder } = useLotWonContext();

  function handleOrderCancellation() {
    close();
    shippingOrder.removeShippingOrder(token);
  }

  return (
    <>
      <div className={classes.body}>
        <FormattedMessage
          id="lotsWonPage.youAreAboutToCancelDeliveryFor"
          values={{
            br: <br className="xs-hide" />,
            strong: () => <span className={classes.textBlack}>{vehicle}</span>,
            vehicle,
          }}
        />
      </div>
      <div className={classes.footer}>
        <Button
          label={intl.formatMessage({ id: 'shared.cta.cancelOrder' })}
          className={classes.cta}
          onClick={handleOrderCancellation}
          size="sm"
        />
        <ButtonOutlined
          label={intl.formatMessage({ id: 'shared.cta.goBack' })}
          className={classes.cta}
          onClick={close}
          size="sm"
        />
      </div>
    </>
  );
}

Content.propTypes = {
  close: PropTypes.func.isRequired,
  token: PropTypes.string,
  vehicle: PropTypes.string,
};

Content.defaultProps = {
  token: '',
  vehicle: '',
};

export default Content;
