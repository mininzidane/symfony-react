import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import classnames from 'classnames';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useIntl from 'frontend/js/hooks/useIntl';
import CustomerService from 'frontend/js/api/CustomerService';
import get from 'lodash/get';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function Actions({ className, termsVersion }) {
  const intl = useIntl();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { setCustomer } = useCustomerHelper();

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const data = await CustomerService.acceptTerms({ version: termsVersion });
      const response = await CustomerService.getCustomer();
      const customer = get(response, 'customer');
      if (customer) {
        setCustomer(customer);
      }

      const redirect = RouterService.getQueryParam('redirect');
      RouterService.customRedirect(redirect || data.redirect || RouterService.getRoute('dashboard'));
    } catch {
      enqueueSnackbar(intl.formatMessage({ id: 'form.error.general' }), { variant: 'error' });
    }
    setIsLoading(false);
  }

  return (
    <div className={classnames(classes.root, className)}>
      <ButtonOutlined
        className={classes.btn}
        color="blue"
        size="lg"
        isBackgroundWhite
        label={intl.formatMessage({ id: 'shared.cta.cancel' })}
        isInline
        href={RouterService.getRoute('logout')}
        isDisabled={isLoading}
      />
      <Button
        className={classes.btn}
        color="yellow"
        label={intl.formatMessage({ id: 'shared.cta.continue' })}
        size="lg"
        isInline
        onClick={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

Actions.propTypes = {
  className: PropTypes.string,
  termsVersion: PropTypes.string,
};

Actions.defaultProps = {
  className: '',
  termsVersion: '',
};

export default Actions;
