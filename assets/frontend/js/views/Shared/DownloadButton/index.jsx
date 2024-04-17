/* eslint-disable react/prop-types */
import React from 'react';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useStyles from './useStyles';

function DownloadButton({ label, classes: overrideClasses, ...props }) {
  const classes = useStyles({ classes: overrideClasses });

  return (
    <ButtonOutlined
      label={
        <div className={classes.label}>
          <svg viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 9.903a.495.495 0 00-.495-.495h-.01a.495.495 0 100 .99h.01A.495.495 0 0011 9.903zm-.5.99a.5.5 0 01.5.5v6.71l2.648-2.62a.5.5 0 11.704.71l-3.5 3.463-.352.348-.352-.348-3.5-3.462a.5.5 0 11.704-.711L10 18.103v-6.71a.5.5 0 01.5-.5z"
              fill="#56CCF2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.429 11.881h2.076a.495.495 0 110 .99h5.99a.495.495 0 110-.99h2.934c.354 0 .692-.069 1-.194.923-.375 1.571-1.254 1.571-2.279 0-1.026-.65-1.905-1.575-2.28a2.651 2.651 0 00-.996-.193c0-.342-.037-.676-.105-.998-.48-2.253-2.554-3.948-5.038-3.948-2.066 0-3.847 1.172-4.665 2.861a4.784 4.784 0 00-.344.957 3.48 3.48 0 00-1.848-.52C2.535 5.287 1 6.763 1 8.584c0 1.487 1.023 2.743 2.429 3.155.316.093.652.142 1 .142h1zM20 9.408c0-1.63-1.138-2.956-2.638-3.352C16.922 3.163 14.34.99 11.286.99c-2.462 0-4.617 1.413-5.591 3.477a4.544 4.544 0 00-1.266-.18C2.019 4.287 0 6.175 0 8.585s2.02 4.297 4.429 4.297h12c1.935 0 3.571-1.518 3.571-3.473z"
              fill="currentColor"
            />
          </svg>
          <span>{label}</span>
        </div>
      }
      {...props}
    />
  );
}

export default DownloadButton;
