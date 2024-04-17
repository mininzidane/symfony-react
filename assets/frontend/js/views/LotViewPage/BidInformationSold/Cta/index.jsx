import React from 'react';
import PropTypes from 'prop-types';
import Button from 'frontend/js/components/Button';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';

import useStyles from './useStyles';

function Cta({ lotDescription, ymmSearchLink }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <FormattedMessage id="lotPage.bidInformationSold.cta.title" />{' '}
        <strong className={classes.vehicle}>{lotDescription}</strong>
      </div>
      <Button label={intl.formatMessage({ id: 'lotPage.bidInformationSold.cta.btn' })} href={ymmSearchLink} />
    </div>
  );
}

Cta.defaultProps = {
  ymmSearchLink: '',
};

Cta.propTypes = {
  lotDescription: PropTypes.string.isRequired,
  ymmSearchLink: PropTypes.string,
};

export default Cta;
