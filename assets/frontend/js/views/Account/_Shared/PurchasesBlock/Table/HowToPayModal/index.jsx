/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';

function HowToPayModal({ isOpen, onClose, data }) {
  const { formatCurrency } = NumberService;
  const { formatFromISOString } = DateTimeService;
  const classes = useStyles();

  const { balanceRemaining, dueDate } = data || {};

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} size="md">
      <ModalWindowHeader
        title={<FormattedMessage id="depositsPage.transactions.purchases.howToPayModal.title" />}
        onClose={onClose}
      />
      <ModalWindowBody hasFooter>
        <>
          <div className={classes.step}>
            <FormattedMessage
              id="depositsPage.transactions.purchases.howToPayModal.step1"
              values={{
                amount: formatCurrency(balanceRemaining, 'USD', true),
                dueDate: formatFromISOString(dueDate),
                strong: (chunks) => <strong className={classes.stepTitle}>{chunks}</strong>,
              }}
            />
          </div>
          <div className={classes.step}>
            <FormattedMessage
              id="depositsPage.transactions.purchases.howToPayModal.step2"
              values={{
                strong: (chunks) => <strong>{chunks}</strong>,
              }}
            />
          </div>
          <div className={classes.step}>
            <FormattedMessage
              id="depositsPage.transactions.purchases.howToPayModal.step3"
              values={{
                strong: (chunks) => <strong className={classes.stepTitle}>{chunks}</strong>,
              }}
            />
          </div>
        </>
      </ModalWindowBody>
      <ModalWindowFooter>
        <Button
          label={<FormattedMessage id="shared.cta.takeMeToMyOrder" />}
          href={RouterService.getRoute('lotsWon')}
          onClick={onClose}
          isInline
        />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

export default HowToPayModal;
