import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'backend/js/api/RouterService';

function CustomerShort({ customer }) {
  if (!customer) {
    return null;
  }

  const { id, firstName, lastName, email, identityDocumentCount, userDocUploadDisabled } = customer;

  return (
    <>
      <a href={RouterService.getRoute('customerNotes', null, { id })}>{`${firstName} ${lastName}`}</a>
      <br />
      {email}
      {identityDocumentCount < 1 && !userDocUploadDisabled && (
        <>
          <a
            className="text-danger"
            href={RouterService.getRoute('customerDocumentRequested', null, { id })}
            target="_blank"
            rel="noopener noreferrer"
          >
            [NO ID]
          </a>
        </>
      )}
    </>
  );
}

CustomerShort.propTypes = {
  customer: PropTypes.object,
};

CustomerShort.defaultProps = {
  customer: null,
};

export default CustomerShort;
