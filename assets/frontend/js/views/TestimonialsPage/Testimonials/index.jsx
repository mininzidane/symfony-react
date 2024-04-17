import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'frontend/js/components/Pagination';
import Testimonial from './Testimonial';
import useStyles from './useStyles';

function Testimonials({ testimonials }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.grid}>
        {testimonials &&
          testimonials.map((testimonial) => <Testimonial testimonial={testimonial} className={classes.card} />)}
      </div>
      <Pagination isAdvanced className={classes.pagination} />
    </div>
  );
}

Testimonials.propTypes = {
  testimonials: PropTypes.array,
};

Testimonials.defaultProps = {
  testimonials: null,
};

export default Testimonials;
