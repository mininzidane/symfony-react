/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import useLot from 'frontend/js/hooks/useLot';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Control from '../Control';
import Image360viewSvg from './img/360view.svg';
import useStyles from './useStyles';

const ModalSpinView = React.lazy(() => import('./ModalSpinView'));
const Modal360View = React.lazy(() => import('./Modal360View'));

function View360Control({ lotId, auction }) {
  const classes = useStyles();
  const { isAuthenticated } = useCustomerHelper();
  const [lot] = useLot(lotId, auction);
  const { externalPanoramas: external, internalPanoramas: internal, spincarPanoramas } = lot || {};
  const is360ViewEnabled = external?.length > 0 && internal?.length > 0;
  const is360SpinEnabled = spincarPanoramas && spincarPanoramas.length > 0;

  if (!is360ViewEnabled && !is360SpinEnabled) {
    return null;
  }

  const trigger = (
    <Control className={classes.root}>
      <img src={Image360viewSvg} alt="360 view" />
    </Control>
  );

  if (!isAuthenticated) {
    return React.cloneElement(trigger, {
      onClick: () => {
        const eventTrackingService = new EventTrackingService();
        eventTrackingService.sendEvent({ name: '360_view_button_click', step: 'abm_lotpage' });
        window.dispatchEvent(new CustomEvent('openAuthModal'));
      },
    });
  }

  if (is360SpinEnabled) {
    return (
      <Suspense fallback={null}>
        <ModalSpinView trigger={trigger} lot={lot} />
      </Suspense>
    );
  }

  if (is360ViewEnabled) {
    return (
      <Suspense fallback={null}>
        <Modal360View
          id={lotId}
          auction={auction}
          trigger={trigger}
          externalUrls={external}
          internalUrl={internal[0].url}
        />
      </Suspense>
    );
  }
}

export default View360Control;
