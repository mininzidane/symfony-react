import PaymentService from 'frontend/js/api/PaymentService';

function getSubtotalByProducts(invoice, products) {
  if (invoice?.items) {
    const items = invoice.items.filter((item) => products.includes(item?.productService?.objectKey));
    if (items.length > 0) {
      return items.reduce((acc, cur) => acc + parseFloat(cur.subtotal, 10), 0);
    }
  }
  return null;
}

function prepareInvoiceData(invoice) {
  const prepareData = {
    bidAmount: null,
    copartFees: null,
    transactionFee: null,
    documentationFee: null,
    storageFee: null,
    latePaymentFee: null,
    insuranceFee: null,
    groundShipping: null,
    oceanShipping: null,
    paidAmount: null,
    dueAmount: null,
  };

  if (!invoice) {
    return prepareData;
  }

  const shippingInvoice = invoice.lotPurchase?.activeShippingOrder?.invoice || invoice?.shippingOrder || null;

  const { PRODUCT_SERVICE } = PaymentService;

  prepareData.bidAmount = getSubtotalByProducts(invoice, [PRODUCT_SERVICE.AUCTION_FINAL_BID]);
  prepareData.transactionFee = getSubtotalByProducts(invoice, [PRODUCT_SERVICE.TRANSACTION_FEE]);
  prepareData.documentationFee = getSubtotalByProducts(invoice, [PRODUCT_SERVICE.DOCUMENTATION_FEE]);
  prepareData.storageFee = getSubtotalByProducts(invoice, [PRODUCT_SERVICE.STORAGE_FEE]);
  prepareData.latePaymentFee = getSubtotalByProducts(invoice, [PRODUCT_SERVICE.LATE_PAYMENT_FEE]);
  prepareData.insuranceFee = getSubtotalByProducts(invoice, [PRODUCT_SERVICE.OCEAN_SHIPPING_INSURANCE]);
  prepareData.groundShipping = getSubtotalByProducts(shippingInvoice, [PRODUCT_SERVICE.GROUND_TRANSPORTATION]);
  prepareData.oceanShipping = getSubtotalByProducts(shippingInvoice, [PRODUCT_SERVICE.OCEAN_TRANSPORTATION]);
  prepareData.copartFees = getSubtotalByProducts(invoice, [
    PRODUCT_SERVICE.COPART_BUYER_FEE,
    PRODUCT_SERVICE.VIRTUAL_BID_FEE,
    PRODUCT_SERVICE.INTERNET_BID_FEE,
    PRODUCT_SERVICE.GATE_FEE,
    PRODUCT_SERVICE.COPART_MAILING_FEE,
    PRODUCT_SERVICE.HAX_MAT_COMPLIANCE_FEE,
    PRODUCT_SERVICE.GOVERNMENT_IMPOSED_TRANSACTION,
    PRODUCT_SERVICE.COPART_TITLE_PROCESSING_FEE,
    PRODUCT_SERVICE.COPART_BROKER_TRANSACTION_FEE,
  ]);

  prepareData.paidAmount = parseFloat(invoice.amountApplied, 10);
  prepareData.dueAmount = parseFloat(invoice.balanceRemaining, 10);

  return prepareData;
}

export default prepareInvoiceData;
