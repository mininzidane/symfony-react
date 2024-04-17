/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Button from 'frontend/js/components/Button';
import useIntl from 'frontend/js/hooks/useIntl';
import ShippingCoverageModalLazy from 'frontend/js/views/Shared/ShippingCoverageModal/lazy';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import UploadSvg from './img/upload.svg';
import UploadBanner from './UploadBanner';
import IconSvg from './img/ic_ocean_insurance.svg';
import useStyles from './useStyles';

const UploadDocumentModal = React.lazy(() => import('./UploadDocumentModal'));

function UploadDocuments({ documents, shippingOrder, refetch }) {
  const classes = useStyles();
  const intl = useIntl();
  const [openedModalId, setOpenedModalId] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isShippingCoverageModalOpen, setShippingCoverageModalOpen] = useState(false);
  const { isBelowSm } = useBreakpoint();

  function handleShowModal(id, title) {
    setOpenedModalId(id);
    setModalTitle(title);
  }

  function handleModalClose(isSuccess) {
    setOpenedModalId(null);

    if (isSuccess) {
      refetch();
    }
  }

  const translationSets = {
    uploadBillOfSale: intl.formatMessage({ id: 'trackingPage.label.uploadBillOfSale' }),
    uploadWireConfirmation: intl.formatMessage({ id: 'trackingPage.label.uploadWireConfirmation' }),
    provideConsignee: intl.formatMessage({ id: 'trackingPage.label.provideConsignee' }),
    uploadID: intl.formatMessage({ id: 'trackingPage.label.uploadID' }),
    shippingCoverage: intl.formatMessage({ id: 'trackingPage.label.shippingCoverage' }),
  };

  return (
    <div className={classes.root}>
      {documents.oceanInsurance && (
        <UploadBanner
          label={
            <div>
              <span>
                {translationSets.shippingCoverage}
                {isBelowSm && (
                  <span>
                    :&nbsp;
                    <strong>
                      <FormattedMessage id="sellYourCarPage.keysOptions.no" />
                    </strong>
                  </span>
                )}
              </span>
            </div>
          }
          cta={
            <Button
              color="green"
              className={classes.button}
              onClick={() => setShippingCoverageModalOpen(true)}
              isInline
              label={
                <div className={classes.buttonContent}>
                  <img src={IconSvg} alt="icon" style={{ marginRight: 6 }} />
                  <div>
                    <FormattedMessage id="shared.cta.orderNow" />
                  </div>
                </div>
              }
              size="sm"
            />
          }
        />
      )}
      {documents.bos && (
        <UploadBanner
          label={translationSets.uploadBillOfSale}
          cta={
            <Button
              color="blue"
              isInline
              className={classes.button}
              onClick={() => handleShowModal('bos', translationSets.uploadBillOfSale)}
              label={
                <div className={classes.buttonContent}>
                  <img src={UploadSvg} alt="icon" style={{ marginRight: 6 }} />
                  <div>
                    <FormattedMessage id="shared.cta.upload" />
                  </div>
                </div>
              }
              size="sm"
            />
          }
        />
      )}
      {documents.wireConfirmation && (
        <UploadBanner
          label={translationSets.uploadWireConfirmation}
          cta={
            <Button
              color="blue"
              isInline
              className={classes.button}
              onClick={() => handleShowModal('wireConfirmation', translationSets.uploadWireConfirmation)}
              label={
                <div className={classes.buttonContent}>
                  <img src={UploadSvg} alt="icon" style={{ marginRight: 6 }} />
                  <div>
                    <FormattedMessage id="shared.cta.upload" />
                  </div>
                </div>
              }
              size="sm"
            />
          }
        />
      )}
      {documents.consignee && (
        <UploadBanner
          label={translationSets.provideConsignee}
          cta={
            <Button
              color="blue"
              className={classes.button}
              onClick={() => handleShowModal('consignee', translationSets.provideConsignee)}
              isInline
              label={
                <div className={classes.buttonContent}>
                  <img src={UploadSvg} alt="icon" style={{ marginRight: 6 }} />
                  <div>
                    <FormattedMessage id="shared.cta.upload" />
                  </div>
                </div>
              }
              size="sm"
            />
          }
        />
      )}
      {documents.userID && (
        <UploadBanner
          label={translationSets.uploadID}
          cta={
            <Button
              color="blue"
              className={classes.button}
              isInline
              onClick={() => handleShowModal('userId', translationSets.uploadID)}
              label={
                <div className={classes.buttonContent}>
                  <img src={UploadSvg} alt="icon" style={{ marginRight: 6 }} />
                  <div>
                    <FormattedMessage id="shared.cta.upload" />
                  </div>
                </div>
              }
              size="sm"
            />
          }
        />
      )}
      <SuspenseWrap init={!!openedModalId} fallback={null}>
        <UploadDocumentModal
          id={openedModalId}
          title={modalTitle}
          isOpen={!!openedModalId}
          onClose={handleModalClose}
          shippingOrder={shippingOrder}
        />
      </SuspenseWrap>
      <ShippingCoverageModalLazy
        title={translationSets.shippingCoverage}
        isOpen={isShippingCoverageModalOpen}
        onClose={() => setShippingCoverageModalOpen(false)}
        shippingOrder={shippingOrder}
      />
    </div>
  );
}

UploadDocuments.propTypes = {
  documents: PropTypes.shape({
    bos: PropTypes.bool,
    wireConfirmation: PropTypes.bool,
    consignee: PropTypes.bool,
    userID: PropTypes.bool,
    oceanInsurance: PropTypes.bool,
  }).isRequired,
  shippingOrder: PropTypes.object.isRequired,
};

export default UploadDocuments;
