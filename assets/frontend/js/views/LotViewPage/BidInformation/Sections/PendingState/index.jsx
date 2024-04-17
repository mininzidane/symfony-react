/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import useStyles from './useStyles';

function PendingState({ isShown }) {
  const [isVisible, setIsVisible] = useState(isShown);

  const intl = useIntl();
  const classes = useStyles({ 'is-visible': isVisible });

  const translationSets = {
    title: intl.formatMessage({ id: 'shared.label.pending' }),
    content: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.pendingContent',
      },
      {
        br: <br />,
      },
    ),
  };

  useEffect(() => {
    setIsVisible(isShown);
  }, [isShown]);

  return (
    <div className={classnames(classes.root, { 'is-visible': isVisible })}>
      <div className={classes.grid}>
        <SpinnerWheel color="yellow" size={28} thickness={3} />
        <div className={classes.title}>{translationSets.title}...</div>
        <div>{translationSets.content}</div>
      </div>
    </div>
  );
}

export default PendingState;
