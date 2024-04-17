import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import RouterService from 'frontend/js/api/RouterService';
import { FormattedMessage } from 'react-intl-phraseapp';
import CustomerService from 'frontend/js/api/CustomerService';
import Card from 'frontend/js/components/Card';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import useStyles from './useStyles';
import CheckmarkSvg from './img/checkmark.svg';

function UnsubscribePage() {
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const classes = useStyles();
  const { email, userId } = useParams();

  if (!ValidationService.validateEmail(email)) {
    return <Redirect to={RouterService.getRoute('home')} />;
  }

  async function handleClick() {
    try {
      const data = await CustomerService.unsubscribe({ email, userId: Number(userId) });
      if (data.success) {
        setIsUnsubscribed(true);
      }
    } catch (e) {
      /** Ignore */
    }
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card} elevation={2}>
        {isUnsubscribed ? (
          <h1 className={classes.title}>
            <div className={classes.grid}>
              <img src={CheckmarkSvg} alt="Checkmark" />
              <FormattedMessage id="unsubscribePage.success" />
            </div>
          </h1>
        ) : (
          <>
            <h1 className={classes.title}>
              <FormattedMessage id="unsubscribePage.title" />
            </h1>
            <div className={classes.subtitle}>{email}</div>

            <div className={classes.buttons}>
              <ButtonOutlined
                href={RouterService.getRoute('home')}
                label={<FormattedMessage id="shared.cta.cancel" />}
                isBackgroundWhite
              />
              <Button label={<FormattedMessage id="shared.cta.unsubscribe" />} onClick={handleClick} />
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default UnsubscribePage;
