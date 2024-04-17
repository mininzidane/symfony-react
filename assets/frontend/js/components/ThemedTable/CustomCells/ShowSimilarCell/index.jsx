/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';

const ShowSimilarCellStyles = { align: 'right', style: { padding: '12px 14px 12px 8px', verticalAlign: 'middle' } };

function ShowSimilarCell({ lot }) {
  const href = RouterService.getRoute('searchResults', {
    q: `${lot.year} ${lot.make} ${lot.modelGroup}`,
  });

  return (
    <Button
      href={href}
      size="sm"
      color="blue"
      label={<FormattedMessage id="shared.cta.showSimilarVehicles" />}
      isCapitalize
    />
  );
}

export { ShowSimilarCell, ShowSimilarCellStyles };
