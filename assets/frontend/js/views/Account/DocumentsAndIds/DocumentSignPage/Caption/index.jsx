import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import BreadcrumbsPanel from 'frontend/js/views/Shared/PageSections/BreadcrumbsPanel';

function Caption() {
  const crumbs = [
    { label: <FormattedMessage id="documentsPage.caption" />, href: RouterService.getRoute('documents') },
    { label: <FormattedMessage id="documentSignPage.crumb" /> },
  ];

  return <BreadcrumbsPanel crumbs={crumbs} />;
}

export default Caption;
