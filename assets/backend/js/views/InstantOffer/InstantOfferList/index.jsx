import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import ReactQueryProvider from 'backend/js/providers/ReactQueryProvider';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import RouterService from 'backend/js/api/RouterService';
import Table from 'backend/js/components/Table/Table';
import TableCell from 'backend/js/components/Table/TableCell';
import FlashMessage from 'backend/js/components/FlashMessage';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import Tabs from './Tabs';
import InstantOfferRow from './InstantOfferRow';

const TAB_NEW_LEADS = 'new_leads';
const TAB_PENDING_REVIEW = 'pending_review';
const TAB_SELLER_FEEDBACK = 'seller_feedback';
const TAB_ACCEPTED_OFFERS = 'accepted_offers';
const TAB_COMPLETED_OFFERS = 'completed_offers';
const TAB_UPCOMING_SALE = 'upcoming_sale';
const TAB_READY_FOR_SALE = 'ready_for_sale';
const TAB_SOLD = 'sold';
const TAB_DECLINED_LEADS = 'declined_leads';
const TAB_BARGAIN_LEADS = 'bargain_leads';

const TABS = {
  [TAB_NEW_LEADS]: [InstantOfferService.STATUS.NEW_LEADS],
  [TAB_PENDING_REVIEW]: [InstantOfferService.STATUS.PENDING_REVIEW],
  [TAB_SELLER_FEEDBACK]: [InstantOfferService.STATUS.SELLER_FEEDBACK],
  [TAB_ACCEPTED_OFFERS]: [
    InstantOfferService.STATUS.OFFER_ACCEPTED,
    InstantOfferService.STATUS.AWAITING_PICKUP,
    InstantOfferService.STATUS.AWAITING_PAYMENT,
    InstantOfferService.STATUS.AT_AUCTION,
  ],
  [TAB_COMPLETED_OFFERS]: [
    InstantOfferService.STATUS.OFFER_ACCEPTED,
    InstantOfferService.STATUS.AWAITING_PICKUP,
    InstantOfferService.STATUS.AWAITING_PAYMENT,
    InstantOfferService.STATUS.AT_AUCTION,
  ],
  [TAB_UPCOMING_SALE]: [InstantOfferService.STATUS.AT_AUCTION],
  [TAB_READY_FOR_SALE]: [InstantOfferService.STATUS.AT_AUCTION],
  [TAB_SOLD]: [InstantOfferService.STATUS.SOLD],
  [TAB_BARGAIN_LEADS]: [InstantOfferService.STATUS.BARGAIN_LEADS],
  [TAB_DECLINED_LEADS]: [InstantOfferService.STATUS.DECLINED_LEADS],
};

function InstantOfferList({ statuses, instantOffers, pickupTimes, titleTypes, payMethods, photoTypes, agents }) {
  const activeTab = RouterService.getQueryParam('instant_offer_tabs') || TAB_NEW_LEADS;
  const defaultFlash = { message: '', type: '' };
  const [flash, setFlash] = useState(defaultFlash);
  const [modalContent, setModalContent] = useState(null);

  const headerCells = [
    'Ref #',
    'Vehicle',
    'Offer',
    'Payment method',
    'Address',
    'Shipping',
    'Status',
    'Customer',
    'Notes',
  ];

  return (
    <>
      <Tabs active={activeTab} options={Object.keys(TABS)} />

      {flash.message && <FlashMessage message={flash.message} type={flash.type} />}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headerCells.map((headerCell, index) => (
                <TableCell key={index}>{headerCell}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {instantOffers.map((instantOffer) => {
              if (!TABS[activeTab].includes(instantOffer.status)) {
                return null;
              }

              return (
                <InstantOfferRow
                  key={`instantOffer-${instantOffer.ref}`}
                  instantOffer={instantOffer}
                  setFlash={setFlash}
                  setModalContent={setModalContent}
                  statuses={statuses}
                  titleTypes={titleTypes}
                  pickupTimes={pickupTimes}
                  payMethods={payMethods}
                  photoTypes={photoTypes}
                  agents={agents}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {modalContent && (
        <ModalWindow
          isOpen={Boolean(modalContent)}
          onClose={() => setModalContent(null)}
          styles={modalContent.styles ? modalContent.styles : {}}
        >
          <ModalWindowHeader title={modalContent.title} onClose={() => setModalContent(null)} />
          <ModalWindowBody className="p-20 ov-v">{modalContent.content}</ModalWindowBody>
        </ModalWindow>
      )}
    </>
  );
}

InstantOfferList.propTypes = {
  statuses: PropTypes.array,
  pickupTimes: PropTypes.array,
  titleTypes: PropTypes.array,
  instantOffers: PropTypes.array,
  payMethods: PropTypes.array,
  photoTypes: PropTypes.array,
  agents: PropTypes.array,
};

InstantOfferList.defaultProps = {
  statuses: [],
  pickupTimes: [],
  titleTypes: [],
  instantOffers: [],
  payMethods: [],
  photoTypes: [],
  agents: [],
};

const $el = document.getElementById('instant-offer-list');
if ($el) {
  const statuses = $el.dataset.statuses ? JSON.parse($el.dataset.statuses) : [];
  const pickupTimes = $el.dataset.pickupTimes ? JSON.parse($el.dataset.pickupTimes) : [];
  const titleTypes = $el.dataset.titleTypes ? JSON.parse($el.dataset.titleTypes) : [];
  const payMethods = $el.dataset.payMethods ? JSON.parse($el.dataset.payMethods) : [];
  const photoTypes = $el.dataset.photoTypes ? JSON.parse($el.dataset.photoTypes) : [];
  const agents = $el.dataset.agents ? JSON.parse($el.dataset.agents) : [];
  const instantOffers = $el.dataset.list ? JSON.parse($el.dataset.list) : [];
  ReactDOM.render(
    <ThemeProvider>
      <ReactQueryProvider>
        <SnackbarProvider>
          <InstantOfferList
            statuses={statuses}
            instantOffers={instantOffers}
            pickupTimes={pickupTimes}
            titleTypes={titleTypes}
            payMethods={payMethods}
            photoTypes={photoTypes}
            agents={agents}
          />
        </SnackbarProvider>
      </ReactQueryProvider>
    </ThemeProvider>,
    $el,
  );
}

export default InstantOfferList;
