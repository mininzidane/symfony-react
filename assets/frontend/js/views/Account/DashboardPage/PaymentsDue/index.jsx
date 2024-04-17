import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TransactionsSvg from 'frontend/images/shared/light-blue-set/ic_transactions.svg';
import ThemedTable from 'frontend/js/components/ThemedTable';
import TableHeadControl from 'frontend/js/components/ThemedTable/TableHeadControl';
import ExpandButton from 'frontend/js/components/ThemedTable/ExpandButton';
import TableMobileCard from 'frontend/js/components/TableMobileCard';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import SectionTitle from '../SectionTitle';
import EmptyStateCard from '../EmptyStateCard';
import MobileViewAllButton from '../MobileViewAllButton';
import getRowsArray from './getRowsArray';
import LoadingState from './LoadingState';
import usePaymentsDue from './usePaymentsDue';
import useStyles from './useStyles';

const SORT_OPTIONS = [
  { field: 'due_date', order: 'desc' },
  { field: 'due_date', order: 'asc' },
  { field: 'type', order: 'asc' },
  { field: 'type', order: 'desc' },
  { field: 'description', order: 'asc' },
  { field: 'description', order: 'desc' },
  { field: 'created', order: 'asc' },
  { field: 'created', order: 'desc' },
  { field: 'subtotal', order: 'asc' },
  { field: 'subtotal', order: 'desc' },
  { field: 'amount_applied', order: 'asc' },
  { field: 'amount_applied', order: 'desc' },
  { field: 'due', order: 'asc' },
  { field: 'due', order: 'desc' },
];

function PaymentsDue() {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [size, setSize] = useState(5);
  const { loading, isInitialLoad, invoices, total = 0 } = usePaymentsDue({ sort, size });

  const rowsArray = getRowsArray(invoices);

  return (
    <div>
      <SectionTitle
        text={
          <>
            <FormattedMessage id="shared.label.paymentsDue" /> {!isInitialLoad && `(${total})`}
            {total > invoices.length && !isInitialLoad && (
              <MobileViewAllButton onClick={() => setSize(total)} isLoading={loading} />
            )}
          </>
        }
      />
      {isInitialLoad && <LoadingState classes={{ table: classes.table }} />}

      {!isInitialLoad && (
        <>
          {total ? (
            <>
              {isAboveSm ? (
                <>
                  <ThemedTable
                    className={classes.table}
                    hasHoverEffect
                    headData={[
                      {
                        label: <TableHeadControl id="shared.label.type" />,
                      },
                      {
                        label: (
                          <TableHeadControl
                            id="shared.label.description"
                            sortField="description"
                            sort={sort}
                            setSort={setSort}
                            sortOptions={SORT_OPTIONS}
                          />
                        ),
                      },
                      {
                        label: (
                          <TableHeadControl
                            id="shared.label.invoiceOn"
                            sortField="created"
                            sort={sort}
                            setSort={setSort}
                            sortOptions={SORT_OPTIONS}
                          />
                        ),
                      },
                      {
                        label: (
                          <TableHeadControl
                            id="shared.label.invoice"
                            sortField="subtotal"
                            sort={sort}
                            setSort={setSort}
                            sortOptions={SORT_OPTIONS}
                          />
                        ),
                      },
                      {
                        label: (
                          <TableHeadControl
                            id="shared.label.paid"
                            sortField="amount_applied"
                            sort={sort}
                            setSort={setSort}
                            sortOptions={SORT_OPTIONS}
                          />
                        ),
                      },
                      {
                        label: (
                          <TableHeadControl
                            id="shared.label.dueDate"
                            sortField="due_date"
                            sort={sort}
                            setSort={setSort}
                            sortOptions={SORT_OPTIONS}
                          />
                        ),
                      },
                      {
                        label: (
                          <TableHeadControl
                            id="shared.label.due"
                            sortField="due"
                            sort={sort}
                            setSort={setSort}
                            sortOptions={SORT_OPTIONS}
                          />
                        ),
                      },
                    ]}
                    bodyData={rowsArray}
                  />
                  {total > invoices.length && (
                    <ExpandButton
                      onClick={() => setSize(total)}
                      isLoading={loading}
                      label={
                        <>
                          <FormattedMessage id="homePage.reviews.viewAll" /> ({total})
                        </>
                      }
                    />
                  )}
                </>
              ) : (
                <div>
                  {rowsArray.map((row) => (
                    <TableMobileCard
                      cardData={row}
                      headData={[
                        { label: <FormattedMessage id="shared.label.type" /> },
                        { label: <FormattedMessage id="shared.label.description" /> },
                        { label: <FormattedMessage id="shared.label.invoiceOn" /> },
                        { label: <FormattedMessage id="shared.label.invoice" /> },
                        { label: <FormattedMessage id="shared.label.paid" /> },
                        { label: <FormattedMessage id="shared.label.dueDate" /> },
                        {},
                      ]}
                      key={row.id}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <EmptyStateCard
              icon={<img src={TransactionsSvg} alt="PaymentsDue" />}
              message={<FormattedMessage id="dashboardPage.paymentsDue.empty" />}
            />
          )}
        </>
      )}
    </div>
  );
}

export default PaymentsDue;
