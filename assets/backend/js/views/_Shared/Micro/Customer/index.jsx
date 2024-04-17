import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import classnames from 'classnames';
import RouterService from 'backend/js/api/RouterService';
import ModalLink from 'backend/js/components/ModalLink';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import FonalityPhone from 'backend/js/components/FonalityPhone';
import CopyButton from 'backend/js/components/CopyButton';

function Customer({ customer, category, showLocale, showLocalTime, onModalOpen, onModalClose }) {
  if (!customer || !Object.keys(customer).length) {
    return null;
  }

  function getMembershipClass() {
    return get(customer, 'membershipType.displayAttributes.class', '');
  }

  return (
    <>
      <a href={RouterService.getRoute('customerNotes', null, { id: customer.id })} title="Go to Customer Mini Profile">
        {customer.firstName} {customer.lastName}
      </a>
      &nbsp;
      <ModalLink
        route={RouterService.getRoute('customerAddNote', null, { id: customer.id })}
        className="label label-warning content-modal"
        title="View Customer Notes"
        label={customer.notesCount}
        onModalOpen={onModalOpen}
        onModalClose={onModalClose}
      />
      &nbsp;
      <>
        <ModalLink
          route={RouterService.getRoute('customerSendSms', { category }, { id: customer.id })}
          label={<i className="fa fa-comment-o" />}
          closeOnSuccess
          closeOnError
          onModalOpen={onModalOpen}
          onModalClose={onModalClose}
        />
        &nbsp;
        <ModalLink
          route={RouterService.getRoute('customerSendEmail', { category }, { id: customer.id })}
          label={<i className="fa fa-envelope-o" />}
          closeOnSuccess
          closeOnError
          onModalOpen={onModalOpen}
          onModalClose={onModalClose}
        />
        &nbsp;
      </>
      {customer.wonBidsCount === 1 && <span className="label label-danger">FTP</span>}
      <br />
      {customer.company && (
        <>
          <div>{customer.company}</div>
        </>
      )}
      {customer.membershipType && (
        <span className={classnames(`membership-type`, getMembershipClass())}>{customer.membershipType.name}</span>
      )}
      <div className="m-t-xs">
        <div className="ws-n">
          <a href={`mailto:${customer.email}`}>{customer.email}</a>
          <CopyButton value={customer.email} />
        </div>
        {customer.phoneNumber && <FonalityPhone phone={customer.phoneNumber} />}
      </div>
      <div>
        {customer.address && <>{customer.address},</>} {customer.city}
      </div>
      <div>
        {customer.state && customer.state.code} {customer.zip}{' '}
        {customer.country && (
          <>
            {customer.country.name} <i className={`flag flag-sm ${customer.country.iso_2}`} />
          </>
        )}
      </div>
      <div>
        {showLocalTime && customer.localDateTime && (
          <>
            {DateTimeService.formatFromISOStringWithoutTimezone(customer.localDateTime, 'h:mmaaa,').toLowerCase()}
            &nbsp;
            {DateTimeService.formatFromISOStringWithoutTimezone(customer.localDateTime, 'LLL d')}
            {customer.localTimezone && <> ({DateTimeService.getTimezoneAbbr(customer.localTimezone)})</>}
          </>
        )}
        {showLocale && (
          <>
            {' '}
            <span className="text-uppercase">{customer.locale}</span>
          </>
        )}
      </div>
    </>
  );
}

Customer.propTypes = {
  customer: PropTypes.object,
  category: PropTypes.string,
  showLocale: PropTypes.bool,
  showLocalTime: PropTypes.bool,
  onModalOpen: PropTypes.func,
  onModalClose: PropTypes.func,
};

Customer.defaultProps = {
  customer: {},
  category: null,
  showLocale: false,
  showLocalTime: false,
  onModalOpen: () => null,
  onModalClose: () => null,
};

export default Customer;
