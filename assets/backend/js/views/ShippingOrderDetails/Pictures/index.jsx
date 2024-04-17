import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UploadedDocumentCard from 'backend/js/components/UploadedDocumentCard';
import PicturesUploadForm from 'backend/js/views/ShippingOrderDetails/PicturesUploadForm';
import NotificationService from 'backend/js/lib/NotificationService';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';

const UNLOADING_PICTURES_TYPE = 3;

class Pictures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warehousePictures: props.documents.filter((item) => item.type === 2),
      driverPictures: props.documents.filter((item) => item.type === 1),
      unloadingPictures: props.documents.filter((item) => item.type === UNLOADING_PICTURES_TYPE),
      unloadingPicturesLoading: false,
    };

    this.handleSubmitUnloadingPictures = this.handleSubmitUnloadingPictures.bind(this);
    this.handleRemovePicture = this.handleRemovePicture.bind(this);
  }

  handleSubmitUnloadingPictures(values, resetForm) {
    const { orderId } = this.props;

    this.setState({ unloadingPicturesLoading: true });
    return ShippingOrderService.uploadPicture(orderId, values)
      .then(({ pictures }) => {
        this.setState({ unloadingPictures: pictures.filter((item) => item.type === UNLOADING_PICTURES_TYPE) || [] });
      })
      .catch((error) => {
        const {
          response: {
            data: { errors },
          },
        } = error;

        Object.keys(errors).forEach((serverError) => NotificationService.showErrorMessage(errors[serverError]));
      })
      .finally(() => {
        this.setState({ unloadingPicturesLoading: false });
        resetForm();
      });
  }

  handleRemovePicture(document) {
    const { orderId } = this.props;
    const { unloadingPictures } = this.state;
    ShippingOrderService.deletePicture(orderId, document.id)
      .then(() => {
        this.setState({ unloadingPictures: unloadingPictures.filter((item) => item.id !== document.id) || [] });
      })
      .catch((error) => {
        const {
          response: {
            data: { errors },
          },
        } = error;

        Object.keys(errors).forEach((serverError) => NotificationService.showErrorMessage(errors[serverError]));
      });
  }

  render() {
    const { driverPictures, warehousePictures, unloadingPictures, unloadingPicturesLoading } = this.state;

    return (
      <div className="vehicle-bol">
        <h4 className="vehicle-bol__header">Pick Up Images ({driverPictures.length})</h4>

        <div className="uploaded-documents__card-list">
          {driverPictures.map((document) => (
            <UploadedDocumentCard key={document.id} document={document} />
          ))}
        </div>

        <h4 className="vehicle-bol__header">Warehouse Images ({warehousePictures.length})</h4>

        <div className="uploaded-documents__card-list">
          {warehousePictures.map((document) => (
            <UploadedDocumentCard key={document.id} document={document} />
          ))}
        </div>

        <h4 className="vehicle-bol__header">Unloading Pictures ({unloadingPictures.length})</h4>

        <div className="uploaded-documents__card-list">
          {unloadingPictures.map((document) => (
            <UploadedDocumentCard key={document.id} document={document} removeCallback={this.handleRemovePicture} />
          ))}

          <PicturesUploadForm
            onSubmit={this.handleSubmitUnloadingPictures}
            loading={unloadingPicturesLoading}
            type={UNLOADING_PICTURES_TYPE}
          />
        </div>
      </div>
    );
  }
}

Pictures.propTypes = {
  documents: PropTypes.array.isRequired,
  orderId: PropTypes.number.isRequired,
};

export default Pictures;
