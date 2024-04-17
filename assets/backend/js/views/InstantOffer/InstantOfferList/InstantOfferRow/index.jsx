import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TableRow } from '@material-ui/core';
import TableCell from 'backend/js/components/Table/TableCell';
import RouterService from 'backend/js/api/RouterService';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import Post2Copart from 'backend/js/views/InstantOffer/InstantOfferList/InstantOfferShipping/Post2Copart';
import CopyButton from 'backend/js/components/CopyButton';
import InstantOfferAgent from 'backend/js/views/InstantOffer/InstantOfferList/InstantOfferAgent';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import Customer from '../../../_Shared/Micro/Customer';
import InstantOfferStatus from '../InstantOfferStatus';
import InstantOfferNotes from '../InstantOfferNotes';
import InstantOfferOffer from '../InstantOfferOffer';
import InstantOfferPaymentMethod from '../InstantOfferPaymentMethod';
import InstantOfferAddress from '../InstantOfferAddress';
import InstantOfferShipping from '../InstantOfferShipping';
import InstantOfferVehicle from '../InstantOfferVehicle';

function InstantOfferRow({
  instantOffer: initInstantOffer,
  setFlash,
  setModalContent,
  titleTypes,
  pickupTimes,
  payMethods,
  photoTypes,
  agents,
}) {
  const [instantOffer, setInstantOffer] = useState(initInstantOffer);
  const [instantOfferChangeLogs, updateState] = useState(null);

  const setInstantOfferChangeLogs = useCallback(
    (data) => {
      updateState(data);
      window.dispatchEvent(new CustomEvent('update_instant_offer_tabs'));
    },
    [updateState],
  );

  useEffect(() => {
    setInstantOffer(instantOffer);
  }, [initInstantOffer]);

  useEffect(() => {
    if (instantOfferChangeLogs === null) {
      const instantOfferService = new InstantOfferService();
      instantOfferService.getNotes(instantOffer.ref).then(({ notes }) => {
        setInstantOfferChangeLogs(notes);
      });
    }
  }, [instantOfferChangeLogs]);

  return (
    <TableRow key={`instantOffer-${instantOffer.ref}`}>
      <TableCell>
        <div className="ws-n">
          <a href={RouterService.getRoute('instantOffersEdit', '', { id: instantOffer.ref })}>{instantOffer.ref}</a>
          <CopyButton value={instantOffer.ref} />
        </div>

        {new Date(instantOffer.createdAt).toLocaleString()}

        {InstantOfferService.ALLOW_TO_SET_AGENT_STATUSES.includes(instantOffer.status) ? (
          <div className="mt-5">
            <InstantOfferAgent
              instantOffer={instantOffer}
              agents={agents}
              setInstantOffer={setInstantOffer}
              setInstantOfferChangeLogs={setInstantOfferChangeLogs}
            />
          </div>
        ) : (
          instantOffer.agent && (
            <div className="mt-5">
              {instantOffer.agent.firstName} {instantOffer.agent.lastName}
            </div>
          )
        )}
      </TableCell>
      <TableCell>
        <InstantOfferVehicle
          instantOffer={instantOffer}
          setInstantOfferChangeLogs={setInstantOfferChangeLogs}
          setModalContent={setModalContent}
          titleTypes={titleTypes}
          photoTypes={photoTypes}
        />
      </TableCell>
      <TableCell>
        <InstantOfferOffer
          instantOffer={instantOffer}
          setInstantOffer={setInstantOffer}
          setInstantOfferChangeLogs={setInstantOfferChangeLogs}
          setModalContent={setModalContent}
        />
      </TableCell>
      <TableCell>
        <InstantOfferPaymentMethod
          setFlash={setFlash}
          instantOffer={instantOffer}
          setInstantOffer={setInstantOffer}
          setInstantOfferChangeLogs={setInstantOfferChangeLogs}
          setModalContent={setModalContent}
          payMethods={payMethods}
        />
      </TableCell>
      <TableCell>
        <InstantOfferAddress
          instantOffer={instantOffer}
          pickupTimes={pickupTimes}
          setModalContent={setModalContent}
          setInstantOffer={setInstantOffer}
          setInstantOfferChangeLogs={setInstantOfferChangeLogs}
        />
      </TableCell>
      <TableCell>
        <InstantOfferShipping
          setFlash={setFlash}
          instantOffer={instantOffer}
          pickupTimes={pickupTimes}
          setModalContent={setModalContent}
          setInstantOfferChangeLogs={setInstantOfferChangeLogs}
          setInstantOffer={setInstantOffer}
        />
        <Post2Copart setInstantOffer={setInstantOffer} instantOffer={instantOffer} setModalContent={setModalContent} />
      </TableCell>
      <TableCell>
        <InstantOfferStatus
          instantOffer={instantOffer}
          setInstantOffer={setInstantOffer}
          setInstantOfferChangeLogs={setInstantOfferChangeLogs}
          setModalContent={setModalContent}
        />
      </TableCell>
      <TableCell className="customer">
        {instantOffer.customer && (
          <>
            <Customer
              customer={instantOffer.customer}
              category={InstantOfferService.CATEGORY_TEMPLATE}
              showLocalTime
              showLocale={false}
            />
            {!instantOffer.customer.phoneNumber &&
              !instantOffer.customer.homeNumber &&
              !instantOffer.customer.optionalNumber && (
                <>
                  <br />
                  <a href={`tel: ${instantOffer.phoneNumber}`}>{instantOffer.phoneNumber}</a>
                </>
              )}
            {instantOffer.activeDocumentsCount > 0 && (
              <div className="m-t">
                <span className="badge badge-danger">Signed title</span>
              </div>
            )}
          </>
        )}
        {!instantOffer.customer && (
          <>
            {`${instantOffer.firstName} ${instantOffer.lastName}`}
            <div className="ws-n">
              <a href={`mailto:${instantOffer.email}`}>{instantOffer.email}</a>
              <CopyButton value={instantOffer.email} />
            </div>
            <a href={`tel: ${instantOffer.phoneNumber}`}>{instantOffer.phoneNumber}</a>
          </>
        )}
      </TableCell>
      <TableCell>
        {instantOfferChangeLogs === null ? (
          <SpinnerWheel size={40} thickness={3} color="blue" />
        ) : (
          <InstantOfferNotes
            setFlash={setFlash}
            instantOffer={instantOffer}
            instantOfferChangeLogs={instantOfferChangeLogs || []}
            setInstantOfferChangeLogs={setInstantOfferChangeLogs}
          />
        )}
      </TableCell>
    </TableRow>
  );
}

InstantOfferRow.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setFlash: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  pickupTimes: PropTypes.array,
  titleTypes: PropTypes.array,
  payMethods: PropTypes.array,
  photoTypes: PropTypes.array,
  agents: PropTypes.array,
};

InstantOfferRow.defaultProps = {
  pickupTimes: [],
  titleTypes: [],
  payMethods: [],
  photoTypes: [],
  agents: [],
};

export default InstantOfferRow;
