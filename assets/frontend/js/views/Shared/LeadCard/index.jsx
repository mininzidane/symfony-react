import React, { useState } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';
import LeadFormInputs from 'frontend/js/views/Shared/LeadForm/Inputs';
import LeadFormContext from 'frontend/js/views/Shared/LeadForm/Form';
import LeadFormSubmitButton from 'frontend/js/views/Shared/LeadForm/SubmitButton';
import ContactUsCard from './ContactUsCard';
import useStyles from './useStyles';

function LeadCard({ leadSource, onFormSuccess }) {
  const classes = useStyles();
  const intl = useIntl();

  const [leadSubmitted, setLeadSubmitted] = useState(false);
  function onSuccess() {
    onFormSuccess();
    setLeadSubmitted(true);
  }

  const translationSets = {
    contactUs: intl.formatMessage({ id: 'contactUsPage.title' }),
    submit: intl.formatMessage({ id: 'shared.cta.submit' }),
  };

  return (
    <div>
      {leadSubmitted ? (
        <ContactUsCard />
      ) : (
        <LeadFormContext onSuccess={onSuccess} leadSource={leadSource} className={classes.root}>
          <div className={classes.title}>{translationSets.contactUs}</div>
          <LeadFormInputs />
          <LeadFormSubmitButton label={translationSets.submit} className="mt-10" />
        </LeadFormContext>
      )}
    </div>
  );
}

LeadCard.propTypes = {
  leadSource: PropTypes.string.isRequired,
  onFormSuccess: PropTypes.func,
};

LeadCard.defaultProps = {
  onFormSuccess: () => {},
};

export default LeadCard;
