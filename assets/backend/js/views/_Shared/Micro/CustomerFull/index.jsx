import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import classnames from 'classnames';
import RouterService from 'backend/js/api/RouterService';
import ModalLink from 'backend/js/components/ModalLink';
import NumberService from 'backend/js/lib/utils/NumberService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import FonalityPhone from 'backend/js/components/FonalityPhone';
import CopyButton from 'backend/js/components/CopyButton';

function CustomerFull({ customer, bid, category, showLocale, showLocalTime, onModalOpen, onModalClose }) {
  const lotId = bid && bid.lot ? bid.lot.id : null;

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
      {lotId && (
        <>
          <ModalLink
            route={RouterService.getRoute('customerSendSms', { lotId, category }, { id: customer.id })}
            label={<i className="fa fa-comment-o" />}
            closeOnSuccess
            closeOnError
            onModalOpen={onModalOpen}
            onModalClose={onModalClose}
          />
          &nbsp;
          <ModalLink
            route={RouterService.getRoute('customerSendEmail', { lotId, category }, { id: customer.id })}
            label={<i className="fa fa-envelope-o" />}
            closeOnSuccess
            closeOnError
            onModalOpen={onModalOpen}
            onModalClose={onModalClose}
          />
          &nbsp;
        </>
      )}
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
      <div className="m-t-xs">
        {customer.bidder && <div>Bidder: {customer.bidder.id}</div>}
        <div>
          Remain.:{' '}
          <b>
            {customer.blRemainingCount}/{NumberService.formatCurrency(customer.blRemainingAmount)}
          </b>
        </div>
      </div>
    </>
  );
}

CustomerFull.propTypes = {
  customer: PropTypes.object,
  bid: PropTypes.object,
  category: PropTypes.string,
  showLocale: PropTypes.bool,
  showLocalTime: PropTypes.bool,
  onModalOpen: PropTypes.func,
  onModalClose: PropTypes.func,
};

CustomerFull.defaultProps = {
  customer: {},
  bid: undefined,
  category: null,
  showLocale: false,
  showLocalTime: false,
  onModalOpen: () => null,
  onModalClose: () => null,
};

export default CustomerFull;
