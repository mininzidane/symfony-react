import React from 'react';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import ExplanationContent from '../Content';

function ExplanationTooltip() {
  const isExplanationBlockClosed = LocalStorageService.get('is_shipping_explanation_closed');

  if (!isExplanationBlockClosed) {
    return null;
  }

  return <TooltipOnHover maxWidth={420} badgeTop={-2} isFlipEnabled={false} content={<ExplanationContent />} />;
}

export default ExplanationTooltip;
