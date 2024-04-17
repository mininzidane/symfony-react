/* eslint-disable react/prop-types */
import React from 'react';
import ClearVinButton from 'backend/js/views/_Shared/ClearVinButton';
import RouterService from 'backend/js/api/RouterService';
import CopyButton from 'backend/js/components/CopyButton';
import ButtonLink from 'backend/js/components/ButtonLink';

function Vehicle({ consignment }) {
  if (!consignment) {
    return null;
  }

  const { year, make, modal, oldCopartLot } = consignment;
  return (
    <>
      <div>
        {year} {make} {modal}
      </div>
      <div className="d-f">
        <ClearVinButton
          lotId={consignment.copartLot}
          component={({ onClick, ...props }) => (
            <div className="ws-n">
              <ButtonLink label={consignment.vin} onClick={onClick} {...props} />
            </div>
          )}
        />
        <CopyButton value={consignment.vin} />
      </div>
      {oldCopartLot && (
        <div>
          OLD LOT:{' '}
          <a href={RouterService.getRoute('lotPage', null, { id: oldCopartLot })} target="_blank" rel="noreferrer">
            {oldCopartLot}
          </a>
        </div>
      )}
    </>
  );
}

export default Vehicle;
