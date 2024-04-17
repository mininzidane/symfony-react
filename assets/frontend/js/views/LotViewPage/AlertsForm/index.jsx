/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import LotPageBlock from '../LotPageBlock';
import Form from './Form';
import Success from './Success';

function AlertsForm({ lot }) {
  const ga = new GoogleAnalyticsService();

  const [isSent, setSent] = useState(false);

  const { isAuthenticated } = useCustomerHelper();

  useEffect(() => {
    if (!isAuthenticated && isSent) {
      ga.sendEvent('click', 'contact', 'contactus');
    }
  }, [isSent]);

  if (!lot) {
    return null;
  }

  return (
    <LotPageBlock>
      <Card
        title={
          <div className="d-f jc-sb fg-1">
            <FormattedMessage id="lotPage.alerts.title" />{' '}
            <TooltipOnHover
              maxWidth={420}
              badgeTop={-2}
              isFlipEnabled={false}
              content={<FormattedMessage id="lotPage.alerts.tooltip" />}
            />
          </div>
        }
      >
        <CardIndentedContent>
          {isSent ? (
            <Success handleClick={() => setSent(false)} />
          ) : (
            <Form lotId={lot.id} auction={lot.inventoryAuction} handleSuccess={() => setSent(true)} />
          )}
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

export default AlertsForm;
