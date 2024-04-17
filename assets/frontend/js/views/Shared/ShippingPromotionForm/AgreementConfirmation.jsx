import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';

function AgreementConfirmation() {
  const intl = useIntl();

  return (
    <div className="text-xs bg-cream bdrs-sm" style={{ padding: '12px 12px 15px', marginTop: '17px' }}>
      {intl.formatMessage(
        {
          id: 'shippingPromo.preorderShippingDisclaimer',
        },
        {
          a: (chunks) => (
            <Link href={RouterService.getRoute('terms')} isTargetBlank isNoWrap>
              {chunks}
            </Link>
          ),
        },
      )}
    </div>
  );
}

export default AgreementConfirmation;
