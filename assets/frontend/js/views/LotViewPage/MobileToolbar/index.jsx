import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import throttle from 'lodash/throttle';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import StatusLabel from './StatusLabel';
import CTA from './CTA';
import useStyles from './useStyles';

function MobileToolbar({ lot, bidStatus, isHidden }) {
  const { isPartiallyInViewport } = ViewportService;
  const [isToolbarAboveForm, setIsToolbarAboveForm] = useState(true);
  const [isToolbarShown, setIsToolbarShown] = useState(!isHidden);
  const { currentBid, bidStatus: bidStatusLabel, currency } = lot;

  const classes = useStyles();

  const scrollToBidInfo = useCallback(() => {
    const $bidInfoCard = document.getElementById('lot-page-bid-info-card');

    if ($bidInfoCard) {
      const offset = ViewportService.offset($bidInfoCard).top;

      window.scroll({ top: offset - 120, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    document.body.classList[isToolbarShown ? 'add' : 'remove']('lot-page-mobile-toolbar');
  }, [isToolbarShown]);

  useEffect(() => {
    if (isHidden) {
      return undefined;
    }

    function updateToolbar() {
      const $bidInfoCard = document.getElementById('lot-page-bid-info-card');

      if ($bidInfoCard) {
        const isShouldBeShown = !isPartiallyInViewport($bidInfoCard, 150, 120);
        setIsToolbarShown(isShouldBeShown);

        if (isShouldBeShown) {
          setIsToolbarAboveForm($bidInfoCard.getBoundingClientRect().y > 0);
        }
      }
    }

    window.addEventListener('scroll', throttle(updateToolbar, 250));

    return () => {
      window.removeEventListener('scroll', throttle(updateToolbar, 250));
    };
  }, []);

  return (
    <div className={classnames(classes.root, { 'is-shown': isToolbarShown })}>
      <StatusLabel bidStatus={bidStatusLabel} amount={currentBid} onClick={scrollToBidInfo} currency={currency} />
      <CTA
        isLive={bidStatus === LotStatusStates.LIVE}
        lot={lot}
        isAbove={isToolbarAboveForm}
        onClick={scrollToBidInfo}
      />
    </div>
  );
}

MobileToolbar.propTypes = {
  lot: LotShape,
  bidStatus: PropTypes.string,
  isHidden: PropTypes.bool,
};

MobileToolbar.defaultProps = {
  isHidden: false,
  lot: null,
  bidStatus: null,
};

export default MobileToolbar;
