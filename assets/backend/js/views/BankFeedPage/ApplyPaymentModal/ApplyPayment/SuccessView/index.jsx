import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonLink from 'backend/js/components/ButtonLink';
import ViewDetailsModal from './ViewDetailsModal';

function SuccessView({ id, hasViewDetails, title }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <span>
        <b>
          Your payment was submitted{id && `, Ref#${id}`}
          {hasViewDetails && (
            <>
              {' '}
              (
              <ButtonLink
                style={{ color: '#3c763d' }}
                label="view details"
                isDashed
                onClick={() => {
                  setIsOpened(true);
                }}
              />
              )
            </>
          )}
        </b>
      </span>
      {hasViewDetails && (
        <ViewDetailsModal invoice={id} title={title} isOpen={isOpened} onClose={() => setIsOpened(false)} />
      )}
    </>
  );
}

SuccessView.defaultProps = {
  hasViewDetails: false,
  id: '',
  title: '',
};

SuccessView.propTypes = {
  id: PropTypes.string,
  hasViewDetails: PropTypes.bool,
  title: PropTypes.string,
};

export default SuccessView;
