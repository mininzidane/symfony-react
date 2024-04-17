import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';

function ExitModal({ lot, ymmSearchLink }) {
  const ymm = `${lot.year} ${lot.make} ${lot.model}`;
  const intl = useIntl();
  const [isOpen, setOpen] = useState(false);
  const eventTrackingService = new EventTrackingService();

  const translationSets = {
    title: intl.formatMessage({
      id: 'lotPage.exitModal.title',
      defaultMessage: 'Not exactly what you’re looking for?',
    }),
    message: intl.formatMessage(
      {
        id: 'lotPage.exitModal.message',
      },
      {
        ymm,
        br: <br />,
        strong: (chunks) => <strong>{chunks}</strong>,
      },
    ),
    cta: intl.formatMessage({
      id: 'lotPage.exitModal.cta',
      defaultMessage: 'Search now',
    }),
  };

  function handleSearchClick() {
    eventTrackingService.sendEvent({ name: 'exit_popup_click', step: 'abm_lotpage' });
  }

  useEffect(() => {
    function openExitModal(e) {
      const { clientY, clientX, toElement, relatedTarget } = e;
      const { innerHeight, innerWidth } = window;
      const isCursorWithinViewport = clientY > 0 && clientY < innerHeight && clientX > 0 && clientX < innerWidth;

      if (toElement || relatedTarget || isCursorWithinViewport) {
        return;
      }

      setOpen(true);
      eventTrackingService.sendEvent({ name: 'exit_popup_shown', step: 'abm_lotpage' });
      document.removeEventListener('mouseout', openExitModal);
    }

    if (!LocalStorageService.get('Abm::isPageVisited')) {
      document.addEventListener('mouseout', openExitModal);
    }

    return () => document.removeEventListener('mouseout', openExitModal);
  }, []);

  return (
    <ModalWindow isOpen={isOpen} onClose={() => setOpen(false)} size="md">
      <ModalWindowHeader title={translationSets.title} onClose={() => setOpen(false)} />
      <ModalWindowBody hasFooter>{translationSets.message}</ModalWindowBody>
      <ModalWindowFooter>
        <Button label={translationSets.cta} href={ymmSearchLink} onClick={handleSearchClick} isInline />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

ExitModal.propTypes = {
  lot: LotShape,
  ymmSearchLink: PropTypes.string,
};

ExitModal.defaultProps = {
  lot: null,
  ymmSearchLink: '',
};

export default ExitModal;
