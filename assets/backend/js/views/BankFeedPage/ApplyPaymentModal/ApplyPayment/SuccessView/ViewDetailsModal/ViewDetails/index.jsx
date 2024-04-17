import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InvoiceService from 'backend/js/api/InvoiceService';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import useStyles from './useStyles';

function ViewDetails({ invoice }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState();
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const invoiceService = new InvoiceService();
    invoiceService
      .getInvoice(invoice)
      .then(({ data }) => {
        setInvoiceData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [invoice]);

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <SpinnerWheel size={40} thickness={3} color="gray-dark" />
      </div>
    );
  }

  return <pre>{invoiceData?.copart?.text}</pre>;
}

ViewDetails.propTypes = {
  invoice: PropTypes.string.isRequired,
};

export default ViewDetails;
