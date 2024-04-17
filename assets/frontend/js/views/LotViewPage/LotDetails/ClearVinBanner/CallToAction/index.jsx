/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import CvCircleSvg from 'frontend/images/shared/logo/cv-circle.svg';
import useStyles from './useStyles';

function CallToAction({ creditsCount, ...props }) {
  const classes = useStyles();
  const { isLoading, id, className } = props;

  return (
    <ButtonOutlined
      {...props}
      className={classnames(classes.root, className)}
      label={
        <span className={classes.wrap}>
          {isLoading ? (
            <SpinnerWheel size={18} thickness={2} color="blue" />
          ) : (
            <img className={classes.img} src={CvCircleSvg} alt="ClearVin" />
          )}

          <span className={classes.label}>
            <FormattedMessage id="shared.cta.getHistoryReport" />
          </span>

          {Boolean(creditsCount) && <>&nbsp;({creditsCount})</>}
        </span>
      }
      id={id}
      size="sm"
      isThinBorder
      isBackgroundWhite
      isShadowless
      isTargetBlank
      isNofollow
      fontWeight={400}
      fontSize={14}
      isRegularCase
      isLoading={isLoading}
      isLoadingSpinnerHidden
      style={{
        position: 'relative',
        height: 30,
      }}
    />
  );
}

export default CallToAction;
