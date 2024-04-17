import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';

import CountryService from 'frontend/js/api/CountryService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';
import Icon from './Icon';

function Description({ className, top }) {
  const isIntlPage = !CountryService.isUsa();
  const lotsCount = BootstrapService.getAppValue('totalLots', '').toString();
  const formattedCount = NumberService.formatNumber(lotsCount);
  const count = isIntlPage ? formattedCount.replace(',', ' ') : formattedCount;

  const classes = useStyles();

  return (
    <div className={classnames(classes.root, className)} style={{ paddingTop: top }}>
      <div className={classnames(classes.item, 'qa_id_access_to_overal')}>
        <Icon />
        <FormattedMessage id="authComponents.descriptions.description1" values={{ count }} />
      </div>
      <div className={classnames(classes.item, 'qa_id_get_the_best_price')}>
        <Icon />
        <FormattedMessage id="authComponents.descriptions.description2" />
      </div>
      <div className={classnames(classes.item, 'qa_id_easy_bidding')}>
        <Icon />
        <FormattedMessage id="authComponents.descriptions.description3" />
      </div>
      <div className={classnames(classes.item, 'qa_id_customer_satisfaction')}>
        <Icon />
        <FormattedMessage id="authComponents.descriptions.description4" />
      </div>
    </div>
  );
}

Description.propTypes = {
  top: PropTypes.number,
  className: PropTypes.string,
};

Description.defaultProps = {
  top: 137,
  className: '',
};

export default Description;
