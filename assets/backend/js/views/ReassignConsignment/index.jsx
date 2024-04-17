import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import FlashMessage from '../../components/FlashMessage';
import CustomerSearch from '../_Shared/Forms/CustomerSearch';
import SubmitButton from '../../components/SubmitButton';
import LotPurchaseService from '../../api/LotPurchaseService';

function ReassignConsignmentPage({ lotPurchase }) {
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
      await lotPurchaseService.reassignConsignment(lotPurchase.token, {
        email: selectedAutocompleteCustomer.email,
      });
      setFlash({ message: 'Reassigned successful', type: 'success' });
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
              <div className="row m-b-lg">
                <div className="col-lg-4">
                  {lotPurchase.customer && (
                    <>
                      <span className="key">Customer: </span>
                      <span className="value">
                        {lotPurchase.customer.first_name} {lotPurchase.customer.last_name}
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
                  <span className="key">Bos Signed: </span>
                  <span className="value">{lotPurchase.bosSigned ? 'Y' : 'N'}</span>
                  {lotPurchase.auctionLocation && (
                    <>
                      <br />
                      <span className="key">Auction: </span>
                      <span className="value">{lotPurchase.auctionLocation.auction}</span>
                      <br />
                      <span className="key">Auction Name: </span>
                      <span className="value">{lotPurchase.auctionLocation.name}</span>
                      <br />
                      <span className="key">Auction Lid: </span>
                      <span className="value">{lotPurchase.auctionLocation.auctionLid}</span>
                      <br />
                      <span className="key">State Code: </span>
                      <span className="value">{lotPurchase.auctionLocation.stateCode}</span>
                    </>
                  )}
                </div>
                <div className="col-lg-8">
                  <CustomerSearch
                    autocompleteCustomers={autocompleteCustomers}
                    setAutocompleteCustomers={setAutocompleteCustomers}
                    setSelectedAutocompleteCustomer={setSelectedAutocompleteCustomer}
                    label="New Customer For Assignment"
                  />
                </div>
              </div>
              <SubmitButton
                label="Reassign Customer"
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

ReassignConsignmentPage.propTypes = {
  lotPurchase: PropTypes.object.isRequired,
};

ReassignConsignmentPage.defaultProps = {};

const $el = document.getElementById('reassign-consignment');
if ($el) {
  const lotPurchase = JSON.parse($el.getAttribute('data-lot-purchase')) || [];

  ReactDOM.render(
    <ReactQueryProvider>
      <ReassignConsignmentPage lotPurchase={lotPurchase} />
    </ReactQueryProvider>,
    $el,
  );
}
