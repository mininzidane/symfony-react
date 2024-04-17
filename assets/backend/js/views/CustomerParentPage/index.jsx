import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import BidderFormContextProvider from 'frontend/js/views/Account/BrokerManagerPage/_Context';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import TranslationProvider from 'backend/js/providers/TranslationProvider';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import FlashMessage from '../../components/FlashMessage';
import CustomerParentForm from './CustomerParentForm';

function CustomerParentPage({ customerParentEntity, isAdmin }) {
  const defaultFlash = { message: '', type: '' };
  const [customerParent, setCustomerParent] = useState(customerParentEntity);
  const [flash, setFlash] = useState(defaultFlash);

  function handleOnSubmitSuccess(updatedContent) {
    const message = customerParent ? 'Content Updated' : 'Content Added';
    setFlash({ message, type: 'success' });

    setCustomerParent(updatedContent);
  }

  function handleOnSubmitError(errorMessages) {
    setFlash({ message: errorMessages, type: 'error' });
  }

  return (
    <div className="wrapper wrapper-content">
      {flash.message && <FlashMessage message={flash.message} type={flash.type} />}
      <div className="ibox float-e-margins">
        <div className="ibox-content">
          <ThemeProvider>
            <ReactQueryProvider>
              <TranslationProvider>
                <SnackbarProvider>
                  <BidderFormContextProvider>
                    <PaginationProvider>
                      <CustomerParentForm
                        customerParent={customerParent}
                        onSubmitSuccess={handleOnSubmitSuccess}
                        onSubmitError={handleOnSubmitError}
                        isAdmin={isAdmin}
                      />
                    </PaginationProvider>
                  </BidderFormContextProvider>
                </SnackbarProvider>
              </TranslationProvider>
            </ReactQueryProvider>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

CustomerParentPage.propTypes = {
  customerParentEntity: PropTypes.object,
  isAdmin: PropTypes.bool,
};

CustomerParentPage.defaultProps = {
  customerParentEntity: undefined,
  isAdmin: false,
};

const $el = document.getElementById('customer-parent');
if ($el) {
  const customerParent = JSON.parse($el.getAttribute('data-customer-parent'));
  const isAdmin = Boolean(parseInt($el.getAttribute('data-is-admin'), 10));

  ReactDOM.render(
    <ReactQueryProvider>
      <CustomerParentPage customerParentEntity={customerParent} isAdmin={isAdmin} />
    </ReactQueryProvider>,
    $el,
  );
}
