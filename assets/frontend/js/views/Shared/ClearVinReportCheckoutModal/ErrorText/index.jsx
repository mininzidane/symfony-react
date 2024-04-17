/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import ModalWindowContainer from 'frontend/js/components/ModalWindow/Container';
import useStyles from '../useStyles';

function ErrorText() {
  const classes = useStyles();

  return (
    <ModalWindowContainer className={classes.infoText}>
      <FormattedMessage
        id="clearvinReport.purchase.error"
        values={{
          a: (chunks) => (
            <Link href={RouterService.getRoute('contactUs')} isTargetBlank>
              {chunks}
            </Link>
          ),
        }}
      />
    </ModalWindowContainer>
  );
}

export default ErrorText;
