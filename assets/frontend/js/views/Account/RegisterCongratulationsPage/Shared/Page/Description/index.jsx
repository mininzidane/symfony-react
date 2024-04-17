import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './useStyles';

const Description = ({ items, contactUs }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {items.map((item, i) =>
        typeof item === 'string' ? (
          <p key={`descriptionRow${i}`} dangerouslySetInnerHTML={{ __html: item }} />
        ) : (
          <p key={`descriptionRow${i}`}>{item}</p>
        ),
      )}
      {contactUs}
    </div>
  );
};

Description.propTypes = {
  items: PropTypes.array.isRequired,
  contactUs: PropTypes.node,
};

Description.defaultProps = {
  contactUs: null,
};

export default Description;
