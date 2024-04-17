/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import Amount from 'frontend/js/components/Amount';
import CardIndentedContent from '../../LotPageCard/CardIndentedContent';
import WarningSvg from './img/warning-sign.svg';
import ErrorSvg from './img/error-sign.svg';
import SuccessSvg from './img/success-sign.svg';
import useStyles from './useStyles';

function NotificationCard({ state, title, content, style, className, titleClassName, hideTitle, payNow }) {
  const intl = useIntl();
  const classes = useStyles();
  const notificationClasses = classnames(classes.card, {
    'is-warning': state === 'warning',
    'is-error': state === 'error',
    'is-success': state === 'success',
    'is-loading': state === 'loading',
  });

  const defaultTranslationSet = {
    title: intl.formatMessage({
      id: 'shared.header.attention',
    }),
  };

  return (
    <CardIndentedContent className={classnames(classes.root, className)} style={style}>
      <div className={notificationClasses}>
        <div className={classes.header}>
          <div className={classes.icon}>
            {state === 'warning' && <img src={WarningSvg} height="20" width="20" alt="!" />}

            {state === 'error' && <img src={ErrorSvg} height="20" width="20" alt="!" />}

            {state === 'success' && <img src={SuccessSvg} height="20" width="20" alt="!" />}

            {state === 'loading' && <SpinnerWheel color="yellow" size={20} thickness={3} />}
          </div>
          <div>
            {hideTitle === false && (
              <div className={classnames(classes.title, titleClassName)}>{title || defaultTranslationSet.title}</div>
            )}
          </div>
        </div>

        {content && (
          <div>
            {content}{' '}
            {payNow && (
              <div className={classes.payNow}>
                <div>
                  <FormattedMessage id="shared.label.amountDue" />: <Amount value={payNow.amount} hasCurrency />
                </div>

                <Button
                  className={classnames(classes.payNowCta, 'is-button')}
                  href={payNow.url}
                  label={<FormattedMessage id="shared.cta.payNow" />}
                  color="white"
                  isInline
                />
              </div>
            )}
          </div>
        )}
      </div>
    </CardIndentedContent>
  );
}

NotificationCard.propTypes = {
  state: PropTypes.string,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  title: PropTypes.node,
  hideTitle: PropTypes.bool,
  content: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

NotificationCard.defaultProps = {
  className: '',
  titleClassName: '',
  state: 'warning',
  title: '',
  hideTitle: false,
  content: '',
  style: {},
};

export default NotificationCard;
