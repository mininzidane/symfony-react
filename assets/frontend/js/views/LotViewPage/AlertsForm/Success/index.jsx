/* eslint-disable react/prop-types */
import React from 'react';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CheckmarkIcon from './img/checkmark.svg';
import useStyles from './useStyles';

function Success({ handleClick }) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.main}>
        <div className={classes.icon}>
          <img src={CheckmarkIcon} width={20} height={20} alt="" />
        </div>
        <div>
          <div className={classes.title}>
            <FormattedMessage id="lotPage.alerts.success.title" />
          </div>
          <div className={classes.description}>
            <FormattedMessage id="lotPage.alerts.success.description" />
          </div>
        </div>
      </div>

      <div className={classes.cta}>
        <ButtonOutlined
          label={
            <div className="d-f ai-ct">
              <svg
                className="mr-10"
                width="15"
                height="18"
                viewBox="0 0 15 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.31492 6.13901L3.31492 6.13817C3.31447 5.60592 3.41859 5.07902 3.62171 4.5889C3.82515 4.09799 4.12354 3.65209 4.49974 3.27678L4.50074 3.27578C5.06281 2.71346 5.7782 2.32934 6.55743 2.17147L7.36594 2.00767L8.16702 2.17061C9.08184 2.35669 9.90423 2.85325 10.4949 3.57619C11.0856 4.29912 11.4082 5.204 11.4082 6.13756V6.13829L11.4089 7.16425C11.4089 7.16426 11.4089 7.16428 11.4089 7.1643C11.4097 8.38198 11.7097 10.2308 12.093 11.3809L13.0397 14.226L1.68303 14.226L2.63074 11.3817C3.01699 10.2229 3.31492 8.37733 3.31492 7.16432L3.31492 6.13901ZM7.37237 1.08101L7.36347 1.16173L7.35283 1.08018L7.35272 1.07756C7.35284 1.07705 7.353 1.07655 7.35321 1.07606C7.35373 1.0748 7.35451 1.07367 7.35549 1.07272C7.35575 1.07247 7.35602 1.07223 7.35631 1.07202C7.3571 1.0714 7.35798 1.07091 7.35892 1.07056C7.3602 1.07008 7.36156 1.06987 7.36292 1.06993C7.36429 1.07 7.36562 1.07034 7.36684 1.07094C7.36807 1.07155 7.36916 1.07239 7.37004 1.07343C7.37093 1.07447 7.37159 1.07568 7.37199 1.07698C7.37239 1.07829 7.37252 1.07966 7.37237 1.08101Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M7.46384 17.5024L7.46346 17.5024C7.26633 17.5025 7.07112 17.4637 6.88898 17.3883C6.70684 17.313 6.54135 17.2024 6.40196 17.063C6.26257 16.9236 6.15203 16.7581 6.07664 16.576C6.06644 16.5513 6.05691 16.5265 6.04805 16.5013L8.87853 16.5018C8.8697 16.5269 8.86019 16.5517 8.85002 16.5762C8.77463 16.7583 8.66412 16.9237 8.5248 17.063C8.38548 17.2023 8.22007 17.3129 8.03802 17.3882C7.85598 17.4636 7.66087 17.5024 7.46384 17.5024Z"
                  stroke="currentColor"
                />
              </svg>
              <FormattedMessage id="lotPage.alerts.success.cta" />
            </div>
          }
          isThinBorder
          isBackgroundWhite
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Success;
