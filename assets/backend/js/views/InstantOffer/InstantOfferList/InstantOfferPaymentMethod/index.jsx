import React from 'react';
import PropTypes from 'prop-types';
import CopyButton from 'backend/js/components/CopyButton';
import NumberService from 'backend/js/lib/utils/NumberService';
import Button from 'backend/js/components/Button';
import Amount from 'frontend/js/components/Amount';
import PayMethodForm from './PayMethodForm';
import RecordPaymentForm from './RecordPaymentForm';

const ZELLE = 'Zelle';
const ACH = 'ACH';
const WIRE_TRANSFER = 'Wire Transfer';
const CHECK_BY_FEDEX = 'Check by FedEx';
const PAY_METHODS_DATA_MAP = {
  [ZELLE]: {
    zelleEmailPhone: 'Zelle Email or Phone',
    recipientName: 'Recipient Name',
  },
  [ACH]: {
    accountNumber: 'Account Number',
    routingNumber: 'Routing Number',
  },
  [WIRE_TRANSFER]: {
    accountName: 'Account Name',
    accountNumber: 'Account Number',
    routingNumber: 'Routing Number',
  },
  [CHECK_BY_FEDEX]: {
    address: 'Mailing Address',
    recipientName: 'Recipient Name',
    nameOnCheck: 'Name on Check',
    mailingApartment: 'Apt/Suite/Unit',
  },
};

function InstantOfferPaymentMethod({
  instantOffer,
  setFlash,
  setInstantOffer,
  setInstantOfferChangeLogs,
  setModalContent,
  payMethods,
}) {
  return (
    <>
      {instantOffer.payMethod && (
        <>
          Pay method: {instantOffer.payMethod}
          {PAY_METHODS_DATA_MAP[instantOffer.payMethod] && (
            <>
              {Object.keys(instantOffer.payMethodAdditionalInfo).map((key) => (
                <>
                  {PAY_METHODS_DATA_MAP[instantOffer.payMethod][key] && (
                    <div key={key}>
                      {`${PAY_METHODS_DATA_MAP[instantOffer.payMethod][key]}: ${
                        instantOffer.payMethodAdditionalInfo[key]
                      }`}
                      <CopyButton value={instantOffer.payMethodAdditionalInfo[key]} />
                    </div>
                  )}
                </>
              ))}
            </>
          )}
          {instantOffer.mailingAddress && (
            <p>
              Mailing address: {instantOffer.mailingAddress}
              {instantOffer.mailingZip && (
                <>
                  <br />
                  {instantOffer.mailingCity && instantOffer.mailingStateCode ? (
                    <>
                      {instantOffer.mailingCity}, {instantOffer.mailingStateCode} {instantOffer.mailingZip}
                    </>
                  ) : (
                    <>{instantOffer.mailingZip}</>
                  )}
                </>
              )}
            </p>
          )}
        </>
      )}

      {instantOffer.activeCarrierLabels?.length > 0 && (
        <>
          {instantOffer.activeCarrierLabels.map((carrierLabel) => (
            <div key={carrierLabel.id}>
              FedEx label:{' '}
              <a
                href={`https://www.fedex.com/fedextrack/?tracknumbers=${carrierLabel.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {carrierLabel.id}
              </a>{' '}
              ({NumberService.formatUsCurrency(carrierLabel.totalCharges, true)})
            </div>
          ))}
        </>
      )}

      {instantOffer.paymentRefNumber && (
        <>
          <br />
          Ref#: {instantOffer.paymentRefNumber}
          <br />
          Paid: <Amount value={instantOffer.paidAmount} /> on {new Date(instantOffer.paymentDate).toLocaleDateString()}
          {instantOffer.paymentNotes && (
            <>
              <br />
              <span className="text-muted">{instantOffer.paymentNotes}</span>
            </>
          )}
          <Button
            label={<i className="fa fa-pencil" />}
            className="btn btn-xs m-l-xs"
            style={{
              border: 0,
              background: 'transparent',
              boxShadow: 'none',
            }}
            onClick={() =>
              setModalContent({
                title: 'Edit Payment Modal',
                content: (
                  <RecordPaymentForm
                    instantOffer={instantOffer}
                    setInstantOffer={setInstantOffer}
                    setModalContent={setModalContent}
                    setInstantOfferChangeLogs={setInstantOfferChangeLogs}
                  />
                ),
              })
            }
          />
        </>
      )}

      <div>
        <Button
          className={instantOffer.payMethod ? 'm-t' : 'm-t btn-danger'}
          label="Pay Method"
          onClick={() =>
            setModalContent({
              title: 'Edit Pay Method Modal',
              content: (
                <PayMethodForm
                  instantOffer={instantOffer}
                  setFlash={setFlash}
                  setModalContent={setModalContent}
                  setInstantOfferChangeLogs={setInstantOfferChangeLogs}
                  payMethods={payMethods}
                />
              ),
            })
          }
        />

        {instantOffer.payMethod && !instantOffer.paymentRefNumber && (
          <Button
            className="m-t"
            label="Record Payment"
            onClick={() =>
              setModalContent({
                title: 'Record Payment Modal',
                content: (
                  <RecordPaymentForm
                    instantOffer={instantOffer}
                    setInstantOffer={setInstantOffer}
                    setModalContent={setModalContent}
                    setInstantOfferChangeLogs={setInstantOfferChangeLogs}
                  />
                ),
              })
            }
          />
        )}
      </div>
    </>
  );
}

InstantOfferPaymentMethod.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setFlash: PropTypes.func.isRequired,
  setInstantOffer: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  payMethods: PropTypes.array,
};

InstantOfferPaymentMethod.defaultProps = {
  payMethods: [],
};

export default InstantOfferPaymentMethod;
