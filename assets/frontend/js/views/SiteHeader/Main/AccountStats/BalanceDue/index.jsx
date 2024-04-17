import React from 'react';
import { useQuery } from 'react-query';
import BootstrapApiService from 'frontend/js/api/BootstrapApiService';
import Link from 'frontend/js/components/Link';
import Amount from 'frontend/js/components/Amount';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import AlertSvg from './img/alert.svg';
import useStyles from './useStyles';

function BalanceDue() {
  const classes = useStyles();
  const { due, isAuthenticated } = useCustomerHelper();
  const { isAboveLg } = useBreakpoint();

  const { data } = useQuery(['customer-bootstrap'], () => BootstrapApiService.getCustomerBootstrapByApi());
  const { invoicesDueCount, lastUnpaidInvoicePath } = data || {};

  if (!isAuthenticated || parseFloat(due) === 0) {
    return null;
  }

  return (
    <Link
      href={invoicesDueCount === 1 ? lastUnpaidInvoicePath : RouterService.getRoute('purchases')}
      className={classes.root}
    >
      <img width={24} height={24} src={AlertSvg} alt="alert" />

      {isAboveLg && (
        <div>
          <div className={classes.title}>
            <FormattedMessage id="shared.label.balanceDue" />
          </div>
          <div className={classes.value}>
            <Amount value={parseFloat(due)} hasCents />
          </div>
        </div>
      )}
    </Link>
  );
}

BalanceDue.propTypes = {};

export default BalanceDue;
