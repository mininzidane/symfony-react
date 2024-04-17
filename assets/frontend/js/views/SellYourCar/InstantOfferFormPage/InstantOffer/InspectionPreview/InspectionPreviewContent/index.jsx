import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import Steps from './Steps';
import useStyles from './useStyles';

function InspectionPreviewContent({ changeStep, formik, lastStep, instantOffer }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.title}>
          <h2 className={classes.titleText}>
            <FormattedMessage id="sellYourCarPage.inspectionPreview" />
          </h2>
          <p className={classes.subtitleText}>
            <FormattedMessage id="sellYourCarPage.carrierConfirmDetails" />
          </p>
        </div>

        <Steps
          className={classes.steps}
          formik={formik}
          changeStep={changeStep}
          lastStep={lastStep}
          instantOffer={instantOffer}
        />
      </Container>
    </div>
  );
}

InspectionPreviewContent.propTypes = {
  formik: PropTypes.object.isRequired,
  changeStep: PropTypes.func.isRequired,
  lastStep: PropTypes.number.isRequired,
  instantOffer: PropTypes.object,
};

InspectionPreviewContent.defaultProps = {
  instantOffer: null,
};

export default InspectionPreviewContent;
