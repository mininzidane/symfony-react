import React, { useState } from 'react';
// import RouterService from "frontend/js/api/RouterService";
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import CongratulationsCard from 'frontend/js/views/Payment/_Shared/Congratulations/Card';
import Transactions from 'frontend/js/views/Payment/CheckoutPage/Receipt/_Shared/Transactions';
import DownloadButton from 'frontend/js/views/Shared/DownloadButton';
import ViewButton from 'frontend/js/views/Shared/ViewButton';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import ClearVinReportViewModal from './ClearVinReportViewModal';
import ProductsCard from './ProductCard';
import useStyles from './useStyles';

function CvReportReceipt() {
  const [isCvReportViewModalOpen, setIsCvReportViewModalOpen] = useState(false);
  const { email, firstName } = useCustomerHelper();
  const classes = useStyles();

  const { receipt } = useCheckoutContext();
  const {
    data: { products = [], transactions = [], lot = {}, cvReport = {} },
  } = receipt;

  const { vin, id, slug, description } = lot;

  return (
    <Container className={classes.container}>
      <CongratulationsCard
        className={classes.card}
        title={
          <div className={classes.title}>
            <FormattedMessage id="receiptPage.congratsCustomerName" values={{ firstName }} />
          </div>
        }
        subtitle={
          <div className={classes.subtitle}>
            <FormattedMessage id="clearvinReport.purchase.reportIsReady" values={{ email }} />
          </div>
        }
      >
        <div className={classes.wrap}>
          <ProductsCard vehicleDescription={description} vin={vin} lotId={id} slug={slug} value={products[0].value} />

          {transactions && <Transactions items={transactions} className={classes.transactions} />}

          {cvReport.pdfReportUri && cvReport.report && (
            <div className={classes.actions}>
              <DownloadButton
                href={cvReport.pdfReportUri}
                label={<FormattedMessage id="shared.cta.download" />}
                isBackgroundTransparent
                isThinBorder
              />

              <ViewButton
                label={<FormattedMessage id="shared.cta.view" />}
                onClick={() => setIsCvReportViewModalOpen(true)}
                isRegularCase
              />
            </div>
          )}

          <ClearVinReportViewModal
            report={cvReport.report}
            isOpen={isCvReportViewModalOpen}
            setOpen={setIsCvReportViewModalOpen}
          />
        </div>
      </CongratulationsCard>
    </Container>
  );
}

export default CvReportReceipt;
