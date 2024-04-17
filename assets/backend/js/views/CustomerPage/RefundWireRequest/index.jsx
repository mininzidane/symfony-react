import ReactDOM from 'react-dom';
import React from 'react';
import IbanNumber from './ibanNumber';

const $el = document.getElementById('refund-wire-request-iban');
if ($el) {
  const value = $el.getAttribute('data-value');
  ReactDOM.render(<IbanNumber value={value} />, $el);
}
