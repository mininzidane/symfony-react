import React from 'react';
import ReactMetaTags from 'react-meta-tags';

function BrokerPage() {
  return (
    <>
      <ReactMetaTags>
        <title>AutoBidMaster</title>
      </ReactMetaTags>

      <iframe
        title="Copart brokers"
        src="https://www.copart.com/brokersmarketmakers/1/"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0, zIndex: 999 }}
      />
    </>
  );
}

export default BrokerPage;
