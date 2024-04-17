import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import SubmitButton from 'backend/js/components/SubmitButton';
import BaseApiService from 'backend/js/api/BaseApiService';
import FlashMessage from 'backend/js/components/FlashMessage';
import Input from 'backend/js/components/Form/Input';
import InventoryService from 'backend/js/api/InventoryService';
import PhoneInput from 'backend/js/components/Form/PhoneInput';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import useStates from 'frontend/js/hooks/useStates';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import TranslationProvider from 'backend/js/providers/TranslationProvider';
import CountryService from 'backend/js/api/CountryService';
import Breadcrumbs from 'backend/js/views/_Shared/Breadcrumbs';
import RouterService from 'backend/js/api/RouterService';
import InventoryEditFormValidationSchema from './InventoryLocationEditValidationSchema';
import FormikTickbox from '../../../../components/Form/FormikTickbox';

function InventoryLocationEdit({ inventoryLocation }) {
  const defaultFlash = { message: '', type: '' };
  const [flash, setFlash] = useState(defaultFlash);
  const [countries, setCountries] = useState([]);

  async function loadCountries() {
    try {
      const { data } = await new CountryService().getCountries();
      setCountries(data.countries);
    } catch (e) {
      /** Ignore */
    }
  }

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    setFlash({ message: '', type: 'error' });

    try {
      if (inventoryLocation.id) {
        await InventoryService.locationEdit(inventoryLocation.id, values);
      } else {
        const response = await InventoryService.locationCreate(values);
        inventoryLocation.id = response.inventoryLocation.id;
      }
      setFlash({ message: 'Saving successful', type: 'success' });
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });
    }

    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: {
      name: inventoryLocation.name || '',
      country: inventoryLocation.country?.id,
      state: inventoryLocation.state?.id,
      address: inventoryLocation.address || '',
      city: inventoryLocation.city || '',
      zip: inventoryLocation.zip || '',
      phone: inventoryLocation.phone || '',
      sellerId: inventoryLocation.sellerId || '',
      active: inventoryLocation.active || true,
    },
    validationSchema: InventoryEditFormValidationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const [states, isLoadingState] = useStates(formik.values.country);

  useEffect(() => {
    if (!isLoadingState && formik.values.stateCode) {
      const stateId = formik.values.state;
      formik.setFieldValue('state', stateId || '');
    }
  }, [isLoadingState]);

  useEffect(() => {
    (async () => {
      await loadCountries();
    })();
  }, []);

  return (
    <>
      <Breadcrumbs
        crumbs={[
          {
            label: 'Locations list',
            href: RouterService.getRoute('inventoryLocations'),
          },
          {
            label: inventoryLocation.id || 'Add',
          },
        ]}
        hasHomePage={false}
      />

      <div className="wrapper wrapper-content pt-0">
        <div className="ibox float-e-margins">
          <div className="ibox-content">
            {flash.message && <FlashMessage message={flash.message} type={flash.type} />}

            <form onSubmit={formik.handleSubmit} className="form-horizontal">
              <h3>Location</h3>
              <Input
                name="name"
                id="name"
                value={formik.values.name}
                error={formik.errors.name}
                label="Name"
                touched={formik.touched.name}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                labelClassName="col-sm-2"
                inputGroupClassName="col-sm-10"
              />
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="country">
                  Country
                </label>
                <div className="col-sm-10">
                  <SelectPlane
                    id="country"
                    name="country"
                    placeholder="Country"
                    value={formik.values.country}
                    options={countries}
                    error={formik.errors.country}
                    touched={formik.touched.country}
                    onChange={(name, value) => {
                      formik.setFieldValue(name, value);
                      formik.setFieldValue('state', '');
                    }}
                    onBlur={formik.setFieldTouched}
                    onChangeAttribute="id"
                    formatOptionLabel={(option) => option.name}
                    convertMobileSelectValue={(value) => parseInt(value, 10)}
                    isSearchable
                  />
                </div>
              </div>
              <Input
                name="address"
                id="address"
                label="Address"
                value={formik.values.address}
                error={formik.errors.address}
                touched={formik.touched.address}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                labelClassName="col-sm-2"
                inputGroupClassName="col-sm-10"
              />
              <Input
                name="city"
                id="city"
                label="City"
                value={formik.values.city}
                error={formik.errors.city}
                touched={formik.touched.city}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                labelClassName="col-sm-2"
                inputGroupClassName="col-sm-10"
              />
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="state">
                  State
                </label>
                <div className="col-sm-10">
                  <SelectPlane
                    id="state"
                    name="state"
                    placeholder="State"
                    value={formik.values.state}
                    options={states}
                    error={formik.errors.state}
                    touched={formik.touched.state}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                    onChangeAttribute="id"
                    formatOptionLabel={(option) => option.name}
                    isSearchable
                    convertMobileSelectValue={(value) => parseInt(value, 10)}
                  />
                </div>
              </div>
              <Input
                name="zip"
                id="zip"
                label="Zip"
                value={formik.values.zip}
                error={formik.errors.zip}
                touched={formik.touched.zip}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                labelClassName="col-sm-2"
                inputGroupClassName="col-sm-10"
              />
              <PhoneInput
                name="phone"
                id="phone"
                label="Phone"
                value={formik.values.phone}
                error={formik.errors.phone}
                touched={formik.touched.phone}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                onError={formik.setFieldError}
                inputComponent={Input}
                labelClassName="col-sm-2"
                inputGroupClassName="col-sm-10"
              />
              <div className="form-group">
                <div className="col-sm-10 col-sm-offset-2">
                  <FormikTickbox onChange={formik.setFieldValue} name="active" id="active" value={formik.values.active}>
                    Active
                  </FormikTickbox>
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
    </>
  );
}

InventoryLocationEdit.propTypes = {
  inventoryLocation: PropTypes.object,
};

InventoryLocationEdit.defaultProps = {
  inventoryLocation: {},
};

const $el = document.getElementById('inventory-location-edit');
if ($el) {
  const inventoryLocationData = $el.dataset.inventoryLocation ? JSON.parse($el.dataset.inventoryLocation) : {};
  ReactDOM.render(
    <ReactQueryProvider>
      <TranslationProvider>
        <InventoryLocationEdit inventoryLocation={inventoryLocationData} />
      </TranslationProvider>
    </ReactQueryProvider>,
    $el,
  );
}

export default InventoryLocationEdit;
