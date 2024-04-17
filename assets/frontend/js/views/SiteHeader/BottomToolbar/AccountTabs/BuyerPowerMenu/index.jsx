import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import classnames from 'classnames';
import BootstrapApiService from 'frontend/js/api/BootstrapApiService';
import Fade from 'frontend/js/components/Fade';
import Amount from 'frontend/js/components/Amount';
import RouterService from 'frontend/js/api/RouterService';
import t from 'frontend/js/api/TranslatorService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function BuyerPowerMenu({ isOpen }) {
  const { due, blAmount, blUsedAmount } = useCustomerHelper();
  const buyerPowerAmount = blAmount - blUsedAmount < 0 ? 0 : blAmount - blUsedAmount;
  const balanceDue = parseFloat(due);

  const { data } = useQuery(['customer-bootstrap'], () => BootstrapApiService.getCustomerBootstrapByApi());
  const { invoicesDueCount, lastUnpaidInvoicePath } = data || {};

  const menuRef = useRef();
  const classes = useStyles();

  function toggleChatWidgetButton() {
    document.body.classList[isOpen ? 'add' : 'remove']('is-header-menu-open');
  }

  useEffect(() => {
    toggleChatWidgetButton();
  }, [isOpen]);

  return (
    <>
      <Fade isOpen={isOpen}>
        <div className={classes.root} ref={menuRef}>
          <div className={classnames(classes.accountMenu, { 'is-open': isOpen })}>
            <a href={RouterService.getRoute('buyerPower')} className={classes.link}>
              <span>{t('header.buyer_power')}</span>{' '}
              <strong>
                <Amount value={buyerPowerAmount} />
              </strong>
            </a>
            <a
              href={invoicesDueCount === 1 ? lastUnpaidInvoicePath : RouterService.getRoute('purchases')}
              className={classes.link}
            >
              <span>{t('shared.label.balanceDue')}</span>{' '}
              <strong className={classes.due}>
                <Amount value={balanceDue} />
              </strong>
            </a>
          </div>
        </div>
      </Fade>
    </>
  );
}

BuyerPowerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default BuyerPowerMenu;
