/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import CardPlane from 'frontend/js/components/CardPlane';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import DocumentsContent from './DocumentsContent';
import useOrderInformation from '../OrderInformation/useOrderInformation';
import LoginSection from './LoginSection';
import useStyles from './useStyles';

function Documents({ shippingOrder, refetch }) {
  const classes = useStyles();
  const { needsDocuments, downloadDocuments } = useOrderInformation(shippingOrder);
  const { isAuthenticated, id, customerParent, isB2BBroker } = useCustomerHelper();
  const accessAllowed =
    id === shippingOrder.customer.id ||
    (isB2BBroker && customerParent?.id === shippingOrder.customer?.customerParent?.id);

  if (shippingOrder.domesticType || shippingOrder.borderCrossingType) {
    return null;
  }

  return (
    <CardPlane title={<FormattedMessage id="trackingPage.label.documents" />} contentClassName={classes.root}>
      {isAuthenticated && accessAllowed ? (
        <DocumentsContent
          needsDocuments={needsDocuments}
          downloadDocuments={downloadDocuments}
          shippingOrder={shippingOrder}
          refetch={refetch}
        />
      ) : (
        <LoginSection />
      )}
    </CardPlane>
  );
}

export default Documents;
