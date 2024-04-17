import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import BaseApiService from 'backend/js/api/BaseApiService';
import CompleteSaleForm from './CompleteSaleForm';
import InstantOfferService from '../../../../api/InstantOfferService';
import Button from '../../../../components/Button';
import Amount from '../../../../../../frontend/js/components/Amount';
import useModal from 'backend/js/hooks/useModal';
import CopartNotesModal from 'backend/js/views/_Shared/Modals/CopartNotesModal';
import ButtonLink from 'backend/js/components/ButtonLink';

function InstantOfferStatus({ instantOffer, setInstantOffer, setInstantOfferChangeLogs, setModalContent }) {
  const { enqueueSnackbar } = useSnackbar();
  const { isModalOpen, toggleModal } = useModal();

  async function backToLeads(values) {
    try {
      const instantOfferService = new InstantOfferService();
      const response = await instantOfferService.backToLeads(values.ref, {});
      enqueueSnackbar('Offer was transferred to New Leads tab', { variant: 'success' });
      setInstantOffer(response.instantOffer);
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
    }
  }

  const enqueueSnackbarAdapter = (params) => {
    if (params.message) {
      enqueueSnackbar(params.message, { variant: params.type });
    }
  };

  return (
    <>
      {instantOffer.status}

      {instantOffer.activeConsignment && instantOffer.auctionLotStatus && (
        <div className="m-t">
          Copart status:{' '}
          <ButtonLink label={instantOffer.auctionLotStatus} onClick={() => toggleModal(true)} className="ta-l" />
          <CopartNotesModal
            id={instantOffer.activeConsignment.id}
            lotId={instantOffer.copartLot}
            status={instantOffer.auctionLotStatus}
            ymm={`${instantOffer.vehicleYear} ${instantOffer.vehicleMake} ${instantOffer.vehicleModel}`}
            isModalOpen={isModalOpen}
            onModalClose={() => toggleModal(false)}
          />
        </div>
      )}

      {instantOffer.status === InstantOfferService.STATUS.DECLINED_LEADS && (
        <>
          <Button className="m-t" label="Bring back to leads" onClick={() => backToLeads(instantOffer)} />
        </>
      )}

      {instantOffer.status === InstantOfferService.STATUS.SOLD &&
        (instantOffer.auctionFeesAmount || instantOffer.soldAmount) && (
          <div className="m-t">
            {instantOffer.auctionFeesAmount && (
              <div>
                Auction Fees: <Amount value={instantOffer.auctionFeesAmount} hasCurrency /> <br />
              </div>
            )}
            {instantOffer.soldAmount && (
              <div>
                Sold: <Amount value={instantOffer.soldAmount} hasCurrency /> <br />
              </div>
            )}
            <div className="ws-n">
              {instantOffer.revenueAmount && (
                <>
                  Revenue: <Amount value={instantOffer.revenueAmount} hasCurrency />
                </>
              )}

              <Button
                label={<i className="fa fa-pencil" />}
                className="btn btn-xs m-l-xs"
                onClick={() =>
                  setModalContent({
                    title: 'Complete Sale Modal',
                    content: (
                      <CompleteSaleForm
                        instantOffer={instantOffer}
                        setFlash={enqueueSnackbarAdapter}
                        setModalContent={setModalContent}
                        setInstantOfferChangeLogs={setInstantOfferChangeLogs}
                      />
                    ),
                  })
                }
              />
            </div>
          </div>
        )}

      {((instantOffer.status === InstantOfferService.STATUS.SOLD &&
        !instantOffer.auctionFeesAmount &&
        !instantOffer.soldAmount) ||
        instantOffer.status === InstantOfferService.STATUS.AT_AUCTION) && (
        <div className="m-t">
          <Button
            className="btn"
            label="Complete Sale"
            onClick={() =>
              setModalContent({
                title: 'Complete Sale Modal',
                content: (
                  <CompleteSaleForm
                    instantOffer={instantOffer}
                    setFlash={enqueueSnackbarAdapter}
                    setModalContent={setModalContent}
                    setInstantOfferChangeLogs={setInstantOfferChangeLogs}
                  />
                ),
              })
            }
          />
        </div>
      )}
    </>
  );
}

InstantOfferStatus.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setInstantOffer: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
};

export default InstantOfferStatus;
