import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from 'frontend/js/components/Form/RadioGroup';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import FlatTiresModal from './FlatTiresModal';
import useStyles from '../useStyles';

function WheelsAndTiresForm({ formik, name, options, isDisabled }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { FLAT_TIRES_LIST } = InstantOfferService;

  function handleSubmit() {
    setTimeout(() => {
      formik.handleSubmit();
    }, 100);
  }

  function handleSuccess() {
    setIsOpen(false);
    const hasFlatTires = [
      formik.values.flatTireDriverSideFront,
      formik.values.flatTirePassengerSideFront,
      formik.values.flatTireDriverSideRear,
      formik.values.flatTirePassengerSideRear,
    ].some(Boolean);
    if (hasFlatTires) {
      handleSubmit();
    } else {
      formik.setFieldValue(name, FLAT_TIRES_LIST.ALL_WHEELS_ARE_MOUNTED);
    }
  }
  function handleClose() {
    setIsOpen(false);
    formik.setFieldValue(name, FLAT_TIRES_LIST.ALL_WHEELS_ARE_MOUNTED);
    formik.setFieldValue('flatTireDriverSideFront', false);
    formik.setFieldValue('flatTirePassengerSideFront', false);
    formik.setFieldValue('flatTireDriverSideRear', false);
    formik.setFieldValue('flatTirePassengerSideRear', false);
  }

  return (
    <form onSubmit={formik.handleSubmit} className={classes.grid}>
      <RadioGroup
        name={name}
        options={options}
        value={formik.values[name]}
        onChange={(nameField, value) => {
          formik.setFieldValue(nameField, value);
          if (value === FLAT_TIRES_LIST.ONE_OR_MORE_TIRES_ARE_FLAT) {
            setIsOpen(true);
          } else {
            handleSubmit();
          }
        }}
        className={classes.radioGroup}
        isDisabled={isDisabled}
        viewType="roundCheckmark"
        size="lg"
      />
      <FlatTiresModal formik={formik} isOpen={isOpen} onClose={handleClose} onSuccess={handleSuccess} />
    </form>
  );
}

WheelsAndTiresForm.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool,
};

WheelsAndTiresForm.defaultProps = {
  isDisabled: false,
};

export default WheelsAndTiresForm;
