import React from 'react';
import DigiCertLogo from './DigiCertLogo';
import Title from './Title';
import Text from './Text';
import useStyles from './useStyles';

function Annotation() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DigiCertLogo />
      <Title />
      <Text />
    </div>
  );
}

export default Annotation;
