import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import DocumentsIdSvg from 'frontend/images/shared/light-blue-set/ic_documents_id.svg';

function Caption() {
  return (
    <CaptionPanel
      label={<FormattedMessage id="documentsPage.caption" />}
      iconSize={{ width: 18, height: 15 }}
      icon={DocumentsIdSvg}
    />
  );
}

export default Caption;
