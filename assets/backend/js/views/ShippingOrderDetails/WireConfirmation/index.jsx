import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationService from 'backend/js/lib/NotificationService';
import UploadedDocumentCard from 'backend/js/components/UploadedDocumentCard';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';
import WireConfirmationForm from '../WireConfirmationForm';

class WireConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      documents: props.documents,
    };

    this.messages = {
      loadError: 'Unable to load WireConfirmation documents for this order',
      deleteError: 'Unable to deactivate WireConfirmation.',
      deleteSuccess: 'WireConfirmation was deleted',
    };

    this.shippingOrderService = ShippingOrderService;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setLoading(loading = false) {
    this.setState({ loading });
  }

  handleSubmit(values) {
    const { documents: currentDocuments } = this.state;
    const { orderId } = this.props;

    this.setLoading(true);
    return this.shippingOrderService
      .uploadWireConfirmationDocuments(orderId, values)
      .then(({ documents, uploadErrors }) => {
        const newDocuments = documents.concat(currentDocuments.slice());
        this.setState({ documents: newDocuments }, () => this.setActiveDocument());

        if (uploadErrors && uploadErrors.length) {
          const errorMessage = uploadErrors.join(' ');
          NotificationService.showErrorMessage(errorMessage);
        }
      })
      .catch((error) => {
        const {
          response: {
            data: { errors },
          },
        } = error;

        Object.keys(errors).forEach((serverError) => NotificationService.showErrorMessage(errors[serverError]));
      })
      .finally(() => this.setLoading(false));
  }

  render() {
    const { loading, documents } = this.state;

    return (
      <div className="vehicle-bol">
        <h4 className="vehicle-bol__header">Wire Confirmations ({documents.length})</h4>

        <div className="uploaded-documents__card-list">
          {documents.map((document) => (
            <UploadedDocumentCard key={document.id} document={document} />
          ))}
        </div>

        {documents.length === 0 && (
          <div className="bol-form-wrapper">
            <WireConfirmationForm onSubmit={this.handleSubmit} loading={loading} />
          </div>
        )}
      </div>
    );
  }
}

WireConfirmation.propTypes = {
  orderId: PropTypes.number.isRequired,
  documents: PropTypes.array.isRequired,
};

export default WireConfirmation;
