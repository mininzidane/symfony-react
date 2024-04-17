import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationService from 'backend/js/lib/NotificationService';
import UploadedDocumentCard from 'backend/js/components/UploadedDocumentCard';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';
import BosUploadForm from '../BosUploadForm';

class Bos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      documents: props.documents,
    };

    this.messages = {
      loadError: 'Unable to load BOS documents for this vehicle',
      deleteError: 'Unable to deactivate vehicle bos.',
      deleteSuccess: 'Vehicle BOS was deleted',
    };

    this.vehicleService = ShippingOrderService;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setLoading(loading = false) {
    this.setState({ loading });
  }

  handleSubmit(values) {
    const { documents: currentDocuments } = this.state;
    const { orderId } = this.props;

    this.setLoading(true);
    return this.vehicleService
      .uploadBosDocuments(orderId, values)
      .then(({ documents, uploadErrors }) => {
        const newDocuments = documents.concat(currentDocuments.slice());
        this.setState({ documents: newDocuments });

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
      <div className="vehicle-bos">
        <h4 className="vehicle-bos__header">BOS Documents ({documents.length})</h4>

        <div className="uploaded-documents__card-list">
          {documents.map((document) => (
            <UploadedDocumentCard key={document.id} document={document} />
          ))}
        </div>

        {documents.length === 0 && (
          <div className="bos-form-wrapper">
            <BosUploadForm onSubmit={this.handleSubmit} loading={loading} />
          </div>
        )}
      </div>
    );
  }
}

Bos.propTypes = {
  orderId: PropTypes.number.isRequired,
  documents: PropTypes.array.isRequired,
};

export default Bos;
