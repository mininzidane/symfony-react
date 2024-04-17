/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Card from 'frontend/js/components/Card';
import ButtonLink from 'frontend/js/components/ButtonLink';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import CompanyService from 'frontend/js/api/CompanyService';
import Button from 'frontend/js/components/Button';
import checkmarkSvg from 'frontend/images/shared/various/checkmark-circle-24x24.svg';
import useStyles from './useStyles';

function OrderPlaced({ setStep }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={2}>
      <div className={classes.checkmark}>
        <img width={48} src={checkmarkSvg} alt="Checkmark" />
      </div>
      <div className={classes.title}>
        <FormattedMessage id="shippingCalculator.orderPlaced.title" />
      </div>
      <div className={classes.desc}>
        <FormattedMessage
          id="shippingCalculator.orderPlaced.description"
          values={{
            phone: (
              <Link href={CompanyService.officePhone.href} isNoWrap>
                {CompanyService.officePhone.formatted}
              </Link>
            ),
          }}
        />
      </div>
      <div className={classes.btn}>
        <Button
          label={<FormattedMessage id="shared.cta.viewMyOrder" />}
          href={RouterService.getRoute('lotsWon')}
          target="_self"
          className={classes.cta}
          color="blue"
          isInline
        />
      </div>
      <div className={classes.newOrderCta}>
        <FormattedMessage
          id="shippingCalculator.orderPlaced.newOrder"
          values={{ button: (chunk) => <ButtonLink label={chunk} onClick={() => setStep(0)} /> }}
        />
      </div>
    </Card>
  );
}

export default OrderPlaced;
