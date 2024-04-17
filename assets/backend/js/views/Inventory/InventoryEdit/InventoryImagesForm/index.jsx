import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import FlashMessage from 'backend/js/components/FlashMessage';
import InventoryService from 'backend/js/api/InventoryService';
import BaseApiService from 'backend/js/api/BaseApiService';
import FormikDropzone from 'backend/js/components/Form/FormikDropzone';
import SubmitButton from 'backend/js/components/SubmitButton';
import UploadedDocumentCard from 'backend/js/components/UploadedDocumentCard';
import ExternalImages from '../ExternalImages';

function InventoryImagesForm({ stockNumber, images: imagesInitial, externalImages: externalImagesInitial }) {
  const defaultFlash = { message: '', type: '' };
  const [flash, setFlash] = useState(defaultFlash);
  const [images, setImages] = useState([]);
  const [externalImages, setExternalImages] = useState({});
  const [checkedExternalImages, setCheckedExternalImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  useEffect(() => {
    const preparedImages = imagesInitial.map((imageUrl, index) => ({
      index,
      mime_type: 'image/*',
      active: true,
      s3_url: imageUrl,
      sort: index + 1,
    }));
    setImages(preparedImages);
  }, [imagesInitial]);

  useEffect(() => {
    const prepared = {};
    externalImagesInitial.forEach((item) => {
      prepared[item.id] = item;
    });
    setExternalImages(prepared);
  }, [externalImagesInitial]);

  function toggle(id) {
    if (checkedExternalImages.includes(id)) {
      delete checkedExternalImages[checkedExternalImages.indexOf(id)];
    } else {
      checkedExternalImages.push(id);
    }

    setCheckedExternalImages([...checkedExternalImages]);
  }

  async function handleImageUpload(values) {
    const formData = new FormData();

    images.forEach((file) => {
      formData.append(`sort_${file.index}`, file.sort);
      formData.append(`remove_${file.index}`, !file.active);
      formData.append(`images_${file.index}`, file.s3_url);
    });

    values.newImages.forEach((file, i) => formData.append(`newImages_${i}`, file));

    checkedExternalImages.forEach((id) => {
      formData.append('externalImages[]', externalImages[id].s3_url);
    });

    return InventoryService.upload(stockNumber, formData);
  }

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    setFlash({ message: '', type: 'error' });

    try {
      const response = await handleImageUpload(values);
      setImages(response.images);

      setFlash({ message: 'Saving successful', type: 'success' });
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });
    }

    values.newImages = [];
    setSubmitting(false);
  }

  function removeImage(file, value) {
    const newImages = images.map((v) => (v === file ? { ...v, active: value } : v));
    setImages(newImages);
  }

  function handleDragStart(e, index) {
    setCurrentImageIndex(index);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, imageIndex) {
    e.preventDefault();
    setImages((v) => {
      const newImages = [...v];
      [newImages[imageIndex].sort, newImages[currentImageIndex].sort] = [
        newImages[currentImageIndex].sort,
        newImages[imageIndex].sort,
      ];
      newImages.sort((a, b) => a.sort - b.sort);
      return newImages;
    });
    setCurrentImageIndex(null);
  }

  return (
    <Formik
      initialValues={{
        newImages: [],
      }}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
        <div className="wrapper wrapper-content">
          <div className="ibox float-e-margins">
            <div className="ibox-content">
              {flash.message && <FlashMessage message={flash.message} type={flash.type} />}
              <form onSubmit={handleSubmit} className="container">
                <FormikDropzone
                  id="newImages"
                  name="newImages"
                  label="Upload"
                  fileValues={values.newImages}
                  accept="image/*,.pdf"
                  error={errors.newImages}
                  touched={touched.newImages}
                  onChange={setFieldValue}
                  onTouched={setFieldTouched}
                  onError={setFieldError}
                  multiple
                />
                <hr />
                <div className="uploaded-documents__card-list">
                  {images.map((document, index) => (
                    <div
                      key={document.s3_url}
                      className="uploaded-documents__card-list"
                      onDrop={(e) => handleDrop(e, index)}
                      onDragOver={handleDragOver}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                    >
                      <UploadedDocumentCard
                        document={document}
                        removeCallback={(file) => removeImage(file, false)}
                        undoRemoveCallback={(file) => removeImage(file, true)}
                      />
                    </div>
                  ))}
                </div>

                <ExternalImages
                  images={Object.values(externalImages)}
                  checked={checkedExternalImages}
                  toggle={toggle}
                />
                <hr />

                <div className="text-center">
                  <SubmitButton label="Save" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

InventoryImagesForm.TAB_NAME = 'images';

InventoryImagesForm.propTypes = {
  images: PropTypes.array,
  stockNumber: PropTypes.number.isRequired,
  externalImages: PropTypes.array,
};

InventoryImagesForm.defaultProps = {
  images: [],
  externalImages: [],
};

export default InventoryImagesForm;
