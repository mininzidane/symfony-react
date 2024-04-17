import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RouterService from 'backend/js/api/RouterService';
import AdaptiveTable from 'frontend/js/components/Table/AdaptiveTable';
import CustomerShape from 'frontend/js/lib/propshapes/CustomerShape';
import NumberService from 'frontend/js/lib/utils/NumberService';
import SortBy from 'frontend/js/components/SortBy';
import SortContext from 'frontend/js/context/SortContext';
import Pagination from 'backend/js/components/Pagination';
import PaginationContext from 'frontend/js/context/PaginationContext';
import CopyButton from 'backend/js/components/CopyButton';
import DateTimeService from '../../../../lib/utils/DateTimeService';
import sortOptions from './sortOptions';
import useStyles from './useStyles';
import CustomerParentShape from '../../../../lib/propshapes/CustomerParentShape';

function BiddersTable({ brokerSettings, isAdmin, customers, deleteCustomer, fetchCustomers, customerParent }) {
  const biddersRowsArray = customers.map((customer) => {
    const row = [
      {
        content: (
          <>
            <a href={RouterService.getRoute('customerNotes', null, { id: customer.id })}>
              {customer.firstName} {customer.lastName}
            </a>{' '}
            {customer.isParentAdmin && <span className="badge badge-info">Broker Admin</span>}
            {/* eslint-disable-next-line */}
          <a href="javascript:void(0);" className="fa fa-trash-o ml-5 text-muted" onClick={() => deleteCustomer(customer)} />
            <div className="ws-n">
              <a href={`mailto:${customer.email}`}>{customer.email}</a>
              <CopyButton value={customer.email} />
            </div>
            {customer.phoneNumber && <>{customer.phoneNumber}</>}
            {customer.address && (
              <>
                <br />
                {customer.address},&nbsp;
                {customer.city},&nbsp;
                {customer.state?.name} {customer.zip}
              </>
            )}
            <br />
            {DateTimeService.formatFromISOString(customer.signUp)}
          </>
        ),
      },
      {
        content: customer.country ? (
          <>
            {customer.country.name} <i className={`flag flag-sm ${customer.country.iso_2}`} />
          </>
        ) : (
          ''
        ),
      },
      { content: <div dangerouslySetInnerHTML={{ __html: customer.transactionFee ? customer.transactionFee : '' }} /> },
      {
        content: (
          <a
            href={RouterService.getRoute('customerChangeBiddingLimit', null, { id: customer.id })}
            title="Change Buyer Power"
          >
            {customer.blCount}/{NumberService.formatUsCurrency(customer.blAmount)}
          </a>
        ),
      },
      brokerSettings.allowToAddTowingMarkup && {
        content: (
          <a href={RouterService.getRoute('customerChangeFees', null, { id: customer.id })}>{customer.towingMarkup}</a>
        ),
      },
      {
        content: (
          <a href={RouterService.getRoute('customerActiveBids', null, { id: customer.id })}>
            {customer.activeBidsCount}
          </a>
        ),
      },
      {
        content: (
          <a href={RouterService.getRoute('customerWatchlist', null, { id: customer.id })}>
            {customer.watchlistCurrentCnt}
          </a>
        ),
      },
      {
        content: (
          <a href={RouterService.getRoute('customerInvoices', null, { id: customer.id })}>
            {customer.lotPurchasesCount}
          </a>
        ),
      },
      {
        content: (
          <a href={RouterService.getRoute('customerShippingOrders', null, { id: customer.id })}>
            {customer.activeShippingOrdersCount}
          </a>
        ),
      },
      {
        content: (
          <a
            href={RouterService.getRoute('customerInvoices', null, { id: customer.id })}
            className={customer.due > 0 ? 'text-danger font-bold' : ''}
          >
            {NumberService.formatUsCurrency(customer.due)}
          </a>
        ),
      },
      isAdmin && {
        content: (
          <a href={RouterService.getRoute('customerInvoices', null, { id: customer.id })}>
            {NumberService.formatUsCurrency(customer.revenue)}
          </a>
        ),
      },
      {
        content: (
          <>
            {customer.lastActivity && (
              <>
                {DateTimeService.formatFromISOString(customer.lastActivity)}
                <br />
              </>
            )}
            {customer.latestIpLogin && (
              <>
                IP:&nbsp;
                <a href={RouterService.getRoute('customerIpLog', null, { id: customer.id })}>
                  {customer.latestIpLogin}
                </a>
              </>
            )}
          </>
        ),
      },
    ].filter(Boolean);
    row.id = customer.id;

    return row;
  });

  const { sort, setSort } = useContext(SortContext);
  const { currentPage, total, itemsPerPage } = useContext(PaginationContext);
  const classes = useStyles();

  function onUpdatePage(page) {
    fetchCustomers(sort.field, sort.order, page);
  }

  return (
    <>
      <div className={classes.sortWrap}>
        {customerParent !== null && (
          <SortBy
            value={sort}
            isFlipEnabled={false}
            triggerClassName=""
            options={sortOptions}
            onChange={(value) => {
              fetchCustomers(value.field, value.order);
              setSort(value);
            }}
          />
        )}
      </div>
      <AdaptiveTable
        headData={[
          { label: 'Customer' },
          { label: 'Country' },
          { label: 'Fees' },
          { label: 'BP' },
          isAdmin && { label: 'IAA' },
          brokerSettings.allowToAddTowingMarkup && { label: 'TM' },
          { label: 'Active Bids' },
          { label: 'Watchlist' },
          { label: 'Cars' },
          { label: 'Shipping' },
          { label: 'Total Due' },
          isAdmin && { label: 'Revenue' },
          { label: 'Last activity' },
        ].filter(Boolean)}
        bodyData={biddersRowsArray}
      />
      <Pagination currentPage={currentPage} pageSize={itemsPerPage} numResults={total} onPageUpdate={onUpdatePage} />
    </>
  );
}

BiddersTable.propTypes = {
  brokerSettings: PropTypes.object.isRequired,
  customers: PropTypes.arrayOf(CustomerShape),
  isAdmin: PropTypes.bool,
  deleteCustomer: PropTypes.func.isRequired,
  fetchCustomers: PropTypes.func.isRequired,
  customerParent: CustomerParentShape,
};

BiddersTable.defaultProps = {
  customers: [],
  isAdmin: false,
  customerParent: undefined,
};

export default BiddersTable;
