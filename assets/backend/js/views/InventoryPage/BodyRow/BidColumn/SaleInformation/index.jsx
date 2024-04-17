import React from 'react';
import IBox from 'backend/js/components/IBox';
import ButtonLink from 'backend/js/components/ButtonLink';
import LocationModal from 'backend/js/views/_Shared/Modals/LocationModal';
import SaleDateTimer from 'backend/js/views/_Shared/InventoryDetails/SaleDateTimer';
import SaleDate from 'backend/js/views/_Shared/InventoryDetails/SaleDate';
import useModal from 'backend/js/hooks/useModal';
import useInventoryPageContext from '../../../_Context/useInventoryPageContext';

function BidInformation() {
  const { inventoryItem } = useInventoryPageContext();
  const { isModalOpen, toggleModal } = useModal();
  const {
    inventoryAuction,
    saleStartAt,
    location,
    item,
    lane,
    gridRow,
    sold,
    saleDateTimeLeft,
    prebiddingClosed,
    auctionInProgress,
  } = inventoryItem;

  const hasTimeLeft = !sold && saleDateTimeLeft && saleDateTimeLeft.invert === 0;

  return (
    <IBox title="Sale Information" contentClassName="no-padding">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th scope="row">Location</th>
            <td>
              <ButtonLink label={location.name} onClick={() => toggleModal(true)} />
            </td>
          </tr>
          <tr>
            <th>Sale Date+Time</th>
            <td>
              <SaleDate saleStartAt={saleStartAt} />
            </td>
          </tr>
          {Boolean(item) && (
            <tr>
              <th scope="row">Lane/Item/Row</th>
              <td>
                Lane {lane}, Item# {item}, Row {gridRow}
              </td>
            </tr>
          )}
          {!sold && (
            <tr>
              <th>Time left</th>
              <td>
                {hasTimeLeft && <SaleDateTimer saleStartAt={saleStartAt} />}
                {!hasTimeLeft && Boolean(prebiddingClosed || auctionInProgress) && (
                  <>
                    <i className="fa fa-gavel" /> <em>Live auction</em>
                  </>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <LocationModal
        sourceId={location.id}
        auction={inventoryAuction}
        isModalOpen={isModalOpen}
        onModalClose={() => toggleModal(false)}
      />
    </IBox>
  );
}

export default BidInformation;
