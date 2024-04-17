import React from 'react';
import useStyles from './useStyles';

function BrokerInformation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <strong>About Brokers</strong>
      <p>
        As you&apos;re browsing vehicles and placing bids, you may come across items that require specific licenses in
        order to buy – licenses you may not have. When you try to bid on a vehicle and don&apos;t have adequate licenses
        on file with Copart, you&apos;ll get a list of Brokers who can help you. Brokers buy vehicles on your behalf, so
        you can still purchase the lots you want, even without the appropriate documentation. Remember that when you use
        a Broker, you are buying the vehicle through the Broker and not Copart. As a result, be sure to read and
        understand the Broker&apos;s additional terms, including payment terms and conditions.
      </p>

      <p>
        <strong>Important Note:</strong> It&apos;s best to find the vehicles you wish to purchase prior to contacting a
        Broker. Not all Brokers are eligible to buy vehicles in every state – or every type of vehicle. When you attempt
        to bid on your selected items, the Brokers who can help facilitate your purchases will be displayed.
      </p>

      <strong>Benefits of a Broker</strong>
      <p>
        In addition to getting access to vehicles you may not otherwise qualify for, Copart Members using Brokers can
        benefit in other ways too. Brokers are available to answer questions you may have about vehicles and the auction
        process. Many also provide financing, inspection, parts locating, repair and transportation services if needed.
        <br />
        <br />
        Some Brokers have a physical location, or storefront, for you to visit. You can bid and buy via these Brokers’
        computer kiosks, and experienced staff are on hand to assist you every step of the way.
      </p>
    </div>
  );
}

export default BrokerInformation;
