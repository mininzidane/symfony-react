import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Button from 'frontend/js/components/Button';
import Link from 'frontend/js/components/Link';

import config from '../config';
import useStyles from './useStyles';

function MobileButtons({ selectedPlan, planName }) {
  const classes = useStyles();

  return (
    <div className={classes.mobileButtons}>
      <Link className={classnames(classes.btnMobile, classes.btnMobileLeft)} href={config.btns.continueUrl[planName]}>
        <FormattedMessage id="membershipPlans.card.upgradeLater" />
      </Link>
      <Button
        label={<FormattedMessage id="membershipPlans.mobile.upgradeNow" />}
        color="yellow"
        className={classes.btnMobile}
        href={config.btns.upgradeUrl[selectedPlan.name]}
      />
    </div>
  );
}

MobileButtons.propTypes = {
  planName: PropTypes.string.isRequired,
  selectedPlan: PropTypes.object.isRequired,
};

export default MobileButtons;
