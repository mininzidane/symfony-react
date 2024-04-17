import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import Card from 'frontend/js/components/Card';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function CongratulationsCard({ title, subtitle, children, className, contentClassName }) {
  const classes = useStyles();

  const { firstName } = useCustomerHelper();

  return (
    <Card hasSidePaddings className={classnames(classes.root, className)}>
      <h1 className={classes.title}>
        {title || (
          <FormattedMessage
            id="receiptPage.congratsCustomerName"
            values={{
              firstName,
            }}
          />
        )}
      </h1>
      {subtitle && <h2 className={classes.subtitle}>{subtitle}</h2>}

      <div className={classnames(classes.content, contentClassName)}>{children}</div>
    </Card>
  );
}

CongratulationsCard.defaultProps = {
  title: '',
  subtitle: '',
  className: '',
  contentClassName: '',
};

CongratulationsCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  subtitle: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default CongratulationsCard;
