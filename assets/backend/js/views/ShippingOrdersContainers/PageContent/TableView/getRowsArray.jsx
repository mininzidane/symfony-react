/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Amount from 'frontend/js/components/Amount';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import Link from 'frontend/js/components/Link';
import FileLink from './FileLink';

function getRowsArray(invoices) {
  const Spacer = <div>&nbsp;</div>;
  const { isObject } = ValidationService;

  function getAmountComponent(amount) {
    if (!amount) {
      return null;
    }

    return <Amount value={parseFloat(amount)} fontSize={12} className="ws-n" hasCurrency />;
  }

  function getVins(data) {
    return data.map((vin, i) => {
      if (vin) {
        return <div key={i} dangerouslySetInnerHTML={{ __html: vin }} />;
      }

      return <Fragment key={i}>{Spacer}</Fragment>;
    });
  }

  function getInvoices(data, vins) {
    if (!isObject(data) || vins.length === 0) {
      return null;
    }

    return vins.map((vin, i) => {
      const invoice = data[vin];

      if (!isObject(invoice)) {
        return <Fragment key={i}>{Spacer}</Fragment>;
      }

      return <FileLink href={invoice.url} label={invoice.name} key={i} />;
    });
  }

  function getBillsOfLanding(data, vins) {
    if (!isObject(data) || vins.length === 0) {
      return null;
    }

    return vins.map((vin, i) => {
      const bill = data[vin];

      if (!bill) {
        return <Fragment key={i}>{Spacer}</Fragment>;
      }

      return <FileLink href={bill} label={<FormattedMessage id="shared.cta.download" />} key={i} />;
    });
  }

  return invoices.map((data, index) => {
    const {
      container,
      booking,
      shippingLine,
      shippingLineUrl,
      originName,
      destinationName,
      etd,
      eta,
      billOfLading,
      invoiceFileData,
      containerBalanceRemaining,
      containerAmountApplied,
      VINs,
      VINsLinks,
      release,
    } = data;

    let releaseType;
    switch (release) {
      case 1:
        releaseType = 'No';
        break;
      case 2:
        releaseType = 'Yes';
        break;
      default:
        releaseType = 'Awaiting';
    }

    const row = [
      { content: container },
      { content: booking },
      {
        content: shippingLineUrl ? (
          <Link href={shippingLineUrl} isTargetBlank isNoopener isNoreferrer>
            {shippingLine}
          </Link>
        ) : (
          shippingLine
        ),
      },
      {
        content: getVins(VINsLinks),
        style: { verticalAlign: 'top' },
      },
      {
        content: getInvoices(invoiceFileData, VINs),
        style: { verticalAlign: 'top' },
      },
      {
        content: getBillsOfLanding(billOfLading, VINs),
        style: { verticalAlign: 'top' },
      },
      { content: originName },
      { content: destinationName },
      { content: DateTimeService.formatFromISOString(etd) },
      { content: DateTimeService.formatFromISOString(eta) },
      { content: releaseType },
      { content: getAmountComponent(containerBalanceRemaining) },
      { content: getAmountComponent(containerAmountApplied) },
    ].filter(Boolean);

    row.id = index;
    return row;
  });
}

export default getRowsArray;
