import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import BaseApiService from 'backend/js/api/BaseApiService';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import useStyles from './useStyles';

function ModalLink({
  route,
  label,
  title,
  className,
  style,
  onSubmitSuccess,
  onSubmitError,
  closeOnSuccess,
  closeOnError,
  onModalOpen,
  onModalClose,
}) {
  const baseApiService = new BaseApiService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventInit, setEventInit] = useState(false);
  const [modalContent, setModalContent] = useState(undefined);
  const classes = useStyles();

  async function handleOnClick(event) {
    event.preventDefault();

    try {
      const { data } = await baseApiService.get(route);
      if (data) {
        setModalContent(data);
      }

      setIsModalOpen(true);
      onModalOpen();
    } catch (e) {
      /** Ignore */
    }
  }

  function handleOnClose() {
    /* eslint-disable-next-line no-use-before-define */
    removeWindowEventListeners();

    setModalContent(undefined);
    setIsModalOpen(false);
    setEventInit(false);
    onModalClose();
  }

  function handleSubmitSuccess(response) {
    onSubmitSuccess(response);

    if (closeOnSuccess) {
      handleOnClose();
    }
  }

  function handleSubmitError(response) {
    onSubmitError(response);

    if (closeOnError) {
      handleOnClose();
    }
  }

  function addWindowEventListeners() {
    window.addEventListener('closeModalWindow', handleOnClose);
    window.addEventListener('onModalSubmitSuccess', handleSubmitSuccess.bind(this));
    window.addEventListener('onModalSubmitError', handleSubmitError.bind(this));
  }

  function removeWindowEventListeners() {
    window.removeEventListener('closeModalWindow', handleOnClose);
    window.removeEventListener('onModalSubmitSuccess', handleSubmitSuccess.bind(this));
    window.removeEventListener('onModalSubmitError', handleSubmitError.bind(this));
  }

  useEffect(() => {
    if (isModalOpen && !eventInit) {
      addWindowEventListeners();
      setEventInit(true);
    }
  }, [isModalOpen]);

  return (
    <>
      <a href={route} title={title} onClick={handleOnClick} className={className} style={style}>
        {label}
      </a>
      <ModalWindow
        onClose={handleOnClose}
        isOpen={isModalOpen}
        size="lg"
        className={classnames('modal-link', classes.modalWindow)}
      >
        <ModalWindowBody className={classes.modalBody}>
          {modalContent ? (
            <div
              className={classnames('modal inmodal', classes.modalEmbed)}
              dangerouslySetInnerHTML={{ __html: modalContent }}
            />
          ) : (
            <div>Failed to load modal content</div>
          )}
        </ModalWindowBody>
      </ModalWindow>
    </>
  );
}

ModalLink.propTypes = {
  route: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  closeOnSuccess: PropTypes.bool,
  closeOnError: PropTypes.bool,
  onModalOpen: PropTypes.func,
  onModalClose: PropTypes.func,
};

ModalLink.defaultProps = {
  title: '',
  className: '',
  style: {},
  onSubmitSuccess: () => null,
  onSubmitError: () => null,
  closeOnSuccess: false,
  closeOnError: false,
  onModalOpen: () => null,
  onModalClose: () => null,
};

export default ModalLink;
