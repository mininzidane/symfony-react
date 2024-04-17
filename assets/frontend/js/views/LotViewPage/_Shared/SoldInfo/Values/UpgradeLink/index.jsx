import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';

function UpgradeLink() {
  return (
    <div>
      <FormattedMessage
        id="lotPage.upgradeToView"
        values={{ a: (chunks) => <Link href={RouterService.getRoute('membershipPlans')}>{chunks}</Link> }}
      />
    </div>
  );
}

export default UpgradeLink;
