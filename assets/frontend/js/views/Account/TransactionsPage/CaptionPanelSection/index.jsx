import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import TransactionsSvg from 'frontend/images/shared/light-blue-set/ic_transactions.svg';
import TabsToolbar from './TabsToolbar';

function CaptionPanelSection() {
  return (
    <CaptionPanel
      label={<FormattedMessage id="shared.label.transactions" />}
      footer={<TabsToolbar />}
      icon={TransactionsSvg}
      iconSize={{ width: 24, height: 15 }}
    />
  );
}

export default CaptionPanelSection;
