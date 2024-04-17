import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'backend/js/api/RouterService';
import LotService from 'backend/js/api/LotService';
import ABMLogo from 'backend/js/views/_Shared/Micro/LotDescription/img/abmLogo.png';
import VIN from 'backend/js/views/_Shared/Micro/LotDescription/VIN';
import TooltipOnHover from 'backend/js/components/TooltipOnHover';
import Gallery from 'backend/js/views/_Shared/Gallery';
import CopyButton from 'backend/js/components/CopyButton';
import VehicleDetailsModal from 'backend/js/views/_Shared/Modals/VehicleDetailsModal';
import useModal from 'backend/js/hooks/useModal';
import ReactQueryProvider from 'backend/js/providers/ReactQueryProvider';

function VehicleDetails({ inventoryItem }) {
  const { isModalOpen, toggleModal } = useModal();

  function handleClickOpenLotDetails(e) {
    e.preventDefault();
    toggleModal(true);
  }

  return (
    <>
      <a
        href={RouterService.getRoute('inventoryEdit', '', { stockNumber: inventoryItem.stockNumber })}
        target="_blank"
        rel="noreferrer"
      >
        {inventoryItem.year} {inventoryItem.make} {inventoryItem.model} {inventoryItem.trim}
      </a>
      <span className="d-f ai-ct" style={{ lineHeight: 1 }}>
        <button onClick={handleClickOpenLotDetails} type="button" className="btn btn-xs btn-primary">
          {inventoryItem.stockNumber}
        </button>
        <ReactQueryProvider>
          <VehicleDetailsModal
            isModalOpen={isModalOpen}
            onModalClose={() => toggleModal(false)}
            idOrVin={inventoryItem.vin}
          />
        </ReactQueryProvider>
        <CopyButton value={inventoryItem.stockNumber.toString()} />
        <a
          className="ml-5"
          href={RouterService.getRoute('lotSlugPage', null, {
            id: inventoryItem.stockNumber,
            slug: LotService.AUCTION_ABM,
          })}
          target="_blank"
          rel="noreferrer"
        >
          <img src={ABMLogo} alt="ABM Logo" width="16px" height="16px" />
        </a>
        {inventoryItem.images?.large?.length > 0 && (
          <TooltipOnHover
            placement="right"
            style={{
              width: 660,
              maxWidth: 660,
            }}
            TransitionProps={{
              mountOnEnter: true,
              unmountOnExit: true,
            }}
            trigger={
              <span className="ml-5 d-f ai-ct">
                <i className="fa fa-camera" style={{ fontSize: '16px' }} />
                <span className="ml-5">+{inventoryItem.images.large.length}</span>
              </span>
            }
            content={<Gallery images={inventoryItem.images.large} title={inventoryItem.description} />}
          />
        )}
      </span>
      <VIN lot={inventoryItem} />
      {inventoryItem.title}
      <br />
      {inventoryItem.condition}
      <br />
    </>
  );
}

VehicleDetails.propTypes = {
  inventoryItem: PropTypes.object.isRequired,
};

export default VehicleDetails;
