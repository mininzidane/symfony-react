import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import ModalWindowContainer from 'frontend/js/components/ModalWindow/Container';
import Link from 'frontend/js/components/Link';
import useStyles from '../useStyles';

function ReportPromoText() {
  const classes = useStyles();

  return (
    <ModalWindowContainer className={classes.infoText}>
      <FormattedMessage
        id="lotPage.clearvinPromo.promoText"
        values={{
          a: (chunks) => (
            <Link href={RouterService.getRoute('clearvinSampleReport', null, true)} isTargetBlank>
              {chunks}
            </Link>
          ),
        }}
      />
    </ModalWindowContainer>
  );
}

export default ReportPromoText;
