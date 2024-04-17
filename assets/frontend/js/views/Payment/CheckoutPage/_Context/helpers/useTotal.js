import get from 'lodash/get';
import PaymentService from 'frontend/js/api/PaymentService';

function useTotal(invoices, product) {
  if (!invoices) {
    return { total: 0, totalToPay: 0 };
  }

  if (product === PaymentService.PRODUCT.DEPOSIT) {
    let total = 0;
    let totalToPay = 0;

    invoices.forEach((invoice) => {
      get(invoice, 'items', []).forEach((item) => {
        total += Number(item.due);

        if (item.productService && item.productService.objectKey === PaymentService.PRODUCT_SERVICE.SECURITY_DEPOSIT) {
          totalToPay += Number(item.due);
        }
      });
    });

    return { total, totalToPay };
  }

  const total = invoices
    .map((invoice) =>
      get(invoice, 'items', [])
        .map((item) => Number(item.due))
        .reduce((acc, curr) => acc + curr, 0),
    )
    .reduce((acc, curr) => acc + curr, 0);

  return { total, totalToPay: total };
}

export default useTotal;
