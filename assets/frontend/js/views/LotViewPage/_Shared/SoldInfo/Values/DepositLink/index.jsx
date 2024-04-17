import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';

function DepositLink() {
  return (
    <div>
      <FormattedMessage
        id="lotPage.addDepositToView"
        values={{ a: (chunks) => <Link href={RouterService.getRoute('buyerPower')}>{chunks}</Link> }}
      />
    </div>
  );
}

export default DepositLink;
