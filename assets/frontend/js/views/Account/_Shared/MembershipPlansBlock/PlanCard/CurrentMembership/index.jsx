/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function CurrentMembership({ label, href, planName, className }) {
  const classes = useStyles();
  const isGuest = useMemo(() => planName === 'Guest', [planName]);

  return (
    <>
      <div className={classnames(classes.root, className)}>
        {label || <FormattedMessage id="membershipPlans.card.currentMembership" />}
      </div>
      {isGuest && (
        <Link className={classes.cta} href={href}>
          <FormattedMessage id="membershipPlans.card.upgradeLater" />
        </Link>
      )}
    </>
  );
}

export default CurrentMembership;
