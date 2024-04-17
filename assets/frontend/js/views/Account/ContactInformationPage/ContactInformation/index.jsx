import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import ContactInformationForm from './Form';
import Summary from './Summary';
import useStyles from './useStyles';

function ContactInformation() {
  const classes = useStyles();

  return (
    <ContainerFullScreen className={classes.root}>
      <ContactInformationForm />
      <Summary />
    </ContainerFullScreen>
  );
}

export default ContactInformation;
