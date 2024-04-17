import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import CompanyService from 'frontend/js/api/CompanyService';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function Terms() {
  const classes = useStyles();
  const { getRoute, getFullRoute } = RouterService;
  const { address, officePhone, email, officePhoneText } = CompanyService;

  return (
    <div className={classes.root}>
      <p>
        <strong>Program:</strong> AutoBidMaster, LLC (“ABM”) Messages
      </p>
      <p>
        <strong>Product description:</strong> Opting in allows the individual to receive text/SMS messages regarding
        bidding status, auction results, and other relevant information.
      </p>
      <p>
        <strong>Issues:</strong> If you are experiencing issues with the messaging program, you can reply with the
        keyword, “HELP” for more assistance, or you can contact us at Customer Support.
      </p>
      <p>
        <strong>Customer Support:</strong> You can reach our customer service department by phone at{' '}
        {officePhone.formatted}, text at {officePhoneText.formatted}, or via email at {email.raw}. Our address is
        AutoBidMaster, LLC, {address.street}, {address.city}, {address.state} {address.zip}.
      </p>
      <p>Neither AutoBidMaster nor Carriers are liability for delayed or undelivered messages.</p>
      <p>
        As always, message and data rates may apply for any messages sent to you from us and to us from you. Message
        frequency may vary. If you have any questions about your text or data plan, it is best to contact your wireless
        provider.
      </p>
      <p>
        <strong>Privacy:</strong> <Link href={getRoute('privacy')}>{getFullRoute('privacy')}</Link>
      </p>
      <p>
        <strong>
          {`Complete Opt-out instructions: You can cancel the SMS service at any time. Just text "STOP" and send it to us.
          We will reply and confirm that you have been unsubscribed. After this, you will no longer receive SMS messages
          from us. If you want to join again, just sign up as you did the first time and we will start sending SMS
          messages to you again.`}
        </strong>
      </p>
    </div>
  );
}

export default Terms;
