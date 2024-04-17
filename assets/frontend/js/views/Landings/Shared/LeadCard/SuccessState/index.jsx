import React from 'react';
import { useFormikContext } from 'formik';
import CheckmarkGreenSvg from 'frontend/images/shared/various/checkmark-circle-24x24.svg';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function SuccessState() {
  const classes = useStyles();
  const { values } = useFormikContext();

  return (
    <div className={classes.root}>
      <img src={CheckmarkGreenSvg} width={42} height={42} alt="checkmark" />

      <FormattedMessage id="shared.label.thankYou" className={classes.title} />
      <FormattedMessage id="loungePage.contactUs.success" className={classes.desc} values={{ email: values.email }} />
    </div>
  );
}

export default SuccessState;
