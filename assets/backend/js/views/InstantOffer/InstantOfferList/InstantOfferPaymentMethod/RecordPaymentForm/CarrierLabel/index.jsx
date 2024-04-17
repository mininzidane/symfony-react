import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSnackbar } from 'notistack';
import BaseApiService from 'backend/js/api/BaseApiService';
import ButtonLink from 'backend/js/components/ButtonLink';
import RouterService from 'backend/js/api/RouterService';
import CarrierLabelService from 'backend/js/api/CarrierLabelService';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import ConfirmModal from 'backend/js/components/ConfirmModal';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import useStyles from './useStyles';
import AssignCarrierLabelForm from './AssignCarrierLabelForm';
import CreateCarrierLabelForm from './CreateCarrierLabelForm';

function CarrierLabel({ instantOffer, setInstantOffer }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isCarrierLabelLoading, setIsCarrierLabelLoading] = useState(false);
  const [carrierLabelIdRemove, setCarrierLabelIdRemove] = useState(null);
  const [addLabelModalContent, setAddLabelModalContent] = useState(null);
  const carrierLabelService = new CarrierLabelService();
  const { activeCarrierLabels = [] } = instantOffer || {};

  async function removeCarrierLabel(carrierLabelId) {
    setIsCarrierLabelLoading(true);

    try {
      await carrierLabelService.remove(carrierLabelId);

      const actualActiveCarrierLabels = instantOffer.activeCarrierLabels.filter(
        (carrierLabel) => carrierLabel.id !== carrierLabelId,
      );

      setInstantOffer({ ...instantOffer, activeCarrierLabels: actualActiveCarrierLabels });
      setCarrierLabelIdRemove(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
    }
    setIsCarrierLabelLoading(false);
  }

  return (
    <>
      {activeCarrierLabels?.length > 0 && (
        <>
          {activeCarrierLabels.map((carrierLabel) => (
            <div key={carrierLabel.id} className={classnames(classes.carrier)}>
              <div>
                FedEx:{' '}
                <a
                  href={`https://www.fedex.com/fedextrack/?tracknumbers=${carrierLabel.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {carrierLabel.id}
                </a>
              </div>
              <div className="text-right">
                <a
                  href={RouterService.getRoute('carrierLabelPrint', null, { id: carrierLabel.id })}
                  title="Print Label"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-5"
                >
                  Print Label
                </a>

                <ButtonLink
                  label={<i className="fa fa-remove" />}
                  className="ml-5"
                  onClick={() => setCarrierLabelIdRemove(carrierLabel.id)}
                  disabled={isCarrierLabelLoading}
                />
              </div>
            </div>
          ))}
        </>
      )}

      <div className="mt-5">
        {isCarrierLabelLoading && <SpinnerWheel isCentered size={15} thickness={3} style={{ marginTop: -2 }} />}

        {activeCarrierLabels?.length === 0 && (
          <ButtonLink
            label="Get label"
            className="mr-5"
            onClick={() =>
              setAddLabelModalContent({
                title: 'Carrier Service Type',
                content: (
                  <CreateCarrierLabelForm
                    instantOffer={instantOffer}
                    setInstantOffer={setInstantOffer}
                    setAddLabelModalContent={setAddLabelModalContent}
                  />
                ),
              })
            }
            disabled={isCarrierLabelLoading}
          />
        )}

        <ButtonLink
          label="Add extra label"
          onClick={() =>
            setAddLabelModalContent({
              title: 'Add extra label',
              content: (
                <AssignCarrierLabelForm
                  instantOffer={instantOffer}
                  setInstantOffer={setInstantOffer}
                  setAddLabelModalContent={setAddLabelModalContent}
                />
              ),
            })
          }
          disabled={isCarrierLabelLoading}
        />
      </div>

      <ConfirmModal
        isOpen={Boolean(carrierLabelIdRemove)}
        onClose={() => setCarrierLabelIdRemove(null)}
        onConfirm={() => removeCarrierLabel(carrierLabelIdRemove)}
        title="Are you sure?"
        subtitle={
          <>
            Do you want to cancel this shipping label?
            <br />
            This action can&apos;t be undone.
          </>
        }
        isLoading={isCarrierLabelLoading}
      />

      {addLabelModalContent && (
        <ModalWindow isOpen={Boolean(addLabelModalContent)} width={480} onClose={() => setAddLabelModalContent(null)}>
          <ModalWindowHeader title={addLabelModalContent.title} onClose={() => setAddLabelModalContent(null)} />
          <ModalWindowBody className="p-20 ov-v">{addLabelModalContent.content}</ModalWindowBody>
        </ModalWindow>
      )}
    </>
  );
}

CarrierLabel.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setInstantOffer: PropTypes.func.isRequired,
};

export default CarrierLabel;
