/* eslint-disable react/prop-types */
import React from 'react';
import classanames from 'classnames';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';

function InvoiceDownloadLink({ subtotal, token }) {
  const classes = useStyles();

  return (
    <span className={classes.subtotalWrap}>
      {subtotal}{' '}
      <Link
        href={RouterService.getRoute('invoiceView', null, false, { token })}
        className={classanames(classes.downloadArrow, 'has-extra-hitbox')}
        isTargetBlank
      >
        <svg viewBox="0 0 9.333 11.333">
          <path
            fill="#989898"
            d="M14.333,7H11.667V3h-4V7H5l4.667,4.667ZM5,13v1.333h9.333V13Z"
            transform="translate(-5 -3)"
          />
        </svg>
      </Link>
    </span>
  );
}

InvoiceDownloadLink.propTypes = {};

export default InvoiceDownloadLink;
