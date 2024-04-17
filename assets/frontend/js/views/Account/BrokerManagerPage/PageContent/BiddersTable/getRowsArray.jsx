import React from 'react';
import ButtonLink from 'frontend/js/components/ButtonLink';
import NumberService from 'frontend/js/lib/utils/NumberService';
import SignUpDate from './SignUpDate';
import StatusToggle from './StatusToggle';
import Schedule from './Schedule';

function getRowsArray({
  initialArray,
  modalTriggerClassName,
  buyerPowerClassName,
  emailClassName,
  openNameEditModal,
  openPhoneEditModal,
  openBuyerPowerEditModal,
  openTowingMarkupEditModal,
  emptyNameLabel,
  setBidders,
  emptyPhoneNumberLabel,
  bidders,
  allowToSetFixedBP,
  allowToAddTowingMarkup,
  allowToChooseSchedule,
}) {
  return initialArray.map((bidder) => {
    const {
      signUp,
      firstName,
      lastName,
      phoneNumber,
      email,
      blAmount,
      blCount,
      towingMarkup,
      activeBidsCount,
      wonBidsCount,
      status,
      id,
      scheduleA,
      scheduleA2C,
    } = bidder;

    const row = [
      { content: <SignUpDate dateString={signUp} /> },
      {
        content: (
          <ButtonLink
            className={modalTriggerClassName}
            label={firstName || lastName ? `${firstName} ${lastName}` : emptyNameLabel}
            onClick={() => openNameEditModal(id)}
          />
        ),
      },
      {
        content: (
          <ButtonLink
            className={modalTriggerClassName}
            label={phoneNumber || emptyPhoneNumberLabel}
            onClick={() => openPhoneEditModal(id)}
          />
        ),
      },
      { content: <span className={emailClassName}>{email}</span> },
      {
        content: allowToSetFixedBP ? (
          <ButtonLink
            className={modalTriggerClassName}
            label={
              <span className={buyerPowerClassName}>{`${blCount}/${NumberService.formatCurrency(blAmount)} USD`}</span>
            }
            onClick={() => openBuyerPowerEditModal(id)}
          />
        ) : (
          <span className={buyerPowerClassName}>{`${blCount}/${NumberService.formatCurrency(blAmount)} USD`}</span>
        ),
      },
      allowToAddTowingMarkup && {
        content: (
          <ButtonLink
            className={modalTriggerClassName}
            label={`${NumberService.formatCurrency(towingMarkup)} USD`}
            onClick={() => openTowingMarkupEditModal(id)}
          />
        ),
      },
      { content: activeBidsCount },
      { content: wonBidsCount },
      allowToChooseSchedule && { content: <Schedule scheduleA={scheduleA} scheduleA2C={scheduleA2C} /> },
      {
        content: <StatusToggle setBidders={setBidders} bidders={bidders} initialStatus={status} bidderId={id} />,
        align: 'right',
        mobileStyle: { paddingTop: 10, paddingBottom: 10 },
      },
    ].filter(Boolean);

    row.id = id;
    return row;
  });
}

export default getRowsArray;
