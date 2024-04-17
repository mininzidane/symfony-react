import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import Link from 'frontend/js/components/Link';
import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';

import useStyles from './useStyles';

let returnTo = RouterService.getQueryParam('return_to');
if (returnTo) {
  returnTo = decodeURIComponent(returnTo);
}

const continueURL = returnTo || RouterService.getRoute('searchResults');

const Actions = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        label={<FormattedMessage id="registerCongratulations.buttons.continue" />}
        size="lg"
        className={classnames(classes.continueBtn, 'qa_add_deposit_button')}
        href={RouterService.getRoute('buyerPower')}
      />

      <Link href={continueURL}>
        <FormattedMessage id="registerCongratulations.buttons.toVehiclesFinder" />
      </Link>
    </div>
  );
};

export default Actions;
