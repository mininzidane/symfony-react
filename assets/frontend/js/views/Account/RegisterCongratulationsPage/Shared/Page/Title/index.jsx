import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';

import useStyles from './useStyles';

const Title = ({ title, subtitle, country }) => {
  const classes = useStyles();

  return (
    <>
      <h1 className={classnames(classes.title, 'qa_id_header_simple')}>
        {title || (
          <FormattedMessage
            id="registerCongratulations.title"
            values={{
              firstName: window.customer.firstName,
            }}
          />
        )}
      </h1>
      <h2 className={classes.subtitle}>
        {subtitle || (
          <FormattedMessage
            id="registerCongratulations.subtitle"
            values={{
              br: <br />,
              countryName: country,
            }}
          />
        )}
      </h2>
    </>
  );
};

Title.propTypes = {
  title: PropTypes.any,
  subtitle: PropTypes.any,
  country: PropTypes.string,
};

Title.defaultProps = {
  title: null,
  subtitle: null,
  country: '',
};

export default Title;
