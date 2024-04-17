import React from 'react';
import { FormattedMessage as Message } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';

function FormattedMessage({ id, values, isWrapped, className }) {
  const Text = () => (
    <Message
      id={id}
      values={{
        br: <br />,
        span: (chunks) => <span>{chunks}</span>,
        ul: (chunks) => <ul>{chunks}</ul>,
        li: (chunks) => <li>{chunks}</li>,
        strong: (chunks) => <strong>{chunks}</strong>,
        p: (chunks) => <p>{chunks}</p>,
        ...values,
      }}
    />
  );

  return isWrapped || className ? (
    <div className={className}>
      <Text />
    </div>
  ) : (
    <Text />
  );
}

FormattedMessage.propTypes = {
  id: PropTypes.string.isRequired,
  values: PropTypes.object,
  className: PropTypes.string,
  isWrapped: PropTypes.bool,
};

FormattedMessage.defaultProps = {
  values: {},
  isWrapped: false,
  className: null,
};

export default FormattedMessage;
