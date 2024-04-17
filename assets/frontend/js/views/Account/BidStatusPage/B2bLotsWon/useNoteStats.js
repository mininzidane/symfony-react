import { useState, useEffect } from 'react';
import CustomerNotesService from 'frontend/js/api/CustomerNotesService';

function useNoteStats(invoices) {
  const [noteStats, setNoteStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function getStockNumbersParams(lotsWonInvoices) {
    const stockNumbers = lotsWonInvoices.reduce((acc, cur) => {
      if (!cur.lot) {
        return acc;
      }
      const { id, inventoryAuction } = cur.lot;
      if (!acc[inventoryAuction]) {
        acc[inventoryAuction] = [];
      }
      acc[inventoryAuction].push(id);
      return acc;
    }, {});

    Object.keys(stockNumbers).forEach((inventoryAuction) => {
      stockNumbers[inventoryAuction] = stockNumbers[inventoryAuction].join(',');
    });

    return stockNumbers;
  }

  useEffect(() => {
    if (invoices && invoices.length > 0) {
      setIsLoading(true);
      const params = getStockNumbersParams(invoices);
      const customerNotesService = new CustomerNotesService();
      customerNotesService
        .getNoteStats(params)
        .then((data) => {
          setNoteStats(data.notes);
        })
        .catch(() => {
          /** Ignore */
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [invoices]);
  return { noteStats, isLoading };
}

export default useNoteStats;
