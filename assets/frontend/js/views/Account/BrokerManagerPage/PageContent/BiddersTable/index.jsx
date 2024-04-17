/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Pagination from 'frontend/js/components/Pagination';
import AdaptiveTable from 'frontend/js/components/Table/AdaptiveTable';
import SortContext from 'frontend/js/context/SortContext';
import Title from '../Title';
import useStyles from './useStyles';
import EditNameModal from './EditNameModal';
import EditPhoneModal from './EditPhoneModal';
import SortByControl from './SortByControl';
import getRowsArray from './getRowsArray';
import EditBuyerPowerModal from './EditBuyerPowerModal';
import EditTowingMarkupModal from './EditTowingMarkupModal';

function BiddersTable({ bidders, setBidders, allowToSetFixedBP, allowToAddTowingMarkup, allowToChooseSchedule }) {
  const [modalBidderId, setModalBidderId] = useState(null);
  const [isNameEditModalOpen, setIsNameEditModalOpen] = useState(false);
  const [isPhoneEditModalOpen, setIsPhoneEditModalOpen] = useState(false);
  const [isBuyerPowerEditModalOpen, setIsBuyerPowerEditModalOpen] = useState(false);
  const [isTowingMarkupEditModalOpen, setIsTowingMarkupEditModalOpen] = useState(false);
  const { sort, setSort } = useContext(SortContext);
  const classes = useStyles();

  function openPhoneEditModal(bidderId) {
    setIsPhoneEditModalOpen(true);
    setModalBidderId(bidderId);
  }
  function closePhoneEditModal() {
    setIsPhoneEditModalOpen(false);
  }
  function openNameEditModal(bidderId) {
    setIsNameEditModalOpen(true);
    setModalBidderId(bidderId);
  }
  function closeNameEditModal() {
    setIsNameEditModalOpen(false);
  }
  function openBuyerPowerEditModal(bidderId) {
    setIsBuyerPowerEditModalOpen(true);
    setModalBidderId(bidderId);
  }
  function closeBuyerPowerEditModal() {
    setIsBuyerPowerEditModalOpen(false);
  }
  function openTowingMarkupEditModal(bidderId) {
    setIsTowingMarkupEditModalOpen(true);
    setModalBidderId(bidderId);
  }
  function closeTowingMarkupEditModal() {
    setIsTowingMarkupEditModalOpen(false);
  }

  const biddersRowsArray = getRowsArray({
    initialArray: bidders,
    modalTriggerClassName: classes.modalTriggerButton,
    emailClassName: classes.email,
    buyerPowerClassName: classes.buyerPower,
    openNameEditModal,
    openPhoneEditModal,
    openBuyerPowerEditModal,
    openTowingMarkupEditModal,
    setBidders,
    bidders,
    emptyNameLabel: <FormattedMessage id="shared.cta.addName" />,
    emptyPhoneNumberLabel: <FormattedMessage id="shared.cta.addPhoneNumber" />,
    allowToSetFixedBP,
    allowToAddTowingMarkup,
    allowToChooseSchedule,
  });

  return (
    <ContainerFullScreen>
      <div className={classes.titleWrap}>
        <Title text={<FormattedMessage id="brokerManagerPage.brokerAccount" />} hasTopMargin={false} />
        {biddersRowsArray.length > 1 && <SortByControl sort={sort} onChange={setSort} isFlipEnabled={false} />}
      </div>

      <div className={classes.root}>
        <AdaptiveTable
          headData={[
            { label: <FormattedMessage id="shared.label.date" /> },
            { label: <FormattedMessage id="shared.label.personName" /> },
            { label: <FormattedMessage id="shared.label.phoneNumber" /> },
            { label: <FormattedMessage id="shared.label.email" /> },
            { label: <FormattedMessage id="shared.label.buyerPower" /> },
            allowToAddTowingMarkup && { label: <FormattedMessage id="shared.label.towingMarkup" /> },
            { label: <FormattedMessage id="shared.label.currentBids" />, style: { whiteSpace: 'normal' } },
            { label: <FormattedMessage id="shared.label.wonBids" />, style: { whiteSpace: 'normal' } },
            allowToChooseSchedule && { label: <FormattedMessage id="shared.label.buyerType" /> },
            { label: <FormattedMessage id="shared.label.status" />, align: 'right' },
          ].filter(Boolean)}
          bodyData={biddersRowsArray}
        />
        <Pagination />
      </div>

      <EditNameModal
        isOpen={isNameEditModalOpen}
        onClose={closeNameEditModal}
        bidders={bidders}
        setBidders={setBidders}
        bidderId={modalBidderId}
      />
      <EditPhoneModal
        isOpen={isPhoneEditModalOpen}
        onClose={closePhoneEditModal}
        bidders={bidders}
        setBidders={setBidders}
        bidderId={modalBidderId}
      />
      <EditBuyerPowerModal
        isOpen={isBuyerPowerEditModalOpen}
        onClose={closeBuyerPowerEditModal}
        bidders={bidders}
        setBidders={setBidders}
        bidderId={modalBidderId}
      />
      <EditTowingMarkupModal
        isOpen={isTowingMarkupEditModalOpen}
        onClose={closeTowingMarkupEditModal}
        bidders={bidders}
        setBidders={setBidders}
        bidderId={modalBidderId}
      />
    </ContainerFullScreen>
  );
}

export default BiddersTable;
