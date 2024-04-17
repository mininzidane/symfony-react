/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import MoreDetails from 'frontend/js/views/LotViewPage/VehicleConditionReport/Details/MoreDetails';
import AllDetailsModal from 'frontend/js/views/LotViewPage/VehicleConditionReport/Details/AllDetailsModal';
import useStyles from './useStyles';
import Row from './Row';

function Details({ details }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {details.slice(0, 5).map(({ key, note, score }, index) => (
        <Row label={key} score={score} note={note} index={index} />
      ))}
      <MoreDetails onClick={() => setIsModalOpen(true)} />
      <AllDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} details={details} />
    </div>
  );
}

export default Details;
