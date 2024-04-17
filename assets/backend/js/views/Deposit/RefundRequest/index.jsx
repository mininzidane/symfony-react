import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import TranslationProvider from 'backend/js/providers/TranslationProvider';
import ReactQueryProvider from 'backend/js/providers/ReactQueryProvider';
import NumberService from 'backend/js/lib/utils/NumberService';
import FlashSuccess from 'backend/js/components/Flash/FlashSuccess';
import FlashInfo from 'backend/js/components/Flash/FlashInfo';
import RefundRequestModal from './RefundRequestModal';

const $modal = document.getElementById('refund-request-modal');

function RefundRequest({ customer, masterTransaction }) {
  function renderSuccessAlert(messages, amount) {
    ReactDOM.render(
      <ThemeProvider>
        {messages?.map((message, index) => (
          <FlashInfo key={index} message={message} />
        ))}
        <FlashSuccess message={`Refund of ${NumberService.formatCurrency(amount)} has been requested`} />
      </ThemeProvider>,
      document.getElementById('react-alert'),
    );
  }

  function handleClose() {
    unmountComponentAtNode($modal);
  }

  function handleReleaseSuccess(transaction, messages) {
    const $el = document.getElementById(`refund-request-btn-${transaction?.token}`);
    if ($el) {
      $el.innerHTML = '<i>Pending Refund</i>';
    }
    window.scroll(0, 0);
    renderSuccessAlert(messages, transaction?.amount);
    handleClose();
  }

  useEffect(() => {
    unmountComponentAtNode(document.getElementById('react-alert'));
  }, []);

  return (
    <>
      <RefundRequestModal
        isOpen
        onClose={handleClose}
        customer={customer}
        masterTransaction={masterTransaction}
        onReleaseSuccess={handleReleaseSuccess}
      />
    </>
  );
}

RefundRequest.propTypes = {
  customer: PropTypes.object.isRequired,
  masterTransaction: PropTypes.object.isRequired,
};

window.renderRefundRequestModal = ({ customer, masterTransaction }) => {
  if ($modal) {
    ReactDOM.render(
      <ThemeProvider>
        <TranslationProvider>
          <ReactQueryProvider>
            <RefundRequest customer={customer} masterTransaction={masterTransaction} />
          </ReactQueryProvider>
        </TranslationProvider>
      </ThemeProvider>,
      $modal,
    );
  }

  return false;
};
