/* eslint-disable react/prop-types */
import React from 'react';
import useModal from 'backend/js/hooks/useModal';
import ConsignmentService from 'backend/js/api/ConsignmentService';
import CounterBidModal from './CounterBidModal';
import StayModal from './StayModal';
import ApproveModal from './ApproveModal';
import RerunModal from './RerunModal';
import CheckCircleSvg from './img/check-circle.svg';
import RerunSvg from './img/rerun.svg';
import ArrowCircleLeftSvg from './img/arrow-circle-left.svg';
import StaySvg from './img/stay.svg';
import useStyles from './useStyles';

function Actions({ consignment, updateConsignment }) {
  if (consignment.lotStatus !== ConsignmentService.LOT_STATUSES.AWAITING_BID_APPROVAL) {
    return null;
  }

  const classes = useStyles();
  const { isModalOpen: isCounterBidModalOpen, toggleModal: toggleCounterBidModal } = useModal();
  const { isModalOpen: isStayModalOpen, toggleModal: toggleStayModal } = useModal();
  const { isModalOpen: isApproveModalOpen, toggleModal: toggleApproveModal } = useModal();
  const { isModalOpen: isRerunModalOpen, toggleModal: toggleRerunModal } = useModal();

  return (
    <div className={classes.root}>
      <button type="button" className={classes.btn} onClick={() => toggleApproveModal(true)}>
        <img src={CheckCircleSvg} width={20} height={20} alt="Approve" title="Approve" />
      </button>
      <button type="button" className={classes.btn} onClick={() => toggleCounterBidModal(true)}>
        <img src={ArrowCircleLeftSvg} width={20} height={20} alt="Counter Bid" title="Counter Bid" />
      </button>
      <button type="button" className={classes.btn} onClick={() => toggleRerunModal(true)}>
        <img src={RerunSvg} width={20} height={20} alt="Rerun" title="Rerun" />
      </button>
      <button type="button" className={classes.btn} onClick={() => toggleStayModal(true)}>
        <img src={StaySvg} width={20} height={20} alt="Stay" title="Stay" />
      </button>
      <ApproveModal
        isOpen={isApproveModalOpen}
        onClose={() => toggleApproveModal(false)}
        consignment={consignment}
        updateConsignment={updateConsignment}
      />
      <CounterBidModal
        isOpen={isCounterBidModalOpen}
        onClose={() => toggleCounterBidModal(false)}
        consignment={consignment}
        updateConsignment={updateConsignment}
      />
      <RerunModal
        isOpen={isRerunModalOpen}
        onClose={() => toggleRerunModal(false)}
        consignment={consignment}
        updateConsignment={updateConsignment}
      />
      <StayModal
        isOpen={isStayModalOpen}
        onClose={() => toggleStayModal(false)}
        consignment={consignment}
        updateConsignment={updateConsignment}
      />
    </div>
  );
}

export default Actions;
