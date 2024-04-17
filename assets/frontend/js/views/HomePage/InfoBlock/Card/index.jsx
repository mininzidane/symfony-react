import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Card({ title, desc, background }) {
  const classes = useStyles();
  const bg = background ? { backgroundImage: `url(${background})` } : null;

  return (
    <div className={classes.card} style={bg}>
      <h2 className={classes.cardTitle}>{title}</h2>
      <p className={classes.cardDesc}>{desc}</p>
    </div>
  );
}

Card.defaultProps = {
  background: '',
};

Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  desc: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  background: PropTypes.string,
};

export default Card;
