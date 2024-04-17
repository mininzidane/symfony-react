import React from 'react';
import Card from 'frontend/js/components/Card';
import ContactInformationForm from './ContactInformationForm';
import useStyles from './useStyles';
import useContactInformationContext from '../../_Context/useContactInformationContext';

function Form() {
  const classes = useStyles();
  const { form } = useContactInformationContext();
  return (
    <Card elevation={2} className={classes.root}>
      <ContactInformationForm setForm={form.set} />
    </Card>
  );
}

export default Form;
