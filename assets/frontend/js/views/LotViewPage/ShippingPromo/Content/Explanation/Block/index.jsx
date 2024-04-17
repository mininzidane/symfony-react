import React, { useState } from 'react';
import { Collapse } from '@material-ui/core';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import CardIndentedContent from '../../../../LotPageCard/CardIndentedContent';
import ExplanationContent from '../Content';
import useStyles from './useStyles';

function ExplanationBlock() {
  const classes = useStyles();
  const [isClosed, setIsClosed] = useState(LocalStorageService.get('is_shipping_explanation_closed'));

  function handleClose() {
    setIsClosed(true);
    LocalStorageService.set('is_shipping_explanation_closed', true);
  }

  return (
    <Collapse mountOnEnter unmountOnExit in={!isClosed}>
      <CardIndentedContent>
        <CardIndentedContent className={classes.root}>
          <div className="text-sm sm-pr-20" style={{ padding: '0 42px 0 0px' }}>
            <button
              type="button"
              onClick={handleClose}
              className="svg-icon pos-a op-uh easy-hover cur-p"
              style={{ width: 11, height: 11, top: 14, right: 14 }}
            >
              <svg viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.000108412 0.846147L0.846254 0L11 10.1538L10.1539 10.9999L0.000108412 0.846147Z"
                  fill="#333333"
                />
                <path
                  d="M10.1537 8.65854e-05L10.9999 0.846234L0.846145 11L0 10.1539L10.1537 8.65854e-05Z"
                  fill="#333333"
                />
              </svg>
            </button>

            <ExplanationContent />
          </div>
        </CardIndentedContent>
      </CardIndentedContent>
    </Collapse>
  );
}

export default ExplanationBlock;
