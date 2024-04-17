import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RouterService from 'backend/js/api/RouterService';

function Header({ brokersCount }) {
  const [openAllNotes, setOpenAllNotes] = useState(null);

  useEffect(() => {
    if (openAllNotes === null) {
      return;
    }
    document.querySelectorAll('.open-notes').forEach(($note) => {
      $note.click();
    });
  }, [openAllNotes]);

  function toggleNotesStatus() {
    setOpenAllNotes((value) => !value);
  }

  return (
    <div className="row mb-5">
      <div className="col-lg-3">
        <h2>Brokers ({brokersCount})</h2>
      </div>
      <div className="col-lg-6 text-center">
        {/* eslint-disable-next-line no-script-url,jsx-a11y/anchor-is-valid */}
        <a href="javascript:void(0);" style={{ lineHeight: '34px' }} onClick={toggleNotesStatus}>
          {openAllNotes ? 'Close' : 'Open'} all notes
        </a>
      </div>
      <div className="col-lg-3 text-right">
        <a href={RouterService.getRoute('customerParentCreate')} className="btn btn-primary">
          Create New Broker
        </a>
      </div>
    </div>
  );
}

Header.propTypes = {
  brokersCount: PropTypes.number.isRequired,
};

export default Header;
