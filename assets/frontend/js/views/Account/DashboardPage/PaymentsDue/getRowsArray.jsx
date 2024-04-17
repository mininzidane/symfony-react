import React from 'react';
import FormattedDate from 'frontend/js/components/ThemedTable/InvoiceCells/_components/FormattedDate';
import {
  InvoiceTypeCell,
  InvoiceDescriptionCell,
  InvoiceCell,
  InvoiceActionsCell,
  InvoiceActionsCellStyles,
  InvoicePaidCell,
} from 'frontend/js/components/ThemedTable/InvoiceCells';

function getRowsArray(invoices) {
  return invoices.map((invoice) => {
    const row = [
      { content: <InvoiceTypeCell invoice={invoice} /> },
      { content: <InvoiceDescriptionCell invoice={invoice} /> },
      { content: <FormattedDate date={invoice.created} /> },
      { content: <InvoiceCell invoice={invoice} /> },
      { content: <InvoicePaidCell invoice={invoice} /> },
      { content: <FormattedDate date={invoice.dueDate} /> },
      { content: <InvoiceActionsCell invoice={invoice} />, ...InvoiceActionsCellStyles },
    ];

    row.id = invoice.token;
    return row;
  });
}

export default getRowsArray;
