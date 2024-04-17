import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './useStyles';
import Row from './Row';

const Features = ({ items }) => {
  const classes = useStyles();

  const qaIds = ['qa_fixed_price', 'qa_the_lowest_coast', 'qa_possibility_to_do_bet', 'qa_real_time_shopping'];

  return (
    <div className={classes.root}>
      {items.map((item, i) => (
        <Row key={`featuresRow${i}`} className={qaIds[i]}>
          {item}
        </Row>
      ))}
    </div>
  );
};

Features.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Features;
