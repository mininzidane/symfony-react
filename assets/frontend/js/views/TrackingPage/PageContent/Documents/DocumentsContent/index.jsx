import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import DocumentsStatus from './DocumentsStatus';
import UploadDocuments from './UploadDocuments';
import DownloadDocuments from './DownloadDocuments';

function Documents({ needsDocuments, downloadDocuments, shippingOrder, refetch }) {
  const isNeedsDocuments = Object.values(needsDocuments).some(Boolean);
  const isDownloadDocuments = downloadDocuments.length > 0;

  if (isNeedsDocuments) {
    return (
      <div>
        <UploadDocuments documents={needsDocuments} shippingOrder={shippingOrder} refetch={refetch} />

        <div style={{ paddingTop: 8 }}>
          <DownloadDocuments shippingOrder={shippingOrder} documents={downloadDocuments} />
        </div>
      </div>
    );
  }

  if (isDownloadDocuments) {
    return <DownloadDocuments shippingOrder={shippingOrder} documents={downloadDocuments} />;
  }

  return <DocumentsStatus title={<FormattedMessage id="trackingPage.documents.emptyState.title" />} isAuthorized />;
}

Documents.defaultProps = {
  needsDocuments: {},
  downloadDocuments: [],
  refetch: () => {},
};

Documents.propTypes = {
  needsDocuments: PropTypes.shape({
    bos: PropTypes.bool,
    wireConfirmation: PropTypes.bool,
    consignee: PropTypes.bool,
    userID: PropTypes.bool,
  }),
  downloadDocuments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
  shippingOrder: PropTypes.object.isRequired,
  refetch: PropTypes.func,
};

export default Documents;
