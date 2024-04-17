import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function AmountCheckbox({ invoice, availableAmount, onChangeCheckbox, onChangeAmount }) {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(0);
  const unpaidAmount = parseFloat(
    availableAmount < invoice.balanceRemaining ? availableAmount : invoice.balanceRemaining,
  );

  function changeAmount(amount) {
    setValue(amount);
    onChangeAmount(parseFloat(amount), invoice);
  }

  function validateAmount(event) {
    const {
      target: { value: amountValue },
    } = event;

    const updated = parseFloat(amountValue);
    if (updated > unpaidAmount) {
      changeAmount(unpaidAmount);
    }
  }

  function changeCheckbox(isChecked) {
    setChecked(isChecked);
    onChangeCheckbox(isChecked, invoice, unpaidAmount);
  }

  useEffect(() => {
    const updatedAmount = checked ? unpaidAmount : 0;
    setValue(updatedAmount);
    onChangeAmount(updatedAmount, invoice);
  }, [checked]);

  return (
    <>
      <input type="checkbox" onChange={(e) => changeCheckbox(e.target.checked)} />
      {checked && (
        <input
          type="text"
          value={value}
          className="form-control single-line"
          onChange={(e) => changeAmount(e.target.value)}
          onBlur={validateAmount}
        />
      )}
    </>
  );
}

AmountCheckbox.propTypes = {
  invoice: PropTypes.object.isRequired,
  availableAmount: PropTypes.number.isRequired,
  onChangeCheckbox: PropTypes.func.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
};

export default AmountCheckbox;
