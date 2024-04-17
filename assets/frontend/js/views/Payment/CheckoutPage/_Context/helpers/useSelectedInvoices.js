function useSelectedInvoices(invoices, paymentMethod) {
  if (!invoices) {
    return null;
  }

  const selectedInvoices = invoices[paymentMethod];
  if (!selectedInvoices) {
    return null;
  }

  return Array.isArray(selectedInvoices) ? selectedInvoices : Object.values(selectedInvoices);
}

export default useSelectedInvoices;
