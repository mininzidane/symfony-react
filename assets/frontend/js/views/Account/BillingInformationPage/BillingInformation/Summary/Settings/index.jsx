import React, { useState } from 'react';
import { set, get } from 'lodash';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import CreditCardsService from 'frontend/js/api/CreditCardsService';
import Card from 'frontend/js/components/Card';
import Switch from 'frontend/js/components/Form/Switch';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useBillingInformationContext from '../../../_Context/useBillingInformationContext';
import useStyles from './useStyles';

function Settings() {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const { autochargeServices } = useCustomerHelper();
  const [isChecked, setIsChecked] = useState(autochargeServices);
  const { paymentCards } = useBillingInformationContext();
  const { creditCards } = paymentCards;

  async function handleToggle() {
    setIsChecked(!isChecked);
    try {
      const data = await CreditCardsService.autochargeService({ autocharge_services: !isChecked });
      const isEnabled = get(data, 'member.meta.autocharge_services');
      set(window, 'customer.metaInformation.autocharge_services', isEnabled);
      enqueueSnackbar(
        intl.formatMessage({
          id: isEnabled
            ? 'billingInformationPage.settings.autochargeServices.enabled'
            : 'billingInformationPage.settings.autochargeServices.disabled',
        }),
        { variant: 'success' },
      );
    } catch (e) {
      setIsChecked(isChecked);
      enqueueSnackbar(intl.formatMessage({ id: 'form.error.general' }), { variant: 'error' });
    }
  }

  const isCreditCards = creditCards && creditCards.length > 0;

  if (!isCreditCards) {
    return null;
  }

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>{intl.formatMessage({ id: 'shared.label.settings' })}</h2>
      <Card elevation={2} className={classes.card}>
        <div className={classes.desc}>
          {intl.formatMessage({ id: 'billingInformationPage.settings.automaticallyCharge' })}
          <TooltipOnHover
            content={intl.formatMessage({ id: 'billingInformationPage.settings.bySelectingYesTheCreditCard' })}
          />
        </div>
        <div className={classes.switch}>
          <Switch isChecked={isChecked} onChange={handleToggle} />
        </div>
      </Card>
    </div>
  );
}

export default Settings;
