import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import TransactionsSvg from 'frontend/images/shared/light-blue-set/ic_transactions.svg';
import TabsToolbar from './TabsToolbar';
import useStyles from './useStyles';

function CaptionPanelSection() {
  const classes = useStyles();

  return (
    <CaptionPanel
      label={<FormattedMessage id="shared.label.buyerPower" />}
      footer={<TabsToolbar />}
      icon={TransactionsSvg}
      iconSize={{ width: 24, height: 15 }}
      contentClassName={classes.toolbarTitle}
    />
  );
}

export default CaptionPanelSection;
