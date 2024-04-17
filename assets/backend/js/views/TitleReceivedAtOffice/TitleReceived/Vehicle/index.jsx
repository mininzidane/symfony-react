import React from 'react';
import PropTypes from 'prop-types';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Button from 'backend/js/components/Button';
import RouterService from 'backend/js/api/RouterService';

function TitleReceivedVehicle({
  id,
  token,
  vin,
  lot,
  description,
  vehicle_status,
  title_status,
  isFl2Fl,
  isCa2Ca,
  isConsignment,
  isSignatureRequired,
  isEh,
  isExport,
  isFlExport,
  isJunkTitle,
  isReadyToMail,
  isAventura,
  isOrDmv,
  onDeleteVehicle,
  isSyc,
}) {
  function handleDelete(event, vehicleId) {
    event.preventDefault();
    onDeleteVehicle(vehicleId);
  }

  return (
    <div className="d-f f-wrap ai-ct">
      <b className="mr-10">{description}</b>
      <span className="mr-10">
        VIN: <b>{vin}</b>
      </span>
      <span className="mr-10">
        Lot #:{' '}
        <a
          href={RouterService.getRoute('backendLotPurchaseView', '', { token })}
          target="_blank"
          rel="noopener noreferrer"
        >
          {lot}
        </a>
      </span>
      <span className="text-muted mr-10">
        Vehicle/Title Status: {vehicle_status} / {title_status}
      </span>
      {onDeleteVehicle && (
        <Button
          className="btn btn-sm btn-danger mr-10"
          onClick={(event) => handleDelete(event, id)}
          label={<span className="fa fa-trash" />}
        />
      )}

      {isCa2Ca && <span className="badge mr-10">CA2CA</span>}

      {isFl2Fl && <span className="badge mr-10">FL2FL</span>}

      {isJunkTitle && <span className="badge mr-10">Junk Title</span>}

      {isEh && <span className="badge mr-10">EH</span>}

      {isExport && <span className="badge mr-10">Export</span>}

      {isFlExport && <span className="badge mr-10">FL Export</span>}

      {isConsignment && <span className="label label-danger mr-10">Consignment</span>}

      {isReadyToMail && <span className="label label-info">Ready To Mail</span>}

      {isAventura && <span className="badge">Aventura</span>}

      {isSignatureRequired && <span className="badge">Signature required</span>}

      {isSyc && <span className="badge">SYC</span>}
    </div>
  );
}

TitleReceivedVehicle.propTypes = {
  onDeleteVehicle: PropTypes.func,
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  lot: PropTypes.number.isRequired,
  vin: PropTypes.string.isRequired,
  vehicle_status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title_status: PropTypes.string.isRequired,
  isFl2Fl: PropTypes.bool,
  isCa2Ca: PropTypes.bool,
  isConsignment: PropTypes.bool,
  isSignatureRequired: PropTypes.bool,
  isEh: PropTypes.bool,
  isExport: PropTypes.bool,
  isFlExport: PropTypes.bool,
  isJunkTitle: PropTypes.bool,
  isReadyToMail: PropTypes.bool,
  isAventura: PropTypes.bool,
  isOrDmv: PropTypes.bool,
  isSyc: PropTypes.bool,
};

TitleReceivedVehicle.defaultProps = {
  onDeleteVehicle: null,
  isFl2Fl: false,
  isCa2Ca: false,
  isConsignment: false,
  isSignatureRequired: false,
  isEh: false,
  isExport: false,
  isFlExport: false,
  isJunkTitle: false,
  isReadyToMail: false,
  isAventura: false,
  isOrDmv: false,
  isSyc: false,
};

export default TitleReceivedVehicle;
