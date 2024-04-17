/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from '../index';

function FormattedMessageBlock({ id, ...params }) {
  return (
    <div {...params}>
      <FormattedMessage id={id} />
    </div>
  );
}

export default FormattedMessageBlock;
