import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function ContactInfoEntry({ icon, label, value }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.icon} src={icon.src} alt={icon.alt} />
      <span>
        {label && <>{label}:</>} {value}
      </span>
    </div>
  );
}

ContactInfoEntry.propTypes = {
  icon: PropTypes.shape({
    src: PropTypes.node,
    alt: PropTypes.string,
  }),
  label: PropTypes.node,
  value: PropTypes.node,
};

ContactInfoEntry.defaultProps = {
  icon: {},
  label: '',
  value: '',
};

export default ContactInfoEntry;
