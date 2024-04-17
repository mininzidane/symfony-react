import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import Inputs from './Inputs';
import Form from './Form';
import SubmitButton from './SubmitButton';
import useStyles from './useStyles';

function LeadForm({ onSuccess, id, ctaText, className }) {
  const intl = useIntl();
  const classes = useStyles();

  const cta = ctaText || intl.formatMessage({ id: 'contactUsPage.title' });
  return (
    <Form onSuccess={onSuccess} id={id} className={className}>
      <Inputs />
      <SubmitButton label={cta} className={classes.cta} />
    </Form>
  );
}

LeadForm.defaultProps = {
  ctaText: '',
  id: '',
  className: '',
};

LeadForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  ctaText: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default LeadForm;
