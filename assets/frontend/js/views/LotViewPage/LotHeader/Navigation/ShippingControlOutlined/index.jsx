/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import CountryService from 'frontend/js/api/CountryService';
import { SHIPPING_WIDGET_ID } from 'frontend/js/views/LotViewPage/ShippingPromo/Content/constants';
import useStyles from './useStyles';

function ShippingControlOutlined({ isSelect, isAbmInventory, isNpaInventory }) {
  const classes = useStyles();

  const scrollToEl = () => {
    ScrollService.smoothScrollIntoViewById(SHIPPING_WIDGET_ID);
    ScrollService.highlightScrollTarget(SHIPPING_WIDGET_ID);
  };

  return (
    <button
      onClick={scrollToEl}
      type="button"
      className={classnames(
        classes.root,
        isSelect && 'is-select',
        isAbmInventory && 'is-abm-inventory',
        isNpaInventory && 'is-npa-inventory',
      )}
    >
      {CountryService.isDomestic() ? (
        <svg className={classes.domesticIcon} width="27" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.537 13.992C19.846 15.159 20.933 16 22.202 16c1.269 0 2.356-.841 2.665-2.008h1.445c.38 0 .688-.3.688-.67V7.35l-.103-.352L24.348 2.3a.688.688 0 00-.607-.357v-.002H18.78V.67a.68.68 0 00-.688-.67H.688A.68.68 0 000 .67v.68h1.376v-.011h16.028v11.314H8.908c-.31-1.168-1.396-2.008-2.665-2.008-1.27 0-2.356.84-2.665 2.008H1.376V9H0v4.322c0 .37.308.67.688.67h2.89C3.887 15.159 4.974 16 6.243 16c1.269 0 2.356-.841 2.665-2.008h10.629zM1.376 3H0v1h1.376V3zm0 3v1H0V6h1.376zm23.49 6.653c-.308-1.168-1.395-2.008-2.664-2.008-1.269 0-2.356.84-2.665 2.008h-.757V3.28h.928v4.07c0 .37.308.67.688.67h5.228v4.633h-.757zm-4.04.67c0-.74.616-1.34 1.376-1.34.76 0 1.375.6 1.375 1.34 0 .739-.615 1.338-1.375 1.338s-1.376-.6-1.376-1.339zm-15.96 0c0-.74.617-1.34 1.377-1.34s1.376.6 1.376 1.34c0 .739-.616 1.338-1.376 1.338-.76 0-1.376-.6-1.376-1.339zM23.329 3.28l1.845 3.4h-4.089v-3.4h2.244z"
            fill="#2158F5"
          />
          <path fill="#2158F5" d="M0 3h7v1H0zm0 3h4v1H0zm0 3h3v1H0z" />
        </svg>
      ) : (
        <svg
          className={classes.oceanIcon}
          width="20"
          viewBox="0 0 23 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.25 11.1992V8.99922V8.19922H16.3462V11.3992L11.6071 9.59922L6.25 11.1992Z"
            stroke="#2158F5"
            strokeWidth="1.25"
          />
          <path
            d="M19.5769 17.4392C19.4871 17.6402 19.3819 17.8321 19.2625 18.0127C19.1425 18.1962 19.0044 18.3639 18.8508 18.5126C18.701 18.6575 18.5329 18.7766 18.352 18.8662C18.1638 18.9571 17.9608 19.0027 17.7559 18.9999C17.4959 19.0053 17.2365 18.9685 16.9859 18.8904C16.783 18.8249 16.5895 18.7271 16.4113 18.5998C16.2453 18.4777 16.0934 18.3556 15.9556 18.2336C15.8178 18.1115 15.684 17.9855 15.5542 17.8557C15.4318 17.7305 15.2878 17.6349 15.1313 17.5748C14.9691 17.5153 14.802 17.4744 14.6325 17.4527C14.4612 17.449 14.2912 17.4863 14.1338 17.5622C13.987 17.637 13.8488 17.7313 13.722 17.8431C13.5916 17.9568 13.4616 18.0789 13.3318 18.2093C13.191 18.3481 13.0384 18.4707 12.8761 18.5755C12.6939 18.6912 12.5006 18.7832 12.2998 18.8497C12.0421 18.9307 11.7758 18.9718 11.5082 18.9718C11.2447 18.9777 10.9819 18.9408 10.7278 18.8623C10.5234 18.7953 10.3268 18.7013 10.142 18.5823C9.98203 18.4795 9.83292 18.3567 9.69754 18.2161C9.57175 18.0833 9.4376 17.961 9.29613 17.8499C9.16515 17.7451 9.02753 17.6512 8.88438 17.569C8.72764 17.4906 8.55831 17.449 8.38678 17.4469C8.21525 17.4447 8.04514 17.482 7.88687 17.5564C7.73852 17.6318 7.6 17.7295 7.47513 17.847C7.34477 17.9691 7.21096 18.0912 7.07371 18.2132C6.93646 18.3353 6.78457 18.4612 6.61803 18.591C6.44085 18.7266 6.24189 18.822 6.03228 18.872C5.77857 18.9337 5.52118 18.9745 5.26219 18.9941C5.05612 18.9968 4.85149 18.9554 4.65921 18.872C4.47809 18.7902 4.31259 18.6702 4.17165 18.5184C4.02668 18.3636 3.89248 18.1964 3.77024 18.0185C3.64526 17.837 3.53621 17.6423 3.44463 17.4372L3.4231 17.4004"
            stroke="#2158F5"
            strokeWidth="1.25"
          />
          <path
            d="M22 17.3991H20.3377L21.9991 12.4632L19.1994 11.5556V6.4661H17.5371L16.1372 3.73304H13.5998V1H9.39931V3.73645H6.86196L5.46208 6.46949H3.79977V11.559L1 12.4666L2.66231 17.4H1"
            stroke="#2158F5"
            strokeWidth="1.25"
          />
        </svg>
      )}
      <FormattedMessage id="shared.label.shipping" className={classes.label} />
    </button>
  );
}

ShippingControlOutlined.defaultProps = {};

ShippingControlOutlined.propTypes = {};

export default ShippingControlOutlined;
