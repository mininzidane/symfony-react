import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Select from 'backend/js/components/Form/Select';
import TextArea from 'backend/js/components/Form/TextArea';
import SubmitButton from 'backend/js/components/SubmitButton';
import BaseApiService from 'backend/js/api/BaseApiService';
import FlashMessage from 'backend/js/components/FlashMessage';
import Input from 'backend/js/components/Form/Input';
import Button from 'backend/js/components/Button';
import InventoryService from 'backend/js/api/InventoryService';
import RouterService from 'backend/js/api/RouterService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import InventoryEditFormValidationSchema from './InventoryEditFormValidationSchema';
import InventoryImagesForm from '../InventoryImagesForm';

function InventoryEditForm({ inventoryData, setStockNumber, stockNumber, setActiveTab }) {
  const defaultFlash = { message: '', type: '' };
  const [flash, setFlash] = useState(defaultFlash);
  const [vinDecodeSubmitting, setVinDecodeSubmitting] = useState(false);
  const [filters, setFilters] = useState(null);

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    setFlash({ message: '', type: 'error' });

    try {
      const params = { ...values };
      const rawAmount = params.price.replace(/[^0-9.]/g, '');
      params.price = +parseFloat(rawAmount).toFixed(2);
      if (stockNumber) {
        await InventoryService.edit(stockNumber, params);
      } else {
        const response = await InventoryService.create(params);
        setStockNumber(response.stockNumber);
        const newUrl = `/abm-acp/inventory/edit/${response.stockNumber}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
      setActiveTab(InventoryImagesForm.TAB_NAME);
      setFlash({ message: 'Saving successful', type: 'success' });
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });
    }

    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: {
      sellerId: inventoryData.sellerId || '',
      vin: String(inventoryData.vin || RouterService.getQueryParam('vin') || '').toUpperCase(),
      year: String(inventoryData.year || ''),
      make: inventoryData.make ? inventoryData.make : '',
      model: inventoryData.model ? inventoryData.model : '',
      trim: inventoryData.trim ? inventoryData.trim : '',
      country: inventoryData.country || '',
      vehicleType: inventoryData.vehicleType || '',
      odometer: inventoryData.odometer ? NumberService.formatNumber(inventoryData.odometer) : '',
      odometerBrand: inventoryData.odometerBrand || '',
      color: inventoryData.color || '',
      bodyStyle: inventoryData.bodyStyle || '',
      engine: inventoryData.engine || '',
      cylinders: String(inventoryData.cylinders || ''),
      transmission: inventoryData.transmission || '',
      drive: inventoryData.drive || '',
      titleCategory: inventoryData.titleCategory || '',
      titleStateCode: inventoryData.titleStateCode || '',
      title: inventoryData.title || '',
      condition: inventoryData.condition || '',
      whereIsVehicleStatus: inventoryData.whereIsVehicleStatus || '',
      location: inventoryData.location || '',
      price: inventoryData.price ? NumberService.formatCurrency(inventoryData.price) : '',
      active: Number(inventoryData.active),
      notes: inventoryData.notes || '',
    },
    onSubmit,
    validationSchema: InventoryEditFormValidationSchema,
    enableReinitialize: false,
  });

  async function sendDecodeVin(vin) {
    if (!vin) {
      return;
    }
    setVinDecodeSubmitting(true);
    try {
      const response = await InventoryService.searchByVin(vin);
      setVinDecodeSubmitting(false);
      if (response === null) {
        return;
      }

      Object.keys(response).map((field) => formik.setFieldValue(field, response[field]));
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });
    }
    setVinDecodeSubmitting(false);
  }

  useEffect(() => {
    if (!stockNumber && RouterService.getQueryParam('vin')) {
      sendDecodeVin(RouterService.getQueryParam('vin'));
    }
  }, [stockNumber]);

  useEffect(() => {
    InventoryService.filters({ make: formik.values.make }).then((response) => {
      setFilters(response);
    });
  }, [formik.values.make]);

  if (!filters) {
    return null;
  }

  return (
    <div className="wrapper wrapper-content">
      <div className="ibox float-e-margins">
        <div className="ibox-content">
          {flash.message && <FlashMessage message={flash.message} type={flash.type} />}
          <form onSubmit={formik.handleSubmit} className="container">
            <h3>Basic Information</h3>
            <div className="row form-group">
              <div className="col-sm-9">
                <Input
                  value={formik.values.vin}
                  error={formik.errors.vin}
                  placeholder="VIN"
                  touched={formik.touched.vin}
                  onChange={(name, value) => {
                    formik.setFieldValue(name, String(value).toUpperCase());
                  }}
                  onBlur={formik.setFieldTouched}
                  onError={formik.setFieldError}
                  required
                  name="vin"
                  id="vin"
                />
              </div>
              <div className="col-sm-3">
                <Button
                  label="Search"
                  className="btn-primary full-width"
                  onClick={() => {
                    sendDecodeVin(formik.values.vin);
                  }}
                  isLoading={vinDecodeSubmitting}
                  disabled={vinDecodeSubmitting}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-3">
                <Select
                  id="make"
                  name="make"
                  placeholder="Select Make"
                  className="react-select-hollow"
                  required
                  value={formik.values.make}
                  error={formik.errors.make}
                  touched={formik.touched.make}
                  onBlur={formik.setFieldTouched}
                  options={(filters.make?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={(name, value) => {
                    formik.setFieldValue('model', '');
                    formik.setFieldValue(name, value);
                  }}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-3">
                <Select
                  id="model"
                  name="model"
                  placeholder="Select Model"
                  className="react-select-hollow"
                  required
                  value={formik.values.model}
                  error={formik.errors.model}
                  touched={formik.touched.model}
                  onBlur={formik.setFieldTouched}
                  options={(filters.model_group?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-3">
                <Select
                  id="year"
                  name="year"
                  placeholder="Select Year"
                  className="react-select-hollow"
                  required
                  value={formik.values.year}
                  error={formik.errors.year}
                  touched={formik.touched.year}
                  onBlur={formik.setFieldTouched}
                  options={(filters.years.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-3">
                <Input
                  id="trim"
                  name="trim"
                  placeholder="Trim"
                  required
                  value={formik.values.trim}
                  error={formik.errors.trim}
                  touched={formik.touched.trim}
                  onBlur={formik.setFieldTouched}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
            </div>

            <h3>Specifications</h3>
            <div className="row form-group">
              <div className="col-sm-6">
                <Select
                  id="country"
                  name="country"
                  placeholder="Select Country"
                  className="react-select-hollow"
                  required
                  value={formik.values.country}
                  error={formik.errors.country}
                  touched={formik.touched.country}
                  onBlur={formik.setFieldTouched}
                  options={filters.countries}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-6">
                <Select
                  id="vehicleType"
                  name="vehicleType"
                  placeholder="Select Vehicle Type"
                  className="react-select-hollow"
                  required
                  value={formik.values.vehicleType}
                  error={formik.errors.vehicleType}
                  touched={formik.touched.vehicleType}
                  onBlur={formik.setFieldTouched}
                  options={(filters.vehicle_type?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-3">
                <Input
                  name="odometer"
                  id="odometer"
                  placeholder="Odometer Value"
                  required
                  value={formik.values.odometer}
                  error={formik.errors.odometer}
                  touched={formik.touched.odometer}
                  onChange={(name, value) => {
                    formik.setFieldValue(name, value ? NumberService.formatNumber(value.replace(/[^0-9.]/g, '')) : '');
                  }}
                  onBlur={formik.setFieldTouched}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-3">
                <Select
                  id="odometerBrand"
                  name="odometerBrand"
                  placeholder="Odometer Brand"
                  className="react-select-hollow"
                  required
                  value={formik.values.odometerBrand}
                  error={formik.errors.odometerBrand}
                  touched={formik.touched.odometerBrand}
                  onBlur={formik.setFieldTouched}
                  options={(filters.odometer_brand?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-3">
                <Select
                  id="color"
                  name="color"
                  placeholder="Select Color"
                  className="react-select-hollow"
                  required
                  value={formik.values.color}
                  error={formik.errors.color}
                  touched={formik.touched.color}
                  onBlur={formik.setFieldTouched}
                  options={(filters.color?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-3">
                <Select
                  id="bodyStyle"
                  name="bodyStyle"
                  placeholder="Select Body Style"
                  className="react-select-hollow"
                  required
                  value={formik.values.bodyStyle}
                  error={formik.errors.bodyStyle}
                  touched={formik.touched.bodyStyle}
                  onBlur={formik.setFieldTouched}
                  options={(filters.body_style?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-3">
                <Select
                  id="engine"
                  name="engine"
                  placeholder="Select Engine"
                  className="react-select-hollow"
                  required
                  value={formik.values.engine}
                  error={formik.errors.engine}
                  touched={formik.touched.engine}
                  onBlur={formik.setFieldTouched}
                  options={(filters.engine_type?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-3">
                <Select
                  id="cylinders"
                  name="cylinders"
                  placeholder="Select Cylinders"
                  className="react-select-hollow"
                  required
                  value={formik.values.cylinders}
                  error={formik.errors.cylinders}
                  touched={formik.touched.cylinders}
                  onBlur={formik.setFieldTouched}
                  options={(filters.cylinders?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-3">
                <Select
                  id="transmission"
                  name="transmission"
                  placeholder="Select Transmission"
                  className="react-select-hollow"
                  required
                  value={formik.values.transmission}
                  error={formik.errors.transmission}
                  touched={formik.touched.transmission}
                  onBlur={formik.setFieldTouched}
                  options={(filters.transmission?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-3">
                <Select
                  id="drive"
                  name="drive"
                  placeholder="Select Drive"
                  className="react-select-hollow"
                  required
                  value={formik.values.drive}
                  error={formik.errors.drive}
                  touched={formik.touched.drive}
                  onBlur={formik.setFieldTouched}
                  options={(filters.drive?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-3">
                <Select
                  id="titleCategory"
                  name="titleCategory"
                  placeholder="Select Title Category"
                  className="react-select-hollow"
                  required
                  value={formik.values.titleCategory}
                  error={formik.errors.titleCategory}
                  touched={formik.touched.titleCategory}
                  onBlur={formik.setFieldTouched}
                  options={(filters.doc_type?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-3 d-flex">
                <div style={{ width: '100px' }}>
                  <Select
                    id="titleStateCode"
                    name="titleStateCode"
                    placeholder="State"
                    className="mr-5"
                    required
                    value={formik.values.titleStateCode}
                    error={formik.errors.titleStateCode}
                    touched={formik.touched.titleStateCode}
                    options={filters.states_of_usa}
                    onBlur={formik.setFieldTouched}
                    onChange={formik.setFieldValue}
                    onError={formik.setFieldError}
                  />
                </div>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={formik.values.title}
                  error={formik.errors.title}
                  touched={formik.touched.title}
                  onBlur={formik.setFieldTouched}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                />
              </div>
              <div className="col-sm-6">
                <Select
                  id="condition"
                  name="condition"
                  placeholder="Select Condition"
                  className="react-select-hollow"
                  required
                  value={formik.values.condition}
                  error={formik.errors.condition}
                  touched={formik.touched.condition}
                  onBlur={formik.setFieldTouched}
                  options={(filters.damage?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
            </div>

            <h3>Sale Information</h3>
            <div className="row form-group">
              <div className="col-sm-6">
                <Select
                  id="whereIsVehicleStatus"
                  name="whereIsVehicleStatus"
                  placeholder="Where Is Vehicle"
                  className="react-select-hollow"
                  required
                  value={formik.values.whereIsVehicleStatus}
                  error={formik.errors.whereIsVehicleStatus}
                  touched={formik.touched.whereIsVehicleStatus}
                  onBlur={formik.setFieldTouched}
                  options={(filters.where_is_vehicle_status?.values?.all || []).map((item) => ({
                    label: item.label,
                    value: item.key,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
              <div className="col-sm-6">
                <Select
                  id="location"
                  name="location"
                  placeholder="Location"
                  className="react-select-hollow"
                  required
                  value={formik.values.location}
                  error={formik.errors.location}
                  touched={formik.touched.location}
                  onBlur={formik.setFieldTouched}
                  options={filters.locations}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                  isSearchable
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <Input
                  name="price"
                  id="price"
                  placeholder="Enter Price"
                  required
                  value={formik.values.price}
                  error={formik.errors.price}
                  touched={formik.touched.price}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                  onError={formik.setFieldError}
                  mask="currency"
                />
                <Select
                  id="active"
                  name="active"
                  placeholder="Select Status"
                  className="react-select-hollow"
                  required
                  value={formik.values.active}
                  error={formik.errors.active}
                  touched={formik.touched.active}
                  onBlur={formik.setFieldTouched}
                  options={[1, 0].map((status) => ({
                    label: status ? 'Active' : 'Inactive',
                    value: status,
                  }))}
                  onChange={formik.setFieldValue}
                  onError={formik.setFieldError}
                />
              </div>
              <div className="col-sm-6">
                <TextArea
                  id="notes"
                  name="notes"
                  label="Note (optional)"
                  value={formik.values.notes}
                  error={formik.errors.notes}
                  touched={formik.touchednotes}
                  className="textarea-hollow m-b-sm"
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                  onError={formik.setFieldError}
                />
              </div>
            </div>
            <hr />

            <div className="text-center">
              <SubmitButton
                label="Save"
                className="btn-primary"
                isLoading={formik.isSubmitting}
                disabled={formik.isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

InventoryEditForm.TAB_NAME = 'info';

InventoryEditForm.propTypes = {
  inventoryData: PropTypes.object,
  setStockNumber: PropTypes.func.isRequired,
  stockNumber: PropTypes.number,
  setActiveTab: PropTypes.func,
};

InventoryEditForm.defaultProps = {
  inventoryData: {},
  stockNumber: null,
  setActiveTab: () => {},
};

export default InventoryEditForm;
