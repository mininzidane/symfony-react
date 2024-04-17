import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import ReactQueryProvider from 'backend/js/providers/ReactQueryProvider';
import useCustomer from 'backend/js/hooks/useCustomer';
import EditForm from './EditForm';

function ContactInformation({ customerId }) {
  const [customer, isLoading] = useCustomer(customerId);

  return (
    <div className="wrapper wrapper-content">
      <div className="ibox">
        <div className="ibox-content">
          <div className="mb-25">
            <h1>Contact Information</h1>
          </div>
          {isLoading ? <div style={{ minHeight: 465 }}>Loading...</div> : <EditForm customer={customer} />}
        </div>
      </div>
    </div>
  );
}

ContactInformation.propTypes = {
  customerId: PropTypes.string.isRequired,
};

const $contactInformation = document.getElementById('customer-contact-information');
ReactDOM.render(
  <ThemeProvider>
    <ReactQueryProvider>
      <SnackbarProvider>
        <ContactInformation customerId={$contactInformation.getAttribute('data-customer-id')} />
      </SnackbarProvider>
    </ReactQueryProvider>
  </ThemeProvider>,
  $contactInformation,
);
