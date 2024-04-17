import React from 'react';
import PropTypes from 'prop-types';
import Card from 'frontend/js/components/Card';

import useStyles from './useStyles';
import Title from './Title';
import Features from './Features';
import Description from './Description';
import Actions from './Actions';

function CongratulationsPage({ features, descriptions, title, subtitle, contactUs, country }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Title title={title} subtitle={subtitle} country={country} />
        <div className={classes.content}>
          <Features items={features} />
          <Description items={descriptions} contactUs={contactUs} />
        </div>
        <Actions />
      </Card>
    </div>
  );
}

CongratulationsPage.propTypes = {
  features: PropTypes.array.isRequired,
  descriptions: PropTypes.array.isRequired,
  title: PropTypes.any,
  subtitle: PropTypes.any,
  contactUs: PropTypes.node,
  country: PropTypes.string.isRequired,
};

CongratulationsPage.defaultProps = {
  title: undefined,
  subtitle: undefined,
  contactUs: null,
};

export default CongratulationsPage;
