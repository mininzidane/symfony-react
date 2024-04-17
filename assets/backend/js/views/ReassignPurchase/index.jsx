import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import LotPurchaseService from 'backend/js/api/LotPurchaseService';
import FlashMessage from 'backend/js/components/FlashMessage';
import SubmitButton from 'backend/js/components/SubmitButton';
import CustomerSearch from 'backend/js/views/_Shared/Forms/CustomerSearch';

function ReassignPurchase({ lotPurchase }) {
  const defaultFlash = { message: '', type: '' };
  const [flash, setFlash] = useState(defaultFlash);

  const [autocompleteCustomers, setAutocompleteCustomers] = useState([]);
  const [selectedAutocompleteCustomer, setSelectedAutocompleteCustomer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lotPurchaseService = new LotPurchaseService();

  async function handleClick() {
    setIsSubmitting(true);
    setFlash({ message: '', type: 'error' });

    try {
      const { redirect } = await lotPurchaseService.reassignPurchase(lotPurchase.token, {
        email: selectedAutocompleteCustomer.email,
      });

      setFlash({ message: 'Reassigned successful', type: 'success' });

      window.location.href = redirect;
    } catch (e) {
      const message = LotPurchaseService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });
    }

    setIsSubmitting(false);
  }

  return (
    <div className="wrapper wrapper-content">
      {flash.message && <FlashMessage message={flash.message} type={flash.type} />}
      <div className="ibox float-e-margins">
        <div className="ibox-content">
          <div className="top-dashboard">
            <div className="user-info">
              <div className="title">Lot Purchase {lotPurchase.token}</div>
              <div className="row m-b-md">
                <div className="col-lg-4">
                  {lotPurchase.customer && (
                    <>
                      <span className="key">Current Customer: </span>
                      <span className="value">
                        {lotPurchase.customer.firstName} {lotPurchase.customer.lastName}
                      </span>
                      <br />
                      <span className="key">Email: </span>
                      <span className="value">{lotPurchase.customer.email}</span>
                      <br />
                    </>
                  )}

                  <span className="key">Year: </span>
                  <span className="value">{lotPurchase.vehicleYear}</span>
                  <br />
                  <span className="key">Make: </span>
                  <span className="value">{lotPurchase.vehicleMake}</span>
                  <br />
                  <span className="key">Model: </span>
                  <span className="value">{lotPurchase.vehicleModel}</span>
                  <br />
                  <span className="key">VIN: </span>
                  <span className="value">{lotPurchase.vehicleVin}</span>
                  <br />
                  <span className="key">Auction: </span>
                  <span className="value">{lotPurchase.auction}</span>
                  <br />
                  <span className="key">Lot Number: </span>
                  <span className="value">{lotPurchase.lotNumber}</span>
                  <br />
                </div>
                <div className="col-lg-8">
                  <CustomerSearch
                    autocompleteCustomers={autocompleteCustomers}
                    setAutocompleteCustomers={setAutocompleteCustomers}
                    setSelectedAutocompleteCustomer={setSelectedAutocompleteCustomer}
                    label="Member"
                  />
                </div>
              </div>
              <SubmitButton
                label="Assign"
                className="btn-primary pull-right"
                isLoading={isSubmitting}
                disabled={selectedAutocompleteCustomer === null || isSubmitting}
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReassignPurchase.propTypes = {
  lotPurchase: PropTypes.object.isRequired,
};

ReassignPurchase.defaultProps = {};
const $el = document.getElementById('reassign-purchase');
if ($el) {
  const lotPurchase = JSON.parse($el.getAttribute('data-lot-purchase')) || [];

  ReactDOM.render(
    <ReactQueryProvider>
      <ReassignPurchase lotPurchase={lotPurchase} />
    </ReactQueryProvider>,
    $el,
  );
}
