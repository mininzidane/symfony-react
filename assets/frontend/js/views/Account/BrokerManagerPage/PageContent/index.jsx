/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import EmptyState from './EmptyState';
import BiddersTable from './BiddersTable';
import AddNewBidder from './AddNewBidder';
import useBidderFormContext from '../_Context/useBidderFormContext';

function PageContent({ bidders, allowToSetFixedBP, allowToAddTowingMarkup, allowToChooseSchedule }) {
  const [biddersArray, setBiddersArray] = useState([]);
  const { content } = useBidderFormContext();
  const { isFormShown, setIsFormShown } = content;

  useEffect(() => {
    if (bidders) {
      setBiddersArray(bidders);
    }
  }, [bidders]);

  return (
    <div>
      {isFormShown ? (
        <AddNewBidder />
      ) : (
        <>
          {bidders.length > 0 ? (
            <BiddersTable
              bidders={biddersArray}
              setBidders={setBiddersArray}
              allowToSetFixedBP={allowToSetFixedBP}
              allowToAddTowingMarkup={allowToAddTowingMarkup}
              allowToChooseSchedule={allowToChooseSchedule}
            />
          ) : (
            <EmptyState onClick={() => setIsFormShown(true)} />
          )}
        </>
      )}
    </div>
  );
}

export default PageContent;
