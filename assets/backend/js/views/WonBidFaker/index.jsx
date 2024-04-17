import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import PropTypes from 'prop-types';
import WonBidFakerForm from './WonBidFakerForm';
import FlashMessage from '../../components/FlashMessage';
import WonBidFakerService from '../../api/WonBidFakerService';

function WonBidFaker({ bidders }) {
  const defaultFlash = { message: '', type: '' };
  const [flash, setFlash] = useState(defaultFlash);
  const wonBidFakerService = new WonBidFakerService();

  async function handleOnSubmit(payload) {
    setFlash(defaultFlash);
    return wonBidFakerService.createBid(payload);
  }

  function handleOnSubmitSuccess() {
    const message = `Fake bid created, lot purchase will be generated via message queue`;
    setFlash({ message, type: 'success' });
  }

  function handleOnSubmitError(errorMessages) {
    setFlash({ message: errorMessages, type: 'error' });
  }

  return (
    <div className="wrapper wrapper-content">
      {flash.message && <FlashMessage message={flash.message} type={flash.type} />}

      <div className="ibox float-e-margins">
        <div className="ibox-title">
          <h2>Create fake won bid</h2>
        </div>

        <div className="ibox-content">
          <WonBidFakerForm
            bidders={bidders}
            onSubmit={handleOnSubmit}
            onSubmitSuccess={handleOnSubmitSuccess}
            onSubmitError={handleOnSubmitError}
            setFlash={setFlash}
          />
        </div>
      </div>
    </div>
  );
}

WonBidFaker.propTypes = {
  bidders: PropTypes.arrayOf(PropTypes.object),
};

WonBidFaker.defaultProps = {
  bidders: [],
};

const $el = document.getElementById('won-bid-faker');
if ($el) {
  const bidders = $el.dataset.bidders ? JSON.parse($el.dataset.bidders) : [];
  ReactDOM.render(
    <ReactQueryProvider>
      <WonBidFaker bidders={bidders} />
    </ReactQueryProvider>,
    $el,
  );
}
