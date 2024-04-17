import React from 'react';
import PropTypes from 'prop-types';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useStyles from './useStyles';

function InfoCard({ title, description, link, icon }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.icon} src={icon} alt="feature" />
      <div className={classes.title}>{title}</div>
      <div className={classes.description}>{description}</div>
      <ButtonOutlined
        className={classes.button}
        href={link.href}
        label={link.label}
        isThinBorder
        isBackgroundWhite
        isInline
      />
    </div>
  );
}

InfoCard.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.shape({
    label: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
};

export default InfoCard;
