import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ConsignmentDetails from '../ConsignmentDetails';
import ResultsTable from './ResultsTable';

function BidHistoryModal({ consignment, isOpen, onClose }) {
  const [bidHistory, setBidHistory] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [sortValue, setSortValue] = useState({ sort: 'date', order: 'desc' });

  async function loadBidHistory() {
    try {
      const { data: response } = await ConsignmentService.bidApprovalVirtualbidlog(consignment.id);
      setBidHistory(response);
    } catch (e) {
      setNotFound(true);
    }
  }

  useEffect(() => {
    if (isOpen && !bidHistory && !notFound) {
      loadBidHistory();
    }
  }, [isOpen]);

  function handleSort(updatedSort, updatedOrder) {
    setSortValue({ sort: updatedSort, order: updatedOrder });
    const sortedRuns = bidHistory.runs.slice().sort((runA, runB) => {
      let comparison = 0;
      if (updatedSort === 'auctionDate') {
        comparison = new Date(runA.saleDate.date) - new Date(runB.saleDate.date);
      }
      return updatedOrder === 'asc' ? comparison : -comparison;
    });
    setBidHistory({ ...bidHistory, runs: sortedRuns });
  }

  return (
    <ModalWindow onClose={onClose} isOpen={isOpen} width={960}>
      <ModalWindowHeader title="Bid History" onClose={onClose} />
      <ModalWindowBody className="p-20">
        <ConsignmentDetails consignment={consignment} />
        {bidHistory && (
          <ResultsTable results={bidHistory} sort={sortValue.sort} order={sortValue.order} onSort={handleSort} />
        )}
        {notFound && <div className="m-t">Bid History Not Found</div>}
      </ModalWindowBody>
    </ModalWindow>
  );
}

BidHistoryModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  consignment: PropTypes.object,
};

BidHistoryModal.defaultProps = {
  isOpen: false,
  onClose: () => null,
  consignment: null,
};

export default BidHistoryModal;
