import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import CustomerService from 'backend/js/api/CustomerService';
import RouterService from 'backend/js/api/RouterService';
import AddressFieldsFormik from 'backend/js/views/_Shared/Forms/AddressFieldsFormik';
import SubmitButton from 'backend/js/components/SubmitButton';
import Input from 'backend/js/components/Form/Input';
import PhoneInputPlane from 'backend/js/components/Form/PhoneInputPlane';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import BaseApiService from 'backend/js/api/BaseApiService';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function EditForm({ customer }) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  async function onSubmit(values, { setSubmitting }) {
    try {
      await new CustomerService().updateCustomer(customer.id, values);
      enqueueSnackbar('Your information was successfully saved', { variant: 'success' });
      RouterService.redirect('customerNotes', null, { id: customer.id });
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });

      setSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      // Account Information
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      company: customer.company || '',
      invoiceCompany: Boolean(customer.invoiceCompany),
      phoneNumber: customer.phoneNumber || '',
      optionalNumber: customer.optionalNumber || '',
      homeNumber: customer.homeNumber || '',
      // Physical Address
      address: customer.address || '',
      city: customer.city || '',
      state: customer.state?.id || '',
      zip: customer.zip || '',
      country: customer.country?.id || '',
      // Mailing Address
      mailingAddress: customer.mailingAddress || '',
      mailingApartment: customer.mailingApartment || '',
      mailingAsPhysical: Boolean(customer.mailingAsPhysical),
      mailingCity: customer.mailingCity || '',
      mailingName: customer.mailingName || '',
      mailingPhone: customer.mailingPhone || '',
      mailingState: customer.mailingState?.id || '',
      mailingZip: customer.mailingZip || '',
      mailingCountry: customer.mailingCountry?.id || '',
      acpSpeakPermissions: customer.acpSpeakPermissions || '',
    },
    onSubmit,
    validationSchema,
  });

  const { mailingAsPhysical: isMailingAsPhysical, invoiceCompany: isInvoiceCompany } = formik.values;

  const mailingAddressDisabled = isInvoiceCompany || isMailingAsPhysical;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.form}>
        <div className={classnames(classes.column, classes.contactInformation)}>
          <div className={classes.title}>Account Information</div>
          <div>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              disabled={Boolean(formik.values.firstName)}
              value={formik.values.firstName}
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          </div>
          <div>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              disabled={Boolean(formik.values.lastName)}
              value={formik.values.lastName}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          </div>
          <div>
            <Input
              id="company"
              name="company"
              placeholder="Company"
              disabled
              value={formik.values.company}
              error={formik.errors.company}
              touched={formik.touched.company}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              isAutoFocus
            />
          </div>
          <div className={classes.tickbox}>
            <FormikTickbox
              id="invoiceCompany"
              name="invoiceCompany"
              value={formik.values.invoiceCompany}
              error={formik.errors.invoiceCompany}
              touched={formik.touched.invoiceCompany}
              onChange={formik.setFieldValue}
            >
              I confirm all my invoices will be issued to my company name
            </FormikTickbox>
          </div>

          <div>
            <PhoneInputPlane
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              value={formik.values.phoneNumber}
              error={formik.errors.phoneNumber}
              touched={formik.touched.phoneNumber}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              isLabelOnTop
            />
          </div>

          <div>
            <PhoneInputPlane
              id="homeNumber"
              name="homeNumber"
              label="Home Number"
              value={formik.values.homeNumber}
              error={formik.errors.homeNumber}
              touched={formik.touched.homeNumber}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              isLabelOnTop
            />
          </div>

          <div>
            <PhoneInputPlane
              id="optionalNumber"
              name="optionalNumber"
              label="Optional Number"
              value={formik.values.optionalNumber}
              error={formik.errors.optionalNumber}
              touched={formik.touched.optionalNumber}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              isLabelOnTop
            />
          </div>
        </div>

        <div className={classnames(classes.column, classes.address)}>
          <div className={classes.title}>Address</div>
          <AddressFieldsFormik formik={formik} hideApartment />
        </div>

        <div className={classnames(classes.column, classes.mailingAddress)}>
          <div className={classes.title}>Mailing Address</div>

          <div>
            <Input
              id="mailingName"
              name="mailingName"
              placeholder="Name"
              value={formik.values.mailingName}
              error={formik.errors.mailingName}
              touched={formik.touched.mailingName}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          </div>

          <div>
            <PhoneInputPlane
              id="mailingPhone"
              name="mailingPhone"
              value={formik.values.mailingPhone}
              error={formik.errors.mailingPhone}
              touched={formik.touched.mailingPhone}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          </div>

          <AddressFieldsFormik
            formik={formik}
            config={{
              address: {
                name: 'mailingAddress',
                value: isMailingAsPhysical ? formik.values.address || '' : formik.values.mailingAddress,
                disabled: mailingAddressDisabled,
              },
              apartment: {
                name: 'mailingApartment',
                disabled: mailingAddressDisabled,
              },
              city: {
                name: 'mailingCity',
                value: isMailingAsPhysical ? formik.values.city : formik.values.mailingCity,
                disabled: mailingAddressDisabled,
              },
              state: {
                name: 'mailingState',
                value: isMailingAsPhysical ? formik.values.state : formik.values.mailingState,
                disabled: mailingAddressDisabled,
              },
              zip: {
                name: 'mailingZip',
                value: isMailingAsPhysical ? formik.values.zip : formik.values.mailingZip,
                disabled: mailingAddressDisabled,
              },
              country: {
                name: 'mailingCountry',
                value: isMailingAsPhysical ? formik.values.country : formik.values.mailingCountry,
                disabled: mailingAddressDisabled,
              },
            }}
          />
          <div className={classes.tickboxInline}>
            <FormikTickbox
              id="mailingAsPhysical"
              name="mailingAsPhysical"
              value={formik.values.mailingAsPhysical}
              error={formik.errors.mailingAsPhysical}
              touched={formik.touched.mailingAsPhysical}
              onChange={formik.setFieldValue}
            >
              Use my physical address as my mailing address
            </FormikTickbox>
          </div>
        </div>
        <div className={classnames(classes.column, classes.acpSettings)}>
          <div className={classes.title}>Acp Settings</div>
          <div>
            <Input
              id="acpSpeakPermissions"
              name="acpSpeakPermissions"
              placeholder="Permission to speak"
              value={formik.values.acpSpeakPermissions}
              error={formik.errors.acpSpeakPermissions}
              touched={formik.touched.acpSpeakPermissions}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
            />
          </div>
        </div>
      </div>
      <SubmitButton
        label="Update Information"
        className="btn-primary mt-15"
        isLoading={formik.isSubmitting}
        disabled={formik.isSubmitting}
      />
    </form>
  );
}

EditForm.propTypes = {
  customer: PropTypes.object.isRequired,
};

export default EditForm;
