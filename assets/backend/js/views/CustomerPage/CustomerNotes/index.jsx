import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import NoteGroups from 'backend/js/views/CustomerPage/CustomerNotes/NoteGroups';
import ReactQueryProvider from 'backend/js/providers/ReactQueryProvider';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import ThemeProvider from 'backend/js/providers/ThemeProvider';

function CustomerNotes({ customerId, isAdmin }) {
  const categories = [
    CustomerNotes.CATEGORY_COMBINED_BY_ROOT,
    CustomerNotes.CATEGORY_COUNTER_BID,
    CustomerNotes.CATEGORY_MAO,
    CustomerNotes.CATEGORY_COMBINED_BY_VIN,
  ];

  return categories.map((category) => (
    <NoteGroups key={category} category={category} customerId={customerId} isAdmin={isAdmin} />
  ));
}

CustomerNotes.CATEGORY_COMBINED_BY_ROOT = 'combined_by_root';
CustomerNotes.CATEGORY_COUNTER_BID = 'counter_bid';
CustomerNotes.CATEGORY_MAO = 'mao';
CustomerNotes.CATEGORY_COMBINED_BY_VIN = 'combined_by_vin';

CustomerNotes.propTypes = {
  customerId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
};

CustomerNotes.defaultProps = {
  isAdmin: false,
};

const $el = document.getElementById('note-list');
if ($el) {
  ReactDOM.render(
    <ThemeProvider>
      <ReactQueryProvider>
        <SnackbarProvider>
          <CustomerNotes customerId={Number($el.dataset.customerId)} isAdmin={Boolean($el.dataset.isAdmin)} />
        </SnackbarProvider>
      </ReactQueryProvider>
    </ThemeProvider>,
    $el,
  );
}

export default CustomerNotes;
